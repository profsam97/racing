import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';
import { useGameStore } from '../store';
import { wsClient } from '../websocket/client';
import { calculateAccuracy, calculateProgress, calculateWPM } from '../utils/helpers';
import RenderText from '../utils/Rendertext';

export const TypingArea: React.FC = () => {
  const { gameState, playerInput, setPlayerInput } = useGameStore();
  const { status, text, timeLeft } = gameState;
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalErrors, setTotalErrors] = useState(0);
  const [previousInput, setPreviousInput] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status !== 'racing') return;  // if status is not racing, we return 
    const newInput = e.target.value;
    setPlayerInput(newInput);
    if (!startTime) {     
      setStartTime(Date.no2()); // if time is not set, we set it to the current time
    }
    let newErrors = 0;  //we use this to track number of errors
    for (let i = 0; i < Math.max(newInput.length, previousInput.length); i++) {
      if (newInput[i] !== text[i] && (!previousInput[i] || previousInput[i] === text[i])) {
        newErrors++;
      }
    }
    if (newErrors > 0) {
      setTotalErrors(prev => prev + newErrors);
    }
    // Store current input for next comparison
    setPreviousInput(newInput);
    // Calculate progress, WPM, and accuracy
    // Calculate progress as percentage of correct characters
    const progress = calculateProgress(text, newInput);
    const wpm = calculateWPM(newInput.length, startTime);
    const accuracy = calculateAccuracy(totalErrors + newErrors, text.length);
    if (newInput === text) {
      setIsCompleted(true);
    }
    wsClient.updateProgress({ progress, wpm, accuracy });
  };
  useEffect(() => {
    if (status === 'racing') {
      setStartTime(null);
      setTotalErrors(0);
      setPreviousInput('');
      setIsCompleted(false);
    }
    if (status === 'countdown' || status === 'finished') {
      setPlayerInput('');
    }
  }, [status, setPlayerInput]);
  const isInputDisabled = status !== 'racing' || isCompleted || timeLeft === 0;
  return (
    <Box sx={{ width: '100%', maxWidth: '42rem', mx: 'auto', mt: 3, bgcolor: 'grey.100' }}>
      <Paper elevation={3} sx={{ p: 6, borderRadius: 2 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4, 
            fontFamily: 'monospace', 
            lineHeight: 1.7, 
            letterSpacing: '0.05em',
            userSelect: 'none'
          }}
        >
         <RenderText text={text} playerInput={playerInput} />
        </Typography>
        
        <TextField
          fullWidth
          value={playerInput}
          onChange={handleInputChange}
          disabled={isInputDisabled}
          onPaste={(e) => e.preventDefault()}
          placeholder={status === 'racing' ? 'Start typing...' : status === 'countdown' ? 'getting ready' :  'Waiting ...'}
          slotProps={{
            input: {
              style : {
                fontFamily: 'monospace'
              }
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
                borderWidth: 2
              }
            }
          }}
        />
        
        {isCompleted && playerInput === text && (
          <Typography sx={{ mt: 2, color: 'success.main', fontWeight: 500 }}>
            Great job! You've completed the text!
          </Typography>
        )}
        
        {timeLeft === 0 && !isCompleted && (
          <Typography sx={{ mt: 2, color: 'error.main', fontWeight: 500 }}>
            Time's up! Better luck next time!
          </Typography>
        )}
      </Paper>
    </Box>
  );
};