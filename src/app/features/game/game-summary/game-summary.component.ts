import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SecondsToTimePipe } from '@pipes/secods-to-time.pipe';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { GameStore } from '@core/store/game.store';
import { SHARE_URLS, SharePlatform } from './constants/game-summary.constants';
import { CommonModule } from '@angular/common';
import { AnswerHistoryComponent } from '@ui/answer-history/answer-history.component';
import { CardComponent } from '@ui/card/card.component';
import { CorrectAnswerChipComponent } from '@ui/chips/correct-answer-chip/correct-answer-chip.component';
import { FlagImgComponent } from '@ui/flag-img/flag-img.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SummaryItemComponent } from './ui/summary-item/summary-item';

@Component({
  standalone: true,
  selector: 'game-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    CommonModule,
    ButtonModule,
    DialogModule,
    FlagImgComponent,
    CorrectAnswerChipComponent,
    SummaryItemComponent,
    TranslocoModule,
    SecondsToTimePipe,
    AnswerHistoryComponent,
  ],
  templateUrl: './game-summary.component.html',
})
export class GameSummaryComponent {
  constructor(private _transloco: TranslocoService, private _secondsToTime: SecondsToTimePipe) {}
  public gameStore = inject(GameStore);
  public dialogVisible = false;

  public showDialog(): void {
    this.dialogVisible = true;
  }

  public share(platform: SharePlatform): void {
    const url = SHARE_URLS[platform];
    const { points, gameTime } = this.gameStore;
    const time = this._secondsToTime.transform(gameTime());
    const text = this._transloco.translate('share-text', { points: points(), time });
    const urlWithText = `${url}${encodeURIComponent(text)}`;
    window.open(urlWithText);
  }
}
