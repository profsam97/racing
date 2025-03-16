import React from 'react';
import { Box } from '@mui/material';
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
        height: '24rem', 
        bgcolor: 'grey.100',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      {players.map((player, index) => (
        <Box
          key={player.id}
          sx={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            left: `${player.progress}%`,
            top: `${(index + 1) * 20}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.3s ease-out',
          }}
        >
          <Box sx={{ overflow: 'visible', minWidth: '100px' }}>
            <Box
              component="img"
              src={images[index]}
              height={100}
              width={150}
              sx={{ objectFit: 'contain' }}
              alt={`${player.name}'s car`}
            />
          </Box>
          <Box sx={{ typography: 'body2', fontWeight: 'medium' }}>
            {player.name}
          </Box>
        </Box>
      ))}
      
      <Box 
        sx={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          justifyContent: 'space-between', 
          px: 2 
        }}
      >
        <Box sx={{ height: '100%', width: '4px', bgcolor: 'white' }} />
        <Box sx={{ height: '100%', width: '4px', bgcolor: 'white' }} />
      </Box>
    </Box>
  );
};