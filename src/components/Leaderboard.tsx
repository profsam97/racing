import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, SvgIcon } from '@mui/material';
import { Trophy } from 'lucide-react';
import { Player } from '../types';
interface LeaderboardProps {
  players: Player[];
}
export const Leaderboard: React.FC<LeaderboardProps> = ({ players }) => {

  const sortedPlayers = [...players].sort((a, b) => {

    // sort by progress percentage
    if (a.progress !== b.progress) return b.progress - a.progress;
    
    // If progress is the same, we use WPM as tiebreaker
    return b.wpm - a.wpm;
  });
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt:8 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
                <SvgIcon
            component={Trophy} 
            inheritViewBox 
            sx={{ 
                fontSize: 24,
                color: '#F59E0B' 
            }} 
            />
      <Typography variant="h5" component="h2" fontWeight="bold">
          Leaderboard
        </Typography>
      </Box>
      
      <List sx={{ width: '100%' }}>
        {sortedPlayers.map((player, index) => (
          <React.Fragment key={player.id}>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 1,
                my: 0.5,
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  {index + 1}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={player.name}
                secondary={
                  <Box display="flex" gap={2}>
                    <Typography variant="body2" color="text.secondary">
                      WPM: {player.wpm}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Accuracy: {player.accuracy}%
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};
