import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pointChipAnimations } from '@ui/animations/points-chip.animations';

@Component({
  standalone: true,
  selector: 'points-chip',
  templateUrl: './points-chip.component.html',
  styleUrl: './points-chip.component.scss',
  animations: [pointChipAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class PointsChipComponent {
  @Input() points = 0;
  @Input() icon = 'pi pi-star';
}
