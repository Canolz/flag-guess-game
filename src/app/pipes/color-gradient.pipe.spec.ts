import { ColorGradientPipe } from './color-gradient.pipe';

describe('ColorGradientPipe', () => {
  let pipe: ColorGradientPipe;

  beforeEach(() => {
    pipe = new ColorGradientPipe();
  });

  it('should return red color for values less than 30', () => {
    expect(pipe.transform(20)).toBe('var(--red-500)');
    expect(pipe.transform(0)).toBe('var(--red-500)');
  });

  it('should return yellow color for values between 30 and 69', () => {
    expect(pipe.transform(30)).toBe('var(--yellow-500)');
    expect(pipe.transform(50)).toBe('var(--yellow-500)');
    expect(pipe.transform(69)).toBe('var(--yellow-500)');
  });

  it('should return green color for values 70 and above', () => {
    expect(pipe.transform(70)).toBe('var(--green-500)');
    expect(pipe.transform(100)).toBe('var(--green-500)');
  });
});
