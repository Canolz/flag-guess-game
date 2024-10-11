import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'option-wrapper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './option-wrapper.component.html',
})
export class OptionWrapperComponent {
  @Input() label = '';
}
