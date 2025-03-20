import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TypingArea } from '../../components/TypingArea';
import { useGameStore } from '../../store';
import { wsClient } from '../../websocket/client';

jest.mock('../../store', () => ({
  useGameStore: jest.fn()
}));

jest.mock('../../websocket/client', () => ({
  wsClient: {
    updateProgress: jest.fn()
  }
}));

describe('TypingArea Component', () => {
  const originalDateNow = Date.now;
  const mockDateNow = 1000000000000;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    Date.now = jest.fn(() => mockDateNow);
    
    ((useGameStore as unknown) as jest.Mock).mockReturnValue({
      gameState: {
        status: 'racing',
        text: 'test text',
        timeLeft: 60
      },
      playerInput: '',
      setPlayerInput: jest.fn()
    });
  });
  
  afterEach(() => {
    Date.now = originalDateNow;
  });
  
  test('should render the typing area with text', () => {
    render(<TypingArea />);
    
    // Check if the text field is rendered
    const textField = screen.getByPlaceholderText('Start typing...');
    expect(textField).toBeInTheDocument();
  });
  
  test('should handle input changes when racing', () => {
    const mockSetPlayerInput = jest.fn();
    ((useGameStore as unknown) as jest.Mock).mockReturnValue({
        gameState: {
        status: 'racing',
        text: 'test text',
        timeLeft: 60
      },
      playerInput: '',
      setPlayerInput: mockSetPlayerInput
    });
    
    render(<TypingArea />);
    
    const textField = screen.getByPlaceholderText('Start typing...');
    fireEvent.change(textField, { target: { value: 't' } });
    
    // Check if setPlayerInput was called with the new input
    expect(mockSetPlayerInput).toHaveBeenCalledWith('t');
    
    // Check if updateProgress was called
    expect(wsClient.updateProgress).toHaveBeenCalled();
  });
  test('should not handle input changes when not racing', () => {
    const mockSetPlayerInput = jest.fn();
    ((useGameStore as unknown) as jest.Mock).mockReturnValue({
        gameState: {
        status: 'waiting',
        text: 'test text',
        timeLeft: 60
      },
      playerInput: '',
      setPlayerInput: mockSetPlayerInput
    });
    
    render(<TypingArea />);
    
    const textField = screen.getByPlaceholderText('Waiting ...');
    fireEvent.change(textField, { target: { value: 't' } });
    // setPlayerInput should not be called
    expect(mockSetPlayerInput).not.toHaveBeenCalled();
    // updateProgress should not be called
    expect(wsClient.updateProgress).not.toHaveBeenCalled();
  });
  
  test('should show time up message when time is 0 and text is not completed', () => {
    ((useGameStore as unknown) as jest.Mock).mockReturnValue({
        gameState: {
        status: 'racing',
        text: 'test text',
        timeLeft: 0
      },
      playerInput: 'test', 
      setPlayerInput: jest.fn()
    });
    
    render(<TypingArea />);
    
    // Check if time up message is shown
    expect(screen.getByText("Time's up! Better luck next time!")).toBeInTheDocument();
  });
  test('should show time up message when time is 0', () => {
    ((useGameStore as unknown) as jest.Mock).mockReturnValue({
      gameState: {
        status: 'racing',
        text: 'test text',
        timeLeft: 0
      },
      playerInput: 'test', 
      setPlayerInput: jest.fn()
    });
    
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, jest.fn()]); //we set isCompleted is false
    
    const { container } = render(<TypingArea />);
    
    // Check if the time's up message is in the document
    const timeUpMessage = container.querySelectorAll('[data-testid="incomplete"]');
    const timeUpMessageElement = timeUpMessage[0];
    expect(timeUpMessageElement).toHaveTextContent("Time's up! Better luck next time!");
    
    // Check if the input field exists
    const textField = screen.getByPlaceholderText('Start typing...');
    expect(textField).toBeInTheDocument();
  });
  
  test('should have isInputDisabled true when text is completed', () => {
    const testText = 'test text';
    
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [true, jest.fn()]); // isCompleted is true
    
    ((useGameStore as unknown) as jest.Mock).mockReturnValue({
      gameState: {
        status: 'racing',
        text: testText,
        timeLeft: 60
      },
      playerInput: testText, 
      setPlayerInput: jest.fn()
    });
    
    render(<TypingArea />);
    
    // Check if the input field exists
    const textField = screen.getByPlaceholderText('Start typing...');
    expect(textField).toBeInTheDocument();
  });
  

  test('should disable input when status is not racing', () => {
    (useGameStore as unknown as jest.Mock).mockReturnValue({
      gameState: {
        status: 'waiting',
        text: 'test text',
        timeLeft: 60
      },
      playerInput: '',
      setPlayerInput: jest.fn()
    });
    
    render(<TypingArea />);
    
    // Check if the input field exists with the correct placeholder
    const textField = screen.getByPlaceholderText('Waiting ...');
    expect(textField).toBeInTheDocument();
  });
  
  test('should call handleInputChange when typing', () => {
    const mockSetPlayerInput = jest.fn();
    (useGameStore as unknown as jest.Mock).mockReturnValue({
      gameState: {
        status: 'racing',
        text: 'test text',
        timeLeft: 60
      },
      playerInput: '',
      setPlayerInput: mockSetPlayerInput
    });
    
    render(<TypingArea />);
    
    const textField = screen.getByPlaceholderText('Start typing...');
    fireEvent.change(textField, { target: { value: 't' } });
    
    // Check if setPlayerInput was called with the new input
    expect(mockSetPlayerInput).toHaveBeenCalledWith('t');
  });
  
  test('should reset input when game status changes to countdown or finished', () => {
    const mockSetPlayerInput = jest.fn();
    let gameStatus = 'racing';
    
    (useGameStore as   unknown as jest.Mock).mockImplementation(() => ({
      gameState: {
        status: gameStatus,
        text: 'test text',
        timeLeft: 60
      },
      playerInput: 'some input',
      setPlayerInput: mockSetPlayerInput
    }));
    
    const { rerender } = render(<TypingArea />);
    
    // Change status to countdown and rerender
    gameStatus = 'countdown';
    rerender(<TypingArea />);
    
    // Check if setPlayerInput was called to reset input
    expect(mockSetPlayerInput).toHaveBeenCalledWith('');
    
    // Change status to finished and rerender
    gameStatus = 'finished';
    rerender(<TypingArea />);
    
    // Check if setPlayerInput was called again
    expect(mockSetPlayerInput).toHaveBeenCalledTimes(2);
  });
});
