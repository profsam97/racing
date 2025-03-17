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
  export interface RoomInfo {
    id: string;
    status: 'waiting' | 'countdown' | 'racing' | 'finished';
    playerCount: number;
  }
  
  
  export interface GameStore {
    gameState: GameState;
    playerInput: string;
    currentRoomId: string | null;
    availableRooms: RoomInfo[];
    setPlayerInput: (input: string) => void;
    updateGameState: (state: Partial<GameState>) => void;
    setCurrentRoomId: (roomId: string | null) => void;
    setAvailableRooms: (rooms: RoomInfo[]) => void;
  }
  export interface ProgressUpdate {
    progress: number;
    wpm: number;
    accuracy: number;
  }
  