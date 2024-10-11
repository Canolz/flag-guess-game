import { TestBed } from '@angular/core/testing';
import { SettingsService } from './settings.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Settings } from '../../interfaces/settings.interface';

describe('SettingsService', () => {
  let service: SettingsService;
  const localStorageServiceSpy = jasmine.createSpyObj<LocalStorageService>('LocalStorageService', [
    'getData',
    'saveData',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService, { provide: LocalStorageService, useValue: localStorageServiceSpy }],
    });

    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isSoundEnabled', () => {
    it('should return true if sound is enabled', () => {
      const settings: Settings = {
        continents: ['europe'],
        difficulty: 'medium',
        sound: 'on',
      };
      localStorageServiceSpy.getData.and.returnValue(settings);
      expect(service.isSoundEnabled).toBeTrue();
    });

    it('should return false if sound is disabled', () => {
      const settings: Settings = {
        continents: ['europe'],
        difficulty: 'medium',
        sound: 'off',
      };
      localStorageServiceSpy.getData.and.returnValue(settings);
      expect(service.isSoundEnabled).toBeFalse();
    });
  });

  describe('toggleSound', () => {
    it('should toggle sound setting', () => {
      const initialSettings: Settings = {
        continents: ['asia'],
        difficulty: 'easy',
        sound: 'on',
      };
      localStorageServiceSpy.getData.and.returnValue(initialSettings);

      service.toggleSound();
      expect(localStorageServiceSpy.saveData).toHaveBeenCalledWith(service.SETTINGS_STORAGE_KEY, {
        ...initialSettings,
        sound: 'on',
      });

      initialSettings.sound = 'off';
      localStorageServiceSpy.getData.and.returnValue(initialSettings);

      service.toggleSound();
      expect(localStorageServiceSpy.saveData).toHaveBeenCalledWith(service.SETTINGS_STORAGE_KEY, {
        ...initialSettings,
        sound: 'off',
      });
    });
  });

  describe('getSettings', () => {
    it('should return default settings if no settings are saved', () => {
      localStorageServiceSpy.getData.and.returnValue(null);
      const settings = service.getSettings();
      expect(settings).toEqual(service.DEFAULT_SETTINGS);
    });

    it('should return saved settings if they exist', () => {
      const savedSettings: Settings = {
        continents: ['europe'],
        difficulty: 'hard',
        sound: 'off',
      };
      localStorageServiceSpy.getData.and.returnValue(savedSettings);
      const settings = service.getSettings();
      expect(settings).toEqual(savedSettings);
    });
  });

  describe('save', () => {
    it('should save settings', () => {
      const newSettings: Settings = {
        continents: ['asia'],
        difficulty: 'easy',
        sound: 'on',
      };
      service.save(newSettings);
      expect(localStorageServiceSpy.saveData).toHaveBeenCalledWith(service.SETTINGS_STORAGE_KEY, newSettings);
    });
  });

  describe('getSettingsOptions', () => {
    it('should return default options', () => {
      const options = service.getSettingsOptions();
      expect(options).toEqual(service.DEFAULT_OPTIONS);
    });
  });
});
