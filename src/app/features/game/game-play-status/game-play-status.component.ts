import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameStore } from '@core/store/game.store';
import { TranslocoModule } from '@ngneat/transloco';
import { ColorGradientPipe } from '@pipes/color-gradient.pipe';
import { CountryNamePipe } from '@pipes/country.name.pipe';
import { fadeImage } from '@ui/animations/fade-image.animation';
import { saveIcon } from '@ui/animations/save-icon.animation';
import { transformOpt } from '@ui/animations/transform-option.animation';
import { CardComponent } from '@ui/card/card.component';
import { InfoChipComponent } from '@ui/chips/info-chip/info-chip.component';
import { PointsChipComponent } from '@ui/chips/points-chip/points-chip.component';
import { TimeChipComponent } from '@ui/chips/time-chip/time-chip.component';
import { FlagImgComponent } from '@ui/flag-img/flag-img.component';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { SaveIconComponent } from '../game-summary/ui/save-icon/save-icon';

@Component({
  standalone: true,
  selector: 'game-play-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeImage, transformOpt, saveIcon],
  imports: [
    CardComponent,
    CommonModule,
    ButtonModule,
    PointsChipComponent,
    TimeChipComponent,
    InfoChipComponent,
    FlagImgComponent,
    ProgressBarModule,
    TranslocoModule,
    ColorGradientPipe,
    CountryNamePipe,
    SaveIconComponent,
  ],
  templateUrl: './game-play-status.component.html',
})
export class GamePlayStatusComponent {
  public gameStore = inject(GameStore);
}
