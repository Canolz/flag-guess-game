import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SecondsToTimePipe } from '@pipes/secods-to-time.pipe';

@Component({
  standalone: true,
  selector: 'time-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './time-chip.component.html',
  styleUrl: './time-chip.component.scss',
  imports: [SecondsToTimePipe],
})
export class TimeChipComponent {
  @Input() seconds!: number;
}
