import { create } from 'zustand';
import { GameStore, GameState } from '../types';


//initial state of the game
const initialGameState: GameState = {
  status: 'waiting',
  players: [],
  timeLeft: undefined,
  text: '',
  countdown: 3,
};

//a store for the game.
export const useGameStore = create<GameStore>((set) => ({
  gameState: initialGameState,
  playerInput: '',
  setPlayerInput: (input: string) => set({ playerInput: input }),
  updateGameState: (state: Partial<GameState>) =>
    set((prev) => ({
      gameState: { ...prev.gameState, ...state },
    })),
}));