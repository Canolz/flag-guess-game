import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'info-chip',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './info-chip.component.html',
  styleUrl: './info-chip.component.scss',
})
export class InfoChipComponent {
  @Input() label: number | string = '';
  @Input() icon = 'pi pi-star';
}
