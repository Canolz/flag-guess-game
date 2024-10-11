import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { SettingsService } from '@core/services/settings/settings.service';
import { Country } from '@core/interfaces/country.interface';

describe('GameService', () => {
  let service: GameService;
  const settingsServiceSpy = jasmine.createSpyObj<SettingsService>('SettingsService', {
    getSettings: {
      continents: ['Europe'],
      difficulty: 'easy',
      sound: 'on',
    },
    toggleSound: undefined,
    save: undefined,
  });

  const mockCountries: Country[] = [
    {
      name: {
        common: 'Belgium',
        official: 'Kingdom of Belgium',
        nativeName: {
          nld: { official: 'Koninkrijk België', common: 'België' },
          fra: { official: 'Royaume de Belgique', common: 'Belgique' },
          deu: { official: 'Königreich Belgien', common: 'Belgien' },
        },
      },
      code: 'BEL',
      cca3: 'BEL',
      status: 'officially-assigned',
      unMember: true,
      altSpellings: ['BE', 'België', 'Belgique', 'Belgien'],
      region: 'Europe',
      translations: {
        nld: { official: 'Koninkrijk België', common: 'België' },
        fra: { official: 'Royaume de Belgique', common: 'Belgique' },
        deu: { official: 'Königreich Belgien', common: 'Belgien' },
      },
      latlng: [50.8333, 4.0],
      landlocked: false,
      area: 30528,
      flag: '🇧🇪',
      maps: {
        googleMaps: 'https://goo.gl/maps/UYpuhw2v2GuM6TAK6',
        openStreetMaps: 'https://www.openstreetmap.org/relation/52411',
      },
      population: 11589623,
      timezones: ['UTC+01:00'],
      continents: ['Europe'],
      startOfWeek: 'monday',
      capitalInfo: {
        latlng: [50.85, 4.35],
      },
    },
    {
      name: {
        common: 'Netherlands',
        official: 'Kingdom of the Netherlands',
        nativeName: {
          nld: { official: 'Koninkrijk der Nederlanden', common: 'Nederland' },
        },
      },
      code: 'NLD',
      cca3: 'NLD',
      status: 'officially-assigned',
      unMember: true,
      altSpellings: ['NL', 'Holland', 'Nederland'],
      region: 'Europe',
      translations: {
        nld: { official: 'Koninkrijk der Nederlanden', common: 'Nederland' },
        fra: { official: 'Royaume des Pays-Bas', common: 'Pays-Bas' },
      },
      latlng: [52.5, 5.75],
      landlocked: false,
      area: 41850,
      flag: '🇳🇱',
      maps: {
        googleMaps: 'https://goo.gl/maps/3yBuf4ijyGScxh5cA',
        openStreetMaps: 'https://www.openstreetmap.org/relation/47796',
      },
      population: 17134872,
      timezones: ['UTC+01:00'],
      continents: ['Europe'],
      startOfWeek: 'monday',
      capitalInfo: {
        latlng: [52.37, 4.89],
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService, { provide: SettingsService, useValue: settingsServiceSpy }],
    });

    service = TestBed.inject(GameService);
  });

  describe('_getPlayableCountries', () => {
    it('should filter countries based on settings (easy difficulty)', () => {
      settingsServiceSpy.getSettings.and.returnValue({
        continents: ['Europe'],
        difficulty: 'easy',
        sound: 'on',
      });

      const result = service['_getPlayableCountries']();

      expect(
        result.every(c => c.continents.includes('Europe') && c.independent && c.population > service.EASY_POPULATION)
      ).toBeTrue();
    });

    it('should filter countries based on settings (medium difficulty)', () => {
      settingsServiceSpy.getSettings.and.returnValue({
        continents: ['Europe'],
        difficulty: 'medium',
        sound: 'on',
      });

      const result = service['_getPlayableCountries']();

      expect(
        result.every(c => c.continents.includes('Europe') && c.independent && c.population > service.MEDIUM_POPULATION)
      ).toBeTrue();
    });

    it('should return all countries if difficulty is not easy or medium', () => {
      settingsServiceSpy.getSettings.and.returnValue({
        continents: ['Europe'],
        difficulty: 'hard',
        sound: 'on',
      });

      const result = service['_getPlayableCountries']();

      expect(result.every(c => c.continents.includes('Europe'))).toBeTrue();
    });
  });

  describe('_getNumOptions', () => {
    it('should return the minimum of NUM_OPTIONS and countries length', () => {
      const countries: Country[] = mockCountries.slice(0, 1);
      const result = service['_getNumOptions'](countries);

      expect(result).toBe(1);
    });

    it('should return NUM_OPTIONS if countries length is greater than NUM_OPTIONS', () => {
      const countries: Country[] = mockCountries;
      const result = service['_getNumOptions'](countries);

      expect(result).toBe(2);
    });
  });

  describe('getNextTurn', () => {
    it('should return the next turn options and selected country', () => {
      const playableCountries: Country[] = mockCountries.slice(0, 1);
      const remainCountries: Country[] = [...playableCountries];

      const result = service.getNextTurn(remainCountries, playableCountries);

      expect(result.countryOptions.length).toBe(1);
      expect(result.countryOptions).toContain(result.selectedCountry);
    });
  });

  describe('getInitialTurn', () => {
    it('should return the initial game state', () => {
      settingsServiceSpy.getSettings.and.returnValue({
        continents: ['Europe'],
        difficulty: 'easy',
        sound: 'on',
      });

      const result = service.getInitialTurn();

      expect(result.countryOptions.length).toBe(1);
      expect(result.countryOptions).toContain(result.selectedCountry);
      expect(result.correctAnswers).toBe(0);
      expect(result.incorrectAnswers).toBe(0);
      expect(result.successRate).toBe(0);
      expect(result.answerHistory.length).toBe(0);
      expect(result.gameTime).toBe(0);
      expect(result.isImgLoad).toBeFalse();
    });
  });
});
