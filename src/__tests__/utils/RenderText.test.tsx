import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RenderText from '../../utils/Rendertext';

describe('RenderText Component', () => {
  
  test('should render correct characters in green', () => {
    const text = 'hello';
    const playerInput = 'hello';
    
    const { container } = render(<RenderText text={text} playerInput={playerInput} />);
    
    // All characters should be rendered with success color

    const successElements = container.querySelectorAll('[data-testid="correct-char"]');
    expect(successElements.length).toBe(5); 
  });
  console.log(React)
  test('should render incorrect characters in red', () => {
    const text = 'hello';
    const playerInput = 'haxlo';
    
    const { container } = render(<RenderText text={text} playerInput={playerInput} />);
    
    // 'a' and 'x' should be rendered with error color

    const errorElements = container.querySelectorAll('[data-testid="incorrect-char"]');
    expect(errorElements.length).toBe(2);
    
    // 'h', 'l', 'o' should be rendered with success color
    const successElements = container.querySelectorAll('[data-testid="correct-char"]');
    expect(successElements.length).toBe(3);
  });
  
  test('should handle partial input', () => {
    const text = 'hello world';
    const playerInput = 'hello';
    
    const { container } = render(<RenderText text={text} playerInput={playerInput} />);
    
    // 'hello' should be rendered with success color
    const successElements = container.querySelectorAll('[data-testid="correct-char"]');
    expect(successElements.length).toBe(5);

  });
  
  test('should handle input longer than text', () => {
    const text = 'hello';
    const playerInput = 'hello world';
    
    const { container } = render(<RenderText text={text} playerInput={playerInput} />);
    
    // All characters of 'hello' should be rendered with success color
    const successElements = container.querySelectorAll('[data-testid="correct-char"]');
    expect(successElements.length).toBe(5);
    
    // The extra characters 'world' should not be rendered
    expect(screen.queryByText('world')).not.toBeInTheDocument();
  });
});
