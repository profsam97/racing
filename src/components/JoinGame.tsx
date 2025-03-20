import React from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

interface JoinGameProps {
  handleJoinGame: (e: React.FormEvent) => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  gameStarted: boolean;
}
const JoinGame : React.FC<JoinGameProps> = ({handleJoinGame, username, setUsername,gameStarted}) => {    

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
                role="form"
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
              {gameStarted && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ textAlign: 'center', color: 'text.secondary' }}
                  >
                    Game has already started. Please wait for the next round.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        )

}


export default JoinGame;