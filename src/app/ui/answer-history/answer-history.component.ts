import { CorrectAnswerChipComponent } from '@ui/chips/correct-answer-chip/correct-answer-chip.component';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FlagImgComponent } from '@ui/flag-img/flag-img.component';
import { CountryNamePipe } from '@pipes/country-name.pipe';
import { CardComponent } from '@ui/card/card.component';
import { TranslocoModule } from '@ngneat/transloco';
import { GameStore } from '@core/store/game.store';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Answer } from '@core/interfaces/answer.interface';
import { fadeCard } from '@ui/animations/fade-card.animation';

@Component({
  selector: 'answer-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeCard],
  templateUrl: './answer-history.component.html',
  imports: [
    CommonModule,
    FlagImgComponent,
    CorrectAnswerChipComponent,
    CardComponent,
    ButtonModule,
    CountryNamePipe,
    TranslocoModule,
  ],
})
export class AnswerHistoryComponent {
  public gameStore = inject(GameStore);
  public visibleHistorySize = signal<number>(6);

  public visibleHistory = computed<Answer[]>(() => {
    return this.gameStore.answerHistory().slice(0, this.visibleHistorySize());
  });

  public visibleBtn = computed<boolean>(() => {
    return this.gameStore.answerHistory().length > this.visibleHistory().length;
  });

  showMoreItems(): void {
    this.visibleHistorySize.update(value => value + 3);
  }
}
