import '@testing-library/jest-dom';

// Mock  WebSocket client
jest.mock('./src/websocket/client', () => ({
  wsClient: {
    connect: jest.fn(),
    updateProgress: jest.fn(),
    joinGame: jest.fn(),
    replay: jest.fn(),
    disconnect: jest.fn(),
    hasStarted: jest.fn()
  }
}));

// Mock  BaseUrl
jest.mock('./src/utils/BaseUrl', () => ({
  baseUrl: 'http://localhost:3000'
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
