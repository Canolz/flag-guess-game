import { TestBed } from '@angular/core/testing';
import { SecondsToTimePipe } from './seconds-to-time.pipe';

describe('SecondsToTimePipe', () => {
  let pipe: SecondsToTimePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecondsToTimePipe],
    });

    pipe = TestBed.inject(SecondsToTimePipe);
  });

  it('should transform seconds into "MM:SS" format', () => {
    expect(pipe.transform(0)).toBe('00:00');
    expect(pipe.transform(59)).toBe('00:59');
    expect(pipe.transform(60)).toBe('01:00');
    expect(pipe.transform(75)).toBe('01:15');
    expect(pipe.transform(3600)).toBe('60:00');
  });

  it('should handle single-digit minutes and seconds with leading zeros', () => {
    expect(pipe.transform(5)).toBe('00:05');
    expect(pipe.transform(9)).toBe('00:09');
    expect(pipe.transform(600)).toBe('10:00');
    expect(pipe.transform(602)).toBe('10:02');
  });

  it('should return correct format for large values', () => {
    expect(pipe.transform(3661)).toBe('61:01'); // 3661 seconds = 61 minutes and 1 second
    expect(pipe.transform(7322)).toBe('122:02'); // 7322 seconds = 122 minutes and 2 seconds
  });
});
