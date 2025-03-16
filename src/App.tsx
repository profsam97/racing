import { Box, Typography, Grid2, Container } from '@mui/material';
import { useGameStore } from './store';

function App() {
  const { gameState } = useGameStore();


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