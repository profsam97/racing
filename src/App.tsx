import { Box, Typography, TextField, Button, Paper, Grid2, Container } from '@mui/material';
import { useGameStore } from './store';
import { useState } from 'react';

function App() {
  const { gameState } = useGameStore();
  const [hasJoined, setHasJoined] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [username, setUsername] = useState('');

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {      
      if(gameState.status === 'racing') {
        setGameStarted(true);
        return
      }
      setHasJoined(true);
    }
  };
  if (!hasJoined) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            width: '100%',
            maxWidth: '28rem'
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'text.primary',
              mb: 4
            }}
          >
            Typing Race
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleJoinGame}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                component="label"
                htmlFor="username"
                sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}
              >
                Enter your username
              </Typography>
              <TextField
                fullWidth
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                size="small"
              />
            </Box>
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5 }}
            >
              Join Game
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', p: 4 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'text.primary'
          }}
        >
          Typing Race
        </Typography>
    
        {gameState.status === 'countdown' && (
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              textAlign: 'center'
            }}
          >
            {gameState.countdown}
          </Typography>
        )}
       
     
        
        <Grid2 container spacing={4}>
          <Grid2 size={{xs:12, md:8}}>

            </Grid2>
          <Grid2 size={{xs:12, md:4}}>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

export default App;