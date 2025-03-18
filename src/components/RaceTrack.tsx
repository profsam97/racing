import React from 'react';
import { Box, Typography } from '@mui/material';
import { Player } from '../types';
import { images } from '../data/images';

interface RaceTrackProps {
  players: Player[];
}

export const RaceTrack: React.FC<RaceTrackProps> = ({ players }) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '20rem', 
        bgcolor: 'white',
        position: 'relative',
        borderRadius: 2,
        pt:9,
        overflow: 'hidden',
        border: '1px solid #e0e0e0',
      }}
    >
      {players.map((player, index) => {
        
        return (
          <Box key={player.id} sx={{ display: 'flex', height: 80}} >
            {/* Lane indicator for this player - simple dashed yellow line */}
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: '2px', // Stop at the finish line
                // top: `${lanePosition}%`,
                height: '2px',
                transform: 'translateY(-50%)',
                zIndex: 1,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '100%',
                  backgroundImage: 'repeating-linear-gradient(90deg, #f5c71a, #f5c71a 10px, transparent 10px, transparent 20px)',
                }
              }}
            />
            
            {/* Player car and name */}
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'flex-start', // Align to top
                gap: 1,
                left: `${player.progress}%`,
                // top: `${lanePosition}%`, // Position at the line
                transform: 'translate(-50%, -100%)', // Move up by 100% of its height
                transition: 'left 0.3s ease-out',
                zIndex: 2,
              }}
            >
              <Box sx={{ 
                overflow: 'visible', 
                minWidth: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Box
                  component="img"
                  src={images[index % images.length]}
                  height={80}
                  width={120}
                  sx={{ 
                    objectFit: 'contain',
                    marginBottom: '-4px', // Add space between car and line
                  }}
                  alt={`${player.name}'s car`}
                />
              </Box>
              <Box sx={{ 
                typography: 'body2', 
                fontWeight: 'medium',
                color: '#333',
                marginTop: '30px', // Align text with the car
              }}>
                {player.name}
                <Typography variant="caption" sx={{ display: 'block', color: '#666' }}>
                  {player.wpm} WPM
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
      
      {/* Simple start and finish lines */}
      <Box 
        sx={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          justifyContent: 'space-between', 
          px: 2,
          pointerEvents: 'none',
        }}
      >
        {/* Start line */}
        <Box sx={{ 
          height: '100%', 
          width: '2px', 
          bgcolor: '#000',
          position: 'relative',
        }} />
        
        {/* Finish line */}
        <Box sx={{ 
          height: '100%', 
          width: '2px', 
          bgcolor: '#000',
          position: 'relative',
        }} />
      </Box>
    </Box>
  );
};
