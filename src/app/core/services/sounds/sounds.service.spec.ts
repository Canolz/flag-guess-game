import { TestBed } from '@angular/core/testing';
import { SoundsService } from './sounds.service';
import { SettingsService } from '@core/services/settings/settings.service';
import { SUCCESS_URL, ERROR_URL, START_LEVEL_URL, END_LEVEL_URL } from './sounds-urls.constants';

describe('SoundsService', () => {
  let service: SoundsService;
  let settingsServiceSpy: SettingsService;
  let audioPlayerSpy: jasmine.SpyObj<HTMLAudioElement>;

  beforeEach(() => {
    const audioSpy = jasmine.createSpyObj('HTMLAudioElement', ['play', 'load']);

    TestBed.configureTestingModule({
      providers: [SoundsService, SettingsService],
    });

    service = TestBed.inject(SoundsService);
    settingsServiceSpy = TestBed.inject(SettingsService);

    (service as any).audioPlayer = audioSpy;
    audioPlayerSpy = (service as any).audioPlayer;
  });

  describe('playAnswerSound', () => {
    it('should play the success sound when the answer is correct and sound is enabled', () => {
      spyOnProperty(settingsServiceSpy, 'isSoundEnabled', 'get').and.returnValue(true);

      service.playAnswerSound(true);

      expect(audioPlayerSpy.src).toContain(SUCCESS_URL);
      expect(audioPlayerSpy.load).toHaveBeenCalled();
      expect(audioPlayerSpy.play).toHaveBeenCalled();
    });

    it('should play the error sound when the answer is incorrect and sound is enabled', () => {
      spyOnProperty(settingsServiceSpy, 'isSoundEnabled', 'get').and.returnValue(true);

      service.playAnswerSound(false);

      expect(audioPlayerSpy.src).toContain(ERROR_URL);
      expect(audioPlayerSpy.load).toHaveBeenCalled();
      expect(audioPlayerSpy.play).toHaveBeenCalled();
    });

    it('should not play any sound if sound is disabled', () => {
      spyOnProperty(settingsServiceSpy, 'isSoundEnabled', 'get').and.returnValue(false);

      service.playAnswerSound(true);

      expect(audioPlayerSpy.play).not.toHaveBeenCalled();
    });
  });

  describe('playStartLevelSound', () => {
    it('should play the start level sound when sound is enabled', () => {
      spyOnProperty(settingsServiceSpy, 'isSoundEnabled', 'get').and.returnValue(true);

      service.playStartLevelSound();

      expect(audioPlayerSpy.src).toContain(START_LEVEL_URL);
      expect(audioPlayerSpy.load).toHaveBeenCalled();
      expect(audioPlayerSpy.play).toHaveBeenCalled();
    });

    it('should not play the start level sound when sound is disabled', () => {
      spyOnProperty(settingsServiceSpy, 'isSoundEnabled', 'get').and.returnValue(false);

      service.playStartLevelSound();

      expect(audioPlayerSpy.play).not.toHaveBeenCalled();
    });
  });

  describe('playEndLevelSound', () => {
    it('should play the end level sound when sound is enabled', () => {
      spyOnProperty(settingsServiceSpy, 'isSoundEnabled', 'get').and.returnValue(true);

      service.playEndLevelSound();

      expect(audioPlayerSpy.src).toContain(END_LEVEL_URL);
      expect(audioPlayerSpy.load).toHaveBeenCalled();
      expect(audioPlayerSpy.play).toHaveBeenCalled();
    });

    it('should not play the end level sound when sound is disabled', () => {
      spyOnProperty(settingsServiceSpy, 'isSoundEnabled', 'get').and.returnValue(false);

      service.playEndLevelSound();

      expect(audioPlayerSpy.play).not.toHaveBeenCalled();
    });
  });
});
