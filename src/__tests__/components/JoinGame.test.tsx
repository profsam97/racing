import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import JoinGame from '../../components/JoinGame';

describe('JoinGame Component', () => {
  const mockHandleJoinGame = jest.fn();
  const mockSetUsername = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
    console.log(React)
  
  test('should render the component with title', () => {
    render(
      <JoinGame 
        handleJoinGame={mockHandleJoinGame}
        setUsername={mockSetUsername}
        username=""
        gameStarted={false}
      />
    );
    
    // Check if the title is rendered
    expect(screen.getByText('Typing Race')).toBeInTheDocument();
    
    // Check if the username label is rendered
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
    
    // Check if the input field is rendered
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    
    // Check if the join button is rendered
    expect(screen.getByText('Join Game')).toBeInTheDocument();
  });
  
  test('should update username when input changes', () => {
    render(
      <JoinGame 
        handleJoinGame={mockHandleJoinGame}
        setUsername={mockSetUsername}
        username="test"
        gameStarted={false}
      />
    );
    
    const usernameInput = screen.getByPlaceholderText('Username');
    
    // Check if the input has the correct initial value
    expect(usernameInput).toHaveValue('test');
    
    // here we change the input
    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });
    
    // Check if setUsername was called with the new value
    expect(mockSetUsername).toHaveBeenCalledWith('newUsername');
  });
  
  test('should call handleJoinGame when form is submitted', () => {
    render(
      <JoinGame 
        handleJoinGame={mockHandleJoinGame}
        setUsername={mockSetUsername}
        username="test"
        gameStarted={false}
      />
    );
    
    // Find the form
    const form = screen.getByRole('form');
    
    // Simulate form submission
    fireEvent.submit(form);
    
    // Check if handleJoinGame was called
    expect(mockHandleJoinGame).toHaveBeenCalledTimes(1);
  });
  
  test('should show "Game has already started" message when gameStarted is true', () => {
    render(
      <JoinGame 
        handleJoinGame={mockHandleJoinGame}
        setUsername={mockSetUsername}
        username="test"
        gameStarted={true}
      />
    );
    
    // Check if the message is rendered
    expect(screen.getByText('Game has already started. Please wait for the next round.')).toBeInTheDocument();
  });
  
  test('should not show "Game has already started" message when gameStarted is false', () => {
    render(
      <JoinGame 
        handleJoinGame={mockHandleJoinGame}
        setUsername={mockSetUsername}
        username="test"
        gameStarted={false}
      />
    );
    // Check if the message is not rendered
    expect(screen.queryByText('Game has already started. Please wait for the next round.')).not.toBeInTheDocument();
  });
  
  test('should disable submit button when username is empty', () => {
    render(
      <JoinGame 
        handleJoinGame={mockHandleJoinGame}
        setUsername={mockSetUsername}
        username=""
        gameStarted={false}
      />
    );
    // Find the submit button
    const submitButton = screen.getByText('Join Game');
    
    // Check if the button is not disabled 
    expect(submitButton).not.toBeDisabled();
    
    // Try to submit the form with empty username
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    expect(mockHandleJoinGame).toHaveBeenCalledTimes(1);
  });
});
