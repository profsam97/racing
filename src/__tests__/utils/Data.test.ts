import { images } from "../../data/images";

describe('Check Images are correctly set', () => {
  test('Check if the length of the images is not zero or empty', () => {

    expect(images.length).toBeGreaterThanOrEqual(1);
  });

  test('Check if the images are strings', () => {
    images.forEach((image) => {
      expect(typeof image).toBe('string');
    });
  });

  test('Check if the images length is exactly 6', () => {
   expect(images.length).toBe(7);
    });
});