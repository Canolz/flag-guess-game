import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'correct-answer-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './correct-answer-chip.component.html',
  imports: [CommonModule, ChipModule, TranslocoModule],
})
export class CorrectAnswerChipComponent {
  @Input() correct = false;
}
