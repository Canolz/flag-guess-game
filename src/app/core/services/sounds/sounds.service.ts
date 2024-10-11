import { SettingsService } from '@core/services/settings/settings.service';
import { Injectable, inject } from '@angular/core';

import { END_LEVEL_URL, ERROR_URL, START_LEVEL_URL, SUCCESS_URL } from './sounds-urls.constants';

@Injectable({
  providedIn: 'root',
})
export class SoundsService {
  private audioPlayer: HTMLAudioElement;

  constructor(private settingsService: SettingsService) {
    this.audioPlayer = new Audio();
  }

  public playAnswerSound(isCorrect: boolean): void {
    const url = isCorrect ? SUCCESS_URL : ERROR_URL;
    this._playAudio(url);
  }

  public playStartLevelSound(): void {
    this._playAudio(START_LEVEL_URL);
  }

  public playEndLevelSound(): void {
    this._playAudio(END_LEVEL_URL);
  }

  private _playAudio(url: string) {
    if (this.settingsService.isSoundEnabled) {
      this.audioPlayer.src = url;
      this.audioPlayer.load();
      this.audioPlayer.play();
    }
  }
}
