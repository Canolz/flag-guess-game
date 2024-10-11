import { SettingsService } from '@core/services/settings/settings.service';
import { getRandomItem, popRandomItem } from '@core/utils/random-item';
import { mixSelectedOption } from '@core/utils/mix-selected-element';
import { Country } from '@core/interfaces/country.interface';
import { Injectable } from '@angular/core';
import { GameState } from '../../interfaces/game.interface';
import { countries_json } from '@core/utils/countries';

interface GameOptions {
  countryOptions: Country[];
  remainCountries: Country[];
  selectedCountry: Country;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  EASY_POPULATION = 3000000;
  MEDIUM_POPULATION = 300000;
  NUM_OPTIONS = 6;

  constructor(private _settingsService: SettingsService) {}

  private _getPlayableCountries(): Country[] {
    let countries = countries_json as Country[];
    const settings = this._settingsService.getSettings();
    countries = countries.filter(c => c.continents.some(con => settings.continents.includes(con)));
    switch (settings.difficulty) {
      case 'easy':
        return countries.filter(c => c.independent && c.population > this.EASY_POPULATION);
      case 'medium':
        return countries.filter(c => c.independent && c.population > this.MEDIUM_POPULATION);
      default:
        return countries;
    }
  }

  private _getNumOptions(countries: Country[]): number {
    return Math.min(this.NUM_OPTIONS, countries.length);
  }

  public getNextTurn(remainCountries: Country[], playableCountries: Country[]): GameOptions {
    const countryOptions: Country[] = [];
    const selectedCountry: Country = popRandomItem(remainCountries);

    countryOptions.push(selectedCountry);

    while (countryOptions.length < this._getNumOptions(playableCountries)) {
      const randomCountry = getRandomItem(playableCountries);
      if (!countryOptions.some(c => c.code === randomCountry.code)) {
        countryOptions.push(randomCountry);
      }
    }
    mixSelectedOption<Country>(countryOptions, selectedCountry);
    return { countryOptions, selectedCountry, remainCountries };
  }

  public getInitialTurn(): GameState {
    const countries = this._getPlayableCountries();
    const numOptions = this._getNumOptions(countries);
    const { countryOptions, selectedCountry, remainCountries } = this.getNextTurn([...countries], countries);
    return {
      playableCountries: countries,
      remainCountries,
      countryOptions,
      selectedCountry,
      correctAnswers: 0,
      incorrectAnswers: 0,
      successRate: 0,
      answerHistory: [],
      gameTime: 0,
      isImgLoad: false,
      numOptions,
    };
  }
}
