import { SettingsOptions } from '@core/interfaces/settings-options.interface';
import { SettingsService } from '@core/services/settings/settings.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslocoModule } from '@ngneat/transloco';
import { CardComponent } from '@ui/card/card.component';
import { MultiselectPickerComponent } from '@ui/multiselect-picker/multiselect-picker.component';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { LanguagePickerComponent } from './ui/language-picker.ts/language-picker.component';
import { OptionWrapperComponent } from './ui/settings-option/option-wrapper.component';

@Component({
  standalone: true,
  selector: 'settings',
  templateUrl: './settings.component.html',
  imports: [
    CardComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
    ButtonModule,
    TranslocoModule,
    MultiselectPickerComponent,
    OptionWrapperComponent,
    LanguagePickerComponent,
  ],
})
export class SettingsComponent implements OnInit, OnDestroy {
  constructor(
    private _settingsService: SettingsService,
    private _formBuilder: FormBuilder,
    private _location: Location
  ) {}
  public formGroup!: FormGroup;

  private _valueChangesSub!: Subscription;

  options: SettingsOptions = {
    difficulty: [],
    continents: [],
    sound: [],
  };

  ngOnInit(): void {
    this.options = this._settingsService.getSettingsOptions();
    const { continents, difficulty, sound } = this._settingsService.getSettings();

    this.formGroup = this._formBuilder.group({
      continents: [continents],
      difficulty: [difficulty],
      sound: [sound],
    });

    this._valueChangesSub = this.formGroup.valueChanges.subscribe(() => {
      this.saveSettings();
    });
  }

  public saveSettings(): void {
    const settings = {
      continents: this.formGroup.value.continents,
      difficulty: this.formGroup.value.difficulty,
      sound: this.formGroup.value.sound,
    };
    this._settingsService.save(settings);
  }

  public clickBack(): void {
    this._location.back();
  }

  public ngOnDestroy(): void {
    this._valueChangesSub.unsubscribe();
  }
}
