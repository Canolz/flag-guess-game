import { Country } from '@core/interfaces/country.interface';

import { Answer } from './answer.interface';

export interface GameState {
  playableCountries: Country[];
  remainCountries: Country[];
  countryOptions: Country[];
  selectedCountry: Country;
  numOptions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  successRate: number;
  answerHistory: Answer[];
  gameTime: number;
  isImgLoad: boolean;
}

export const gameInitialState: GameState = {
  playableCountries: [],
  remainCountries: [],
  countryOptions: [],
  selectedCountry: {} as Country,
  numOptions: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  successRate: 0,
  isImgLoad: false,
  answerHistory: [],
  gameTime: 0,
};
