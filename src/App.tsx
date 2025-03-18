import { Box, Grid2, Container } from '@mui/material';
import { useGameStore } from './store';
import { useEffect, useState } from 'react';
import { Leaderboard } from './components/Leaderboard';
import { RaceTrack } from './components/RaceTrack';
import { wsClient } from './websocket/client';
import { TypingArea } from './components/TypingArea';
import JoinGame from './components/JoinGame';
import Welcome from './components/Welcome';

function App() {
  const { gameState } = useGameStore();
  const [hasJoined, setHasJoined] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [username, setUsername] = useState('');
  useEffect(() => {
    wsClient.connect();
  }, []);

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {      
      if(gameState.status === 'racing') {
        setGameStarted(true);
        return
      }
      wsClient.joinGame(username.trim());
      setHasJoined(true);
    }
  };
  const handleReplay = () => {
    wsClient.replay();
  };

  if (!hasJoined) {
    return (
        <JoinGame username={username} setUsername={setUsername} handleJoinGame={handleJoinGame}  gameStarted={gameStarted}/>
    );
  }
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff', p: 4 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Welcome gameState={gameState} handleReplay={handleReplay} />
        <RaceTrack players={gameState.players} />
        <Grid2 container spacing={4}>
          <Grid2 size={{xs:12, md:8}}>
            <TypingArea />
            </Grid2>
          <Grid2 size={{xs:12, md:4}}>
            <Leaderboard players={gameState.players}/>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
export default App;