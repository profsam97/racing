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
        const progress = player.progress > 100 ? 100 : player.progress;
        return (
          <Box key={player.id} sx={{ display: 'flex', height: 80}} >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                right: '2px', 
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
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'flex-start', 
                gap: 1,
                left: `calc(${progress}% - ${(progress / 100) * 120}px)`,
                transform: 'translate(-33%, -100%)', 
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
                    marginBottom: '-4px', 
                  }}
                  alt={`${player.name}'s car`}
                />
              </Box>
              <Box sx={{ 
                typography: 'body2', 
                fontWeight: 'medium',
                color: '#333',
                marginTop: '20px',
              }}>
                {player.name}
                <Typography variant="caption" sx={{ display: 'flex', flexDirection: 'row', textWrap: 'nowrap', color: '#666' }}>
                  {player.wpm} WPM
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
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
        <Box sx={{ 
          height: '100%', 
          width: '2px', 
          bgcolor: '#000',
          ml:6.1,
          position: 'relative',
        }} />
                <Box sx={{ 
          height: '100%', 
          width: '2px', 
          zIndex: 3,
          mr:5,
          bgcolor: '#000',
          position: 'relative',
        }} />
      </Box>
    </Box>
  );
};
