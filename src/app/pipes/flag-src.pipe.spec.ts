import { TestBed } from '@angular/core/testing';
import { FlagSrcPipe } from './flag-src.pipe';

describe('FlagSrcPipe', () => {
  let pipe: FlagSrcPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlagSrcPipe],
    });

    pipe = TestBed.inject(FlagSrcPipe);
  });

  it('should return the correct flag URL for a given country code', () => {
    const result = pipe.transform('US');

    expect(result).toBe('assets/flags/4x3/us.svg');
  });

  it('should handle lowercase country codes correctly', () => {
    const result = pipe.transform('us');

    expect(result).toBe('assets/flags/4x3/us.svg');
  });

  it('should handle mixed case country codes correctly', () => {
    const result = pipe.transform('Gb');

    expect(result).toBe('assets/flags/4x3/gb.svg');
  });
});
