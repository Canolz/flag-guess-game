import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { saveIcon } from '@ui/animations/save-icon.animation';

@Component({
  selector: 'save-icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [saveIcon],
  templateUrl: './save-icon.component.html',
  styleUrl: './save-icon.component.scss',
})
export class SaveIconComponent {
  @Input() points = 0;
}
