export interface Player {
    id: string;
    name: string;
    progress: number;
    wpm: number;
    accuracy: number;
  }
export interface GameState {
  status: 'waiting' | 'countdown' | 'racing' | 'finished';
  players: Player[];
  text: string;
  countdown: number;
  timeLeft: number;
}

export interface GameRoom {
  id: string;
  gameState: GameState;
  isTimerPaused: boolean;
  gameTimer: NodeJS.Timeout | null;
}
