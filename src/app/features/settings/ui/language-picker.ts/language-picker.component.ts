import { Component, OnInit } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'language-picker',
  standalone: true,
  imports: [CommonModule, DropdownModule, TranslocoModule, FormsModule],
  templateUrl: './language-picker.component.html',
})
export class LanguagePickerComponent implements OnInit {
  constructor(private _transloco: TranslocoService) {}

  languages: string[] = [];
  selectedLang = '';

  ngOnInit(): void {
    this.languages = this._transloco.getAvailableLangs() as string[];
    this.selectedLang = this._transloco.getActiveLang();
  }

  public changeLang(): void {
    this._transloco.setActiveLang(this.selectedLang);
  }
}
