import { io, Socket } from 'socket.io-client';
import { useGameStore } from '../store';
import { GameState, ProgressUpdate } from '../types';

class WebSocketClient {
  private socket: Socket | null = null;
  connect() {
    if (this.socket) return;
    
    this.socket = io('http://localhost:3001');

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('gameState', (state: GameState) => {
      console.log('Received game state:', state);
      useGameStore.getState().updateGameState(state);
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
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const wsClient = new WebSocketClient();