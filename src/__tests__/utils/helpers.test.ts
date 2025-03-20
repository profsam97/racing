import { calculateProgress, calculateWPM, calculateAccuracy } from '../../utils/helpers';

describe('calculateProgress', () => {
  test('should return 0 when no characters match', () => {
    const targetText = 'hello world';
    const currentInput = 'abcde';
    expect(calculateProgress(targetText, currentInput)).toBe(0);
  });

  test('should return 100 when all characters match', () => {
    const targetText = 'hello world';
    const currentInput = 'hello world';
    expect(calculateProgress(targetText, currentInput)).toBe(100);
  });

  test('should return correct percentage for partial matches', () => {
    const targetText = 'hello world';
    const currentInput = 'hello';
    // 5 correct characters out of 11 total = 45.45%
    expect(calculateProgress(targetText, currentInput)).toBeCloseTo(45.45, 1);
  });

  test('should handle empty input', () => {
    const targetText = 'hello world';
    const currentInput = '';
    expect(calculateProgress(targetText, currentInput)).toBe(0);
  });

  test('should handle input longer than target', () => {
    const targetText = 'hello';
    const currentInput = 'hello world';
    // Only the first 5 characters are checked, all match
    expect(calculateProgress(targetText, currentInput)).toBe(100);
  });
});

describe('calculateWPM', () => {
  test('should return 0 when startTime is null', () => {
    const charCount = 50;
    const startTime = null;
    expect(calculateWPM(charCount, startTime)).toBe(0);
  });

  test('should calculate WPM correctly', () => {
    const charCount = 50; // 10 words (assuming 5 chars per word)
    const startTime = Date.now() - 60000; // 1 minute ago
    // 10 words in 1 minute = 10 WPM
    expect(calculateWPM(charCount, startTime)).toBe(10);
  });

  test('should round the WPM to the nearest integer', () => {
    const charCount = 55; // 11 words
    const startTime = Date.now() - 60000; // 1 minute ago
    // 11 words in 1 minute = 11 WPM
    expect(calculateWPM(charCount, startTime)).toBe(11);
  });

  test('should handle very short time intervals', () => {
    const charCount = 10;
    const startTime = Date.now() - 1000; // 1 second ago
    // This would be a very high WPM, but the function should still calculate it
    expect(calculateWPM(charCount, startTime)).toBeGreaterThan(0);
  });
});

describe('calculateAccuracy', () => {
  test('should return 100 when there are no errors', () => {
    const totalErrors = 0;
    const textLength = 100;
    expect(calculateAccuracy(totalErrors, textLength)).toBe(100);
  });

  test('should return 0 when errors equal or exceed text length', () => {
    const totalErrors = 100;
    const textLength = 100;
    expect(calculateAccuracy(totalErrors, textLength)).toBe(0);
  });

  test('should calculate accuracy correctly for partial errors', () => {
    const totalErrors = 20;
    const textLength = 100;
    // (100 - 20) / 100 * 100 = 80%
    expect(calculateAccuracy(totalErrors, textLength)).toBe(80);
  });

  test('should return 100 when text length is 0', () => {
    const totalErrors = 5;
    const textLength = 0;
    expect(calculateAccuracy(totalErrors, textLength)).toBe(100);
  });

  test('should round the accuracy to the nearest integer', () => {
    const totalErrors = 33;
    const textLength = 100;
    // (100 - 33) / 100 * 100 = 67%
    expect(calculateAccuracy(totalErrors, textLength)).toBe(67);
  });
});
