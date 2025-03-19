
export const calculateProgress = (targetText: string, currentInput: string): number => {
    let correctChars = 0;
    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] === targetText[i]) {
        correctChars++;
      }
    }
    return (correctChars / targetText.length) * 100;
  };

export   const calclateWPM = (charCount: number, startTime: number | null): number => {
    if (!startTime) return 0;
    const minutes = (Date.now() - startTime) / 60000; // Convert ms to minutes
    const words = charCount / 5; 
    return Math.round(words / minutes);
  };

 export const calculateAccuracy = (totalErrors: number, textLength: number): number => {
    if (textLength === 0) return 100;
    const accuracy = Math.max(0, ((textLength - totalErrors) / textLength) * 100);
    return Math.round(accuracy);
  };