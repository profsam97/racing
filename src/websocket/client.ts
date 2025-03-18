import { io, Socket } from 'socket.io-client';
import { useGameStore } from '../store';
import { GameState, ProgressUpdate } from '../types';
import { baseUrl } from '../utils/BaseUrl';

class WebSocketClient {
  private socket: Socket | null = null;
  connect() {
    if (this.socket) return;
    this.socket =   process.env.NODE_ENV === 'development' ?  io(baseUrl) : io()
    this.socket =  io(baseUrl);
    console.log(baseUrl)
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
    this.socket.on('gameState', (state: GameState) => {
      useGameStore.getState().updateGameState(state);
    });
    this.socket.on('joinedRoom', ({ roomId }: { roomId: string }) => {
      console.log('Joined room:', roomId);
      useGameStore.getState().setCurrentRoomId(roomId);
    });
    this.socket.on('hasStarted', (hasStarted: boolean) => {
      console.log('Game has started:', hasStarted);
  
    });
  }
  updateProgress(update: ProgressUpdate) {
    if (!this.socket) return;
    this.socket.emit('progress',  update );
  }
  hasStarted() {
    if(!this.socket) return;
    this.socket.emit('gameStarted');
  }
  joinGame(playerName: string) {
    if (!this.socket) return;
    this.socket.emit('joinGame', { name: playerName });
  }
  replay() {
    if (!this.socket) return;
    this.socket.emit('replay');
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
export const wsClient = new WebSocketClient();