import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FlagSrcPipe } from '@pipes/flag-src.pipe';

@Component({
  selector: 'flag-img',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './flag-img.component.html',
  imports: [FlagSrcPipe],
})
export class FlagImgComponent {
  @Input() flag!: string;
  @Input() class = 'w-7rem';

  @Output() imgLoad: EventEmitter<void> = new EventEmitter();

  onImageLoad() {
    this.imgLoad.emit();
  }
}
