import { TestBed } from '@angular/core/testing';

import { TranslocoService } from '@ngneat/transloco';

import { Country } from '@core/interfaces/country.interface';
import { CountryNamePipe } from './country-name.pipe';

describe('CountryNamePipe', () => {
  let pipe: CountryNamePipe;
  let translocoServiceSpy: {
    getActiveLang: jasmine.Spy;
  };

  const countryMock: Country = {
    name: {
        common: 'Germany',
        official: '',
        nativeName: {}
    },
    translations: {
        es: {
            common: 'Alemania',
            official: ''
        },
        fr: {
            common: 'Allemagne',
            official: ''
        },
    },
    code: '',
    cca3: '',
    status: '',
    unMember: false,
    altSpellings: [],
    region: '',
    latlng: [],
    landlocked: false,
    area: 0,
    flag: '',
    maps: {
        googleMaps: '',
        openStreetMaps: ''
    },
    population: 0,
    timezones: [],
    continents: [],
    startOfWeek: '',
    capitalInfo: {
        latlng: []
    }
};

  beforeEach(() => {
   translocoServiceSpy = {
        getActiveLang: jasmine.createSpy('getActiveLang'),
   }

    TestBed.configureTestingModule({
      providers: [
        CountryNamePipe,
        { provide: TranslocoService, useValue: translocoServiceSpy }
      ],
    });

    pipe = TestBed.inject(CountryNamePipe);
  });

  it('should return the common name in English if the active language is "en"', () => {
    translocoServiceSpy.getActiveLang.and.returnValue('en');
    const result = pipe.transform(countryMock);

    expect(result).toBe('Germany');
    expect(translocoServiceSpy.getActiveLang).toHaveBeenCalled();
  });

  it('should return the translated name based on the active language', () => {

    translocoServiceSpy.getActiveLang.and.returnValue('es');

    const result = pipe.transform(countryMock);

    expect(result).toBe('Alemania');
    expect(translocoServiceSpy.getActiveLang).toHaveBeenCalled();
  });

  it('should return the translation for "fr" when the active language is French', () => {
    translocoServiceSpy.getActiveLang.and.returnValue('fr');

    const result = pipe.transform(countryMock);

    expect(result).toBe('Allemagne');
    expect(translocoServiceSpy.getActiveLang).toHaveBeenCalled();
  });
});
