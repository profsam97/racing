import { baseUrl } from "../../utils/BaseUrl";

describe('Test for base url', () => {
  test('should be localhost when dev is set', () => {
    expect(baseUrl).toBe('http://localhost:3000');
  });

  // check if the base url is set to the production url
  test('baseUrl should not be null', () => {
    expect(baseUrl).not.toBeNull();
  });

  test('baseUrl should be a string', () => {
    expect(typeof baseUrl).toBe('string');
  }
  );

  test('Dev url is set to localhost', () => {
    expect(baseUrl).toBe('http://localhost:3000');
  }
  );
});