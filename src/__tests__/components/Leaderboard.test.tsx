import React from 'react';
import { render, screen } from '@testing-library/react';
import { Leaderboard } from '../../components/Leaderboard';
import { Player } from '../../types';

describe('Leaderboard Component', () => {
  const mockPlayers: Player[] = [
    { id: '1', name: 'Player 1', progress: 75, wpm: 60, accuracy: 95 },
    { id: '2', name: 'Player 2', progress: 100, wpm: 55, accuracy: 90 },
    { id: '3', name: 'Player 3', progress: 50, wpm: 70, accuracy: 85 },
    { id: '4', name: 'Player 4', progress: 100, wpm: 65, accuracy: 92 }
  ];
  console.log(React)

  test('should render the leaderboard title', () => {
    render(<Leaderboard players={mockPlayers} />);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  test('should sort players by progress first', () => {
    render(<Leaderboard players={mockPlayers} />);
    
    // Get all player name elements
    const playerElements = screen.getAllByText(/Player \d/);
    
    // First two players should be the ones with 100% progress
    expect(playerElements[0].textContent).toBe('Player 4');
    expect(playerElements[1].textContent).toBe('Player 2');
  });

  test('should use WPM as tiebreaker for equal progress', () => {
    render(<Leaderboard players={mockPlayers} />);
    
    // Get all player name elements
    const playerElements = screen.getAllByText(/Player \d/);
    
    // Player 4 has higher WPM than Player 2, so should be ranked first
    expect(playerElements[0].textContent).toBe('Player 4');
    expect(playerElements[1].textContent).toBe('Player 2');
  });

  test('should display player stats correctly', () => {
    render(<Leaderboard players={mockPlayers} />);
    
    // Check WPM stats
    expect(screen.getByText('WPM: 60')).toBeInTheDocument();
    expect(screen.getByText('WPM: 55')).toBeInTheDocument();
    expect(screen.getByText('WPM: 70')).toBeInTheDocument();
    expect(screen.getByText('WPM: 65')).toBeInTheDocument();
    
    // Check accuracy stats
    expect(screen.getByText('Accuracy: 95%')).toBeInTheDocument();
    expect(screen.getByText('Accuracy: 90%')).toBeInTheDocument();
    expect(screen.getByText('Accuracy: 85%')).toBeInTheDocument();
    expect(screen.getByText('Accuracy: 92%')).toBeInTheDocument();
  });

  test('should handle empty players array', () => {
    render(<Leaderboard players={[]} />);
    
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    // No player elements should be rendered
    expect(screen.queryByText(/Player \d/)).not.toBeInTheDocument();
  });

  test('should render correct number of players', () => {
    render(<Leaderboard players={mockPlayers} />);
    
    // There should be 4 player elements
    const playerElements = screen.getAllByText(/Player \d/);
    expect(playerElements.length).toBe(4);
  });
});
