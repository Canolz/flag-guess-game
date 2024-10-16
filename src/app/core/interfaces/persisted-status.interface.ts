import { Country } from '@core/interfaces/country.interface';
import { Answer } from './answer.interface';

export interface PersistedStatus {
  playableCountries: Country[];
  remainCountries: Country[];
  countryOptions: Country[];
  selectedCountry: Country;
  numOptions: number;
  answerHistory: Answer[];
  gameTime: number;
}
