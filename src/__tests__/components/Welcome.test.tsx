import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Welcome from '../../components/Welcome';
import { GameState } from '../../types';

describe('Welcome Component', () => {
  const mockHandleReplay = jest.fn();
  
  afterEach(() => {
    jest.clearAllMocks();
  });
    console.log(React)
  
  test('should render the title correctly', () => {
    const gameState: GameState = {
      status: 'waiting',
      players: [],
      text: '',
      countdown: 3,
      timeLeft: 60
    };
    
    render(<Welcome gameState={gameState} handleReplay={mockHandleReplay} />);
    
    expect(screen.getByText('Typing Race')).toBeInTheDocument();
  });
  
  test('should display countdown when status is countdown', () => {
    const gameState: GameState = {
      status: 'countdown',
      players: [],
      text: '',
      countdown: 3,
      timeLeft: 60
    };
    
    render(<Welcome gameState={gameState} handleReplay={mockHandleReplay} />);
    
    expect(screen.getByText('3')).toBeInTheDocument();
  });
  
  test('should display waiting message when status is waiting', () => {
    const gameState: GameState = {
      status: 'waiting',
      players: [],
      text: '',
      countdown: 3,
      timeLeft: 60
    };
    
    render(<Welcome gameState={gameState} handleReplay={mockHandleReplay} />);
    
    expect(screen.getByText('Waiting for other players to join...')).toBeInTheDocument();
  });
  
  test('should display timer when status is racing', () => {
    const gameState: GameState = {
      status: 'racing',
      players: [],
      text: '',
      countdown: 3,
      timeLeft: 65 // 1 minute and 5 seconds
    };
    
    render(<Welcome gameState={gameState} handleReplay={mockHandleReplay} />);
    
    expect(screen.getByText('1:05')).toBeInTheDocument();
  });
  
  test('should display timer in red when less than 10 seconds remain', () => {
    const gameState: GameState = {
      status: 'racing',
      players: [],
      text: '',
      countdown: 3,
      timeLeft: 9 // 9 seconds
    };
    
    render(<Welcome gameState={gameState} handleReplay={mockHandleReplay} />);
    
    const timerElement = screen.getByText('0:09');
    expect(timerElement).toBeInTheDocument();
    
    // Check if the timer has red color
    const styles = window.getComputedStyle(timerElement);
    expect(styles.color).toBe('red');
  });
  
  test('should display Play Again button when status is finished', () => {
    const gameState: GameState = {
      status: 'finished',
      players: [],
      text: '',
      countdown: 3,
      timeLeft: 0
    };
    
    render(<Welcome gameState={gameState} handleReplay={mockHandleReplay} />);
    
    const playAgainButton = screen.getByText('Play Again');
    expect(playAgainButton).toBeInTheDocument();
    
    // Test button click
    fireEvent.click(playAgainButton);
    expect(mockHandleReplay).toHaveBeenCalledTimes(1);
  });
});
