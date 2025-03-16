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
    timeLeft: number | undefined;
    countdown: number;
  }
  
  export interface GameStore {
    gameState: GameState;
    playerInput: string;
    setPlayerInput: (input: string) => void;
    updateGameState: (state: Partial<GameState>) => void;
  }
  export interface ProgressUpdate {
    progress: number;
    wpm: number;
    accuracy: number;
  }
  