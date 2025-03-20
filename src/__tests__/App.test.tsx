import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { useGameStore } from '../store';
import { wsClient } from '../websocket/client';
import { GameState, Player } from '../types';

jest.mock('../store', () => ({
  useGameStore: jest.fn()
}));

console.log(React)

jest.mock('../websocket/client', () => ({
  wsClient: {
    connect: jest.fn(),
    joinGame: jest.fn(),
    replay: jest.fn()
  }
}));

jest.mock('../components/JoinGame', () => ({
  __esModule: true,
  default: jest.fn(({ handleJoinGame, username, setUsername, gameStarted }) => (
    <div data-testid="join-game">
      <input 
        data-testid="username-input" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button data-testid="join-button" onClick={handleJoinGame}>Join Game</button>
      {gameStarted && <div data-testid="game-started-message">Game has already started</div>}
    </div>
  ))
}));

jest.mock('../components/Welcome', () => ({
  __esModule: true,
  default: jest.fn(({ gameState, handleReplay }) => (
    <div data-testid="welcome">
      <div data-testid="game-status">{gameState.status}</div>
      <button data-testid="replay-button" onClick={handleReplay}>Replay</button>
    </div>
  ))
}));

jest.mock('../components/RaceTrack', () => ({
  RaceTrack: jest.fn(({ players }) => (
    <div data-testid="race-track">
      {players.map((player : Player) => (
        <div key={player.id} data-testid={`player-${player.id}`}>{player.name}</div>
      ))}
    </div>
  ))
}));

jest.mock('../components/TypingArea', () => ({
  TypingArea: jest.fn(() => <div data-testid="typing-area" />)
}));

jest.mock('../components/Leaderboard', () => ({
  Leaderboard: jest.fn(({ players }) => (
    <div data-testid="leaderboard">
      {players.map((player : Player)  => (
        <div key={player.id} data-testid={`leaderboard-player-${player.id}`}>{player.name}</div>
      ))}
    </div>
  ))
}));

describe('App Component', () => {
  const mockGameState: GameState = {
    status: 'waiting',
    players: [
      { id: '1', name: 'Player 1', progress: 0, wpm: 0, accuracy: 100 },
      { id: '2', name: 'Player 2', progress: 0, wpm: 0, accuracy: 100 }
    ],
    text: 'test text',
    countdown: 3,
    timeLeft: 60
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useGameStore as unknown as jest.Mock).mockReturnValue({
      gameState: mockGameState
    });
  });
  
  test('should connect to websocket on mount', () => {
    render(<App />);
    
    // Check if wsClient.connect was called
    expect(wsClient.connect).toHaveBeenCalledTimes(1);
  });
  
  test('should render JoinGame component when not joined', () => {
    render(<App />);
    
    // Check if JoinGame component is rendered
    // it should be rendered since initially join game will be displayed, until the user fills the form
    expect(screen.getByTestId('join-game')).toBeInTheDocument(); 
    
    // Check if other components are not rendered
    //same logic here, this should not show until the user fills the form
    expect(screen.queryByTestId('welcome')).not.toBeInTheDocument();
    expect(screen.queryByTestId('race-track')).not.toBeInTheDocument();
    expect(screen.queryByTestId('typing-area')).not.toBeInTheDocument();
    expect(screen.queryByTestId('leaderboard')).not.toBeInTheDocument();
  });
  
  test('should join game when form is submitted with valid username', () => {
    render(<App />);
    
    // Find the username input and join button
    const usernameInput = screen.getByTestId('username-input');
    const joinButton = screen.getByTestId('join-button');
    
    // Enter a username and submit the form
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.click(joinButton);
    
    // Check if wsClient.joinGame was called with the username
    expect(wsClient.joinGame).toHaveBeenCalledWith('testUser');
    
    // Check if the game components are now rendered
    expect(screen.getByTestId('welcome')).toBeInTheDocument();
    expect(screen.getByTestId('race-track')).toBeInTheDocument();
    expect(screen.getByTestId('typing-area')).toBeInTheDocument();
    expect(screen.getByTestId('leaderboard')).toBeInTheDocument();
  });
  
  test('should not join game when form is submitted with empty username', () => {
    render(<App />);
    
    // Find the join button
    const joinButton = screen.getByTestId('join-button');
    
    // Submit the form without entering a username
    fireEvent.click(joinButton);
    
    // Check if wsClient.joinGame was not called
    expect(wsClient.joinGame).not.toHaveBeenCalled();
    
    // Check if JoinGame component is still rendered
    expect(screen.getByTestId('join-game')).toBeInTheDocument();
  });
  
  test('should show game started message when game is already racing', () => {
    (useGameStore as unknown as jest.Mock).mockReturnValue({
      gameState: { ...mockGameState, status: 'racing' }
    });
    
    render(<App />);
    
    // We find the username input and join button
    const usernameInput = screen.getByTestId('username-input');
    const joinButton = screen.getByTestId('join-button');
    
    // Enter a username and submit the form
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.click(joinButton);
    
    // Check if wsClient.joinGame was not called
    expect(wsClient.joinGame).not.toHaveBeenCalled();
    
    // Check if the game started message is shown
    expect(screen.getByTestId('game-started-message')).toBeInTheDocument();
  });
  
  test('should call replay when replay button is clicked', () => {
    // Start with a joined game
    (useGameStore as unknown as jest.Mock).mockReturnValue({
      gameState: { ...mockGameState, status: 'finished' }
    });
    
    const { rerender } = render(<App />);
    
    // Simulate joining the game
    const usernameInput = screen.getByTestId('username-input');
    const joinButton = screen.getByTestId('join-button');
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.click(joinButton);
    
    // Force a rerender to ensure the components update
    rerender(<App />);
    
    // Find the replay button
    const replayButton = screen.getByTestId('replay-button');
    
    // Click the replay button
    fireEvent.click(replayButton);
    
    // Check if wsClient.replay was called
    expect(wsClient.replay).toHaveBeenCalledTimes(1);
  });
});
