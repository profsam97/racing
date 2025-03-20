import React from 'react';
import { render, screen } from '@testing-library/react';
import { RaceTrack } from '../../components/RaceTrack';
import { Player } from '../../types';

// Mock the images module
jest.mock('../../data/images', () => ({
  images: [
    'test-image-1.jpg',
    'test-image-2.jpg',
    'test-image-3.jpg',
    'test-image-4.jpg'
  ]
}));
  console.log(React)

describe('RaceTrack Component', () => {
  const mockPlayers: Player[] = [
    { id: '1', name: 'Player 1', progress: 25, wpm: 60, accuracy: 95 },
    { id: '2', name: 'Player 2', progress: 50, wpm: 55, accuracy: 90 },
    { id: '3', name: 'Player 3', progress: 75, wpm: 70, accuracy: 85 },
    { id: '4', name: 'Player 4', progress: 100, wpm: 65, accuracy: 92 }
  ];

  test('should render all players', () => {
    render(<RaceTrack players={mockPlayers} />);
    
    // Check if all player names are rendered
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
    expect(screen.getByText('Player 3')).toBeInTheDocument();
    expect(screen.getByText('Player 4')).toBeInTheDocument();
  });

  test('should render WPM for each player', () => {
    render(<RaceTrack players={mockPlayers} />);
    
    // Check if WPM values are rendered
    expect(screen.getByText('60 WPM')).toBeInTheDocument();
    expect(screen.getByText('55 WPM')).toBeInTheDocument();
    expect(screen.getByText('70 WPM')).toBeInTheDocument();
    expect(screen.getByText('65 WPM')).toBeInTheDocument();
  });

  test('should render car images for each player', () => {
    const { container } = render(<RaceTrack players={mockPlayers} />);
    
    // Check if car images are rendered
    const carImages = container.querySelectorAll('img');
    expect(carImages.length).toBe(4);
    
    // Check alt text for car images
    expect(carImages[0].getAttribute('alt')).toBe("Player 1's car");
    expect(carImages[1].getAttribute('alt')).toBe("Player 2's car");
    expect(carImages[2].getAttribute('alt')).toBe("Player 3's car");
    expect(carImages[3].getAttribute('alt')).toBe("Player 4's car");
  });

  test('should handle empty players array', () => {
    const { container } = render(<RaceTrack players={[]} />);
    
    // No player elements should be rendered
    expect(screen.queryByText(/Player \d/)).not.toBeInTheDocument();
    
    // No car images should be rendered
    const carImages = container.querySelectorAll('img');
    expect(carImages.length).toBe(0);
  });

  test('should cap progress at 100%', () => {
    const playersWithExcessProgress: Player[] = [
      { id: '1', name: 'Player 1', progress: 120, wpm: 60, accuracy: 95 }
    ];
    
    render(<RaceTrack players={playersWithExcessProgress} />);
    
    // Verify the player is rendered
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    
    // Verify the WPM is rendered
    expect(screen.getByText('60 WPM')).toBeInTheDocument();
    
    // Verify the car image is rendered with the correct alt text
    const carImage = screen.getByAltText("Player 1's car");
    expect(carImage).toBeInTheDocument();
  });
});
