import { Component, Input } from '@angular/core';

@Component({
  selector: 'summary-item',
  templateUrl: './summary-item.component.html',
  standalone: true,
})
export class SummaryItemComponent {
  @Input() icon!: string;
  @Input() color!: string;
  @Input() text!: string;

  get iconClasses(): string[] {
    return ['pi', `pi-${this.icon}`, `text-${this.color}-500`, 'mr-2'];
  }
}
