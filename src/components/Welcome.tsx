import { Box, Button, Typography } from "@mui/material";
import { GameState } from "../types";

interface WelcomeProps {
    gameState : GameState; 
    handleReplay: () => void;
}
const Welcome : React.FC<WelcomeProps> = ({gameState, handleReplay}) => {

    return (
                <Box>
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
       
       {gameState.status === 'waiting' && (
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              textAlign: 'center'
            }}
          >
            Waiting for other players to join...
          </Typography>
        )}

        {gameState.status === 'racing' && gameState.timeLeft !== undefined && (
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 'bold',
              textAlign: 'center',
              color: `${Math.floor(gameState.timeLeft / 60) < 1 && (gameState.timeLeft % 60 < 10) ? 'red' : 'text.primary'}`
            }}
          >
            {Math.floor(gameState.timeLeft / 60)}:{(gameState.timeLeft % 60).toString().padStart(2, '0')}
          </Typography>
        )}
        {gameState.status === 'finished' && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleReplay}
              variant="contained"
              color="primary"
            >
              Play Again
            </Button>
          </Box>
        )}
    </Box>
    )

}


export default Welcome;