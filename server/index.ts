import http from 'http';
import { Server } from 'socket.io';
import { GameState, Player } from './types/index.js';

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
let isTimerPaused = false;

const gameState: GameState = {
  status: 'waiting',
  players: [],
  text: 'The quick brown fox jumps over the lazy dog.',
  countdown: 3,
  timeLeft: GAME_DURATION

};
let gameTimer: NodeJS.Timeout | null = null;

io.on('connection', (socket) => {
  console.log('Client connected');

  // Send current game state to new connections
  socket.emit('gameState', gameState);

  socket.on('joinGame', ({ name }) => {
    const player: Player = {
      id: socket.id,
      name,
      progress: 0,
      wpm: 0,
      accuracy: 100
    };
    
    gameState.players.push(player);
    
    // Start countdown if the number of players is more than  is 3
    validateCountdown()
    
    io.emit('gameState', gameState);
  });

  socket.on('progress', ({ progress, wpm, accuracy }) => {
    const player = gameState.players.find((p: Player) => p.id === socket.id);
    if (player) {
      player.progress = progress;
      player.wpm = wpm;
      player.accuracy = accuracy;
      
      // Check if player has finished
      if (progress >= 100) {
        player.progress = 100;
        checkGameEnd();
      }
      
      io.emit('gameState', gameState);
    }
  });

  socket.on('reset', () => {
    resetGame();
  });
  socket.on('gameStarted', () => {  
    if(checkIfGameHasStarted())
    {
      io.emit('hasStarted', true);
      return 
    }
    io.emit('hasStarted', false);
    });
  socket.on('disconnect', () => {
    console.log('disconnected');
    const index = gameState.players.findIndex((p: Player) => p.id === socket.id);
    if (index !== -1) {
      gameState.players.splice(index, 1);
      if(gameState.players.length < 3) {
      gameState.status = 'waiting';
      isTimerPaused = true;
      }
      io.emit('gameState', gameState);
    }
  });
});
function validateCountdown() {
  if(gameState.players.length >=3) {
    if(!isTimerPaused){
      startCountdown();
      resetGame();
    }else {
      gameState.status = 'racing';
      io.emit('gameState', gameState);
      isTimerPaused = false;
    }
  }
}

function startGameTimer() {
  if (gameTimer) {
    clearInterval(gameTimer);
  }

  gameState.timeLeft = GAME_DURATION;
  
  gameTimer = setInterval(() => {
    if (gameState.timeLeft && gameState.timeLeft > 0 && !isTimerPaused) {
      gameState.timeLeft--;
      io.emit('gameState', gameState);

      if (gameState.timeLeft === 0) {
        setTimeout(() => {

        },3000)
        endGame();
      }
    }
  }, 1000);
}

function endGame() {
  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }
  gameState.status = 'finished';
  gameState.timeLeft = GAME_DURATION;
  io.emit('gameState', gameState);
}

function startCountdown() {
  gameState.status = 'countdown';
  let count = 3;
  
  const interval = setInterval(() => {
    gameState.countdown = count;
    io.emit('gameState', gameState);
    
    count--;
    
    if (count < 0) {
      clearInterval(interval);
      gameState.status = 'racing';
      startGameTimer();
      io.emit('gameState', gameState);
    }
  }, 1000);
}
  function resetGame() {
    gameState.players.forEach((p: Player) => {
      p.progress = 0; 
      p.wpm = 0;  
      p.accuracy = 100;
    });
    io.emit('gameState', gameState);
  }

  function checkIfGameHasStarted() {
    return gameState.status === 'racing';
  }
function checkGameEnd() {
  const allFinished = gameState.players.every((p: Player) => p.progress >= 100);
  if (allFinished) {
      endGame()
  }
}

httpServer.listen(3001, () => {
  console.log('Server running on port 3001');
});
