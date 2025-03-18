const devUrl = 'http://localhost:3000';
const prodUrl = 'https://d2y289itrc50q.cloudfront.net';
export const baseUrl = process.env.NODE_ENV === 'development' ? devUrl : prodUrl;