import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { CommonModule } from '@angular/common';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'multiselect-picker',
  standalone: true,
  imports: [CommonModule, MultiSelectModule, ReactiveFormsModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './multiselect-picker.component.html',
})
export class MultiselectPickerComponent implements OnInit {
  private _transloco = inject(TranslocoService);

  @Input() parentForm!: FormGroup;
  @Input() items: string[] = [];
  @Input() controlName!: string;
  @Input() translationScope = '';
  @Input() placeholder = '';

  public items$: Observable<{ label: string; value: string }[]> = of([]);

  ngOnInit(): void {
    this.items$ = this._transloco.selectTranslation().pipe(
      map(() =>
        this.items.map(item => ({
          label: this._transloco.translate(item, {}, this.translationScope),
          value: item,
        }))
      )
    );
  }
}
