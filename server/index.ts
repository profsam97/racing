import http from 'http';
import { Server, Socket } from 'socket.io';
import { GameRoom, GameState, Player } from './types/index.js';
import { generateQuote } from './utils/helpers.js';
import { v4 as uuidv4 } from 'uuid';

const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Socket.IO server is running!');
});
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
const GAME_DURATION = 120; // 2 minutes in seconds
const MIN_PLAYERS_TO_START = 3;

// Store all game rooms
const gameRooms = new Map<string, GameRoom>();

// Create a new game room
function createGameRoom(): GameRoom {
  const roomId = uuidv4();
  const gameState: GameState = {
    status: 'waiting',
    players: [],
    text: generateQuote(),
    countdown: 3,
    timeLeft: GAME_DURATION
  };

  const room: GameRoom = {
    id: roomId,
    gameState,
    isTimerPaused: false,
    gameTimer: null
  };

  gameRooms.set(roomId, room);
  console.log(`Created new game room: ${roomId}`);
  return room;
}
// Find an available room for a player to join
function findAvailableRoom(): GameRoom {
  // First, look for a waiting room
  for (const room of gameRooms.values()) {
    if (room.gameState.status === 'waiting') {
      return room;
    }
  }
  
  // If no waiting room, create a new one
  return createGameRoom();
}
// Find the room a player is in
function findPlayerRoom(playerId: string): GameRoom | undefined {
  for (const room of gameRooms.values()) {
    const playerExists = room.gameState.players.some(p => p.id === playerId);
    if (playerExists) {
      return room;
    }
  }
  return undefined;
}

// Start countdown for a specific room
function startCountdown(room: GameRoom) {
  room.gameState.status = 'countdown';
  let count = 3;
  
  const interval = setInterval(() => {
    room.gameState.countdown = count;
    io.to(room.id).emit('gameState', room.gameState);
    count--;
    
    if (count < 0) {
      clearInterval(interval);
      room.gameState.status = 'racing';
      startGameTimer(room);
      io.to(room.id).emit('gameState', room.gameState);
    }
  }, 1000);
}

// Start game timer for a specific room
function startGameTimer(room: GameRoom, resetTime = true) {
  if (room.gameTimer) {
    clearInterval(room.gameTimer);
  }

  if (resetTime) {
    room.gameState.timeLeft = GAME_DURATION;
  }
  
  room.isTimerPaused = false;
  
  room.gameTimer = setInterval(() => {
    // Only decrement time if timer is not paused and game is still active
    if (!room.isTimerPaused && room.gameState.timeLeft && room.gameState.timeLeft > 0) {
      room.gameState.timeLeft--;
      io.to(room.id).emit('gameState', room.gameState);
      
      if (room.gameState.timeLeft === 0) {
        setTimeout(() => {
          endGame(room);
        }, 3000);
      }
    }
  }, 1000);
}

// End game for a specific room
function endGame(room: GameRoom) {
  if (room.gameTimer) {
    clearInterval(room.gameTimer);
    room.gameTimer = null;
  }
  room.gameState.status = 'finished';
  room.gameState.timeLeft = GAME_DURATION;
  io.to(room.id).emit('gameState', room.gameState);
}


// Reset game for a specific room
function resetGame(room: GameRoom) {
  room.gameState.players.forEach((p: Player) => {
    p.progress = 0; 
    p.wpm = 0;  
    p.accuracy = 100;
  });
  io.to(room.id).emit('gameState', room.gameState);
}

// Validate if countdown should start for a room
function validateCountdown(room: GameRoom) {
  if (room.gameState.players.length >= MIN_PLAYERS_TO_START) {
    // Resume timer if it was paused and game is in racing state
    if (room.isTimerPaused && room.gameState.status === 'waiting') {
      room.isTimerPaused = false;
      room.gameState.status = 'racing';
      io.to(room.id).emit('gameState', room.gameState);
      console.log(`Timer resumed in room ${room.id} as player count is ${MIN_PLAYERS_TO_START} or more`);
    } else {
      startCountdown(room);
      resetGame(room);
    }
  }
}

