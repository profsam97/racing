import React from "react";
import { Typography } from "@mui/material";

interface renderTextProps {
    text : string;
    playerInput : string;
}    

const RenderText : React.FC<renderTextProps> = ({text, playerInput}) => {
    return text.split('').map((char, index) => {
      if (index >= playerInput.length) {
        // Not typed yet
        return (
          <Typography component="span" key={index} sx={{ color: 'text.primary' }} data-testid="default-char">
            {char}
          </Typography>
        );
      } else if (char === playerInput[index]) {
        // Correct character
        return (
          <Typography component="span" key={index} sx={{ color: 'success.main' }} data-testid="correct-char">
            {char}
          </Typography>
        );
      } else {
        // Incorrect character
        return (
          <Typography component="span" key={index} sx={{ color: 'error.main' }} data-testid="incorrect-char">
            {playerInput[index] || char}
          </Typography>
        );
      }
    });
  };

  export default RenderText;