// Check if all players in a room have finished
function checkGameEnd(room: GameRoom) {
  const allFinished = room.gameState.players.every((p: Player) => p.progress >= 100);
  if (allFinished) {
    endGame(room);
  }
}

// Check if game has started in a room
function checkIfGameHasStarted(room: GameRoom) {
  return room.gameState.status === 'racing';
}

// Create an initial waiting room
createGameRoom();

io.on('connection', (socket : Socket) => {
  console.log('Client connected');

   // Send available rooms to new connections
   socket.emit('availableRooms', Array.from(gameRooms.values()).map(room => ({
    id: room.id,
    status: room.gameState.status,
    playerCount: room.gameState.players.length
  })));

  socket.on('joinGame', ({ name }) => {
     // Find or create a room for the player
     const room = findAvailableRoom();
    const player: Player = {
      id: socket.id,
      name,
      progress: 0,
      wpm: 0,
      accuracy: 100
    };
    
    // Add player to room
    room.gameState.players.push(player);    
     // Join socket.io room
     socket.join(room.id);
    
     // Send current game state to the player
     socket.emit('gameState', room.gameState);
     socket.emit('joinedRoom', { roomId: room.id });
    // Start countdown if the number of players is more than  is 3
    validateCountdown(room)
    
  // Broadcast updated game state to all players in the room
    io.to(room.id).emit('gameState', room.gameState);
    });

  socket.on('progress', ({ progress, wpm, accuracy }) => {
    const room = findPlayerRoom(socket.id);
    if (!room) return;

    const player = room.gameState.players.find((p: Player) => p.id === socket.id);
    if (player) {
      player.progress = progress;
      player.wpm = wpm;
      player.accuracy = accuracy;
      
      // Check if player has finished
      if (progress >= 100) {
        player.progress = 100;
        checkGameEnd(room);
      }
      
      io.to(room.id).emit('gameState', room.gameState);
    }
  });

  socket.on('reset', () => {
    const room = findPlayerRoom(socket.id);
    if (room) {
      resetGame(room);
    }  });
  socket.on('replay', () => {
    const room = findPlayerRoom(socket.id);
    if (room) {
      validateCountdown(room);
    }
 });
  socket.on('gameStarted', () => {  
    const room = findPlayerRoom(socket.id);
    if (!room) return;
    if(checkIfGameHasStarted(room))
    {
      socket.emit('hasStarted', true);
      return 
    }
    socket.emit('hasStarted', false);
    });
  socket.on('disconnect', () => {
    console.log('disconnected');
       // Find the room the player is in
       const room = findPlayerRoom(socket.id);
       if (!room) return;
       const index = room.gameState.players.findIndex((p: Player) => p.id === socket.id);
       if (index !== -1) {
        room.gameState.players.splice(index, 1);
          // If player count drops below minimum, pause the timer
        if (room.gameState.players.length < MIN_PLAYERS_TO_START) {
          const wasRacing = room.gameState.status === 'racing';
          room.gameState.status = 'waiting';
          // Pause the timer if game was racing
          if (wasRacing && !room.isTimerPaused) {
            room.isTimerPaused = true;
            console.log(`Timer paused in room ${room.id} due to player count below ${MIN_PLAYERS_TO_START}`);
          }
        }

      // Broadcast updated game state to all players in the room
      io.to(room.id).emit('gameState', room.gameState);
      
      // If room is empty, remove it
      if (room.gameState.players.length === 0) {
        if (room.gameTimer) {
          clearInterval(room.gameTimer);
        }
        gameRooms.delete(room.id);
        console.log(`Removed empty room: ${room.id}`);
      }
    }
  });
});

httpServer.listen(3001, () => {
  console.log('Server running on port 3001');
});
