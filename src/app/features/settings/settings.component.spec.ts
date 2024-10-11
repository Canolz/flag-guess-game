import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { SettingsService } from '@core/services/settings/settings.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { SettingsOptions } from '@core/interfaces/settings-options.interface';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let settingsServiceSpy: {
    getSettingsOptions: jasmine.Spy;
    getSettings: jasmine.Spy;
    save: jasmine.Spy;
  };
  let locationSpy: {
    back: jasmine.Spy;
  };

  beforeEach(() => {
    settingsServiceSpy = {
      getSettingsOptions: jasmine.createSpy('getSettingsOptions'),
      getSettings: jasmine.createSpy('getSettings').and.returnValue({
        continents: ['europe'],
        difficulty: 'easy',
        sound: 'on',
      }),
      save: jasmine.createSpy('save'),
    };

    locationSpy = {
      back: jasmine.createSpy('back'),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SettingsComponent],
      providers: [
        { provide: SettingsService, useValue: settingsServiceSpy },
        { provide: Location, useValue: locationSpy },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should initialize formGroup and options', () => {
      const mockOptions: SettingsOptions = {
        continents: ['europe'],
        difficulty: ['easy'],
        sound: ['on'],
      };
      settingsServiceSpy.getSettingsOptions.and.returnValue(mockOptions);

      component.ngOnInit();

      expect(component.options).toEqual(mockOptions);
      expect(component.formGroup.value).toEqual({
        continents: ['europe'],
        difficulty: 'easy',
        sound: 'on',
      });
      expect(settingsServiceSpy.getSettingsOptions).toHaveBeenCalled();
      expect(settingsServiceSpy.getSettings).toHaveBeenCalled();
    });

    it('should subscribe to formGroup value changes', () => {
      spyOn(component, 'saveSettings');
      component.ngOnInit();
      component.formGroup.patchValue({ continents: ['asia'] });

      expect(component.saveSettings).toHaveBeenCalled();
    });
  });

  describe('saveSettings', () => {
    it('should call settingsService.save with form values', () => {
      component.ngOnInit();
      component.formGroup.patchValue({
        continents: ['africa'],
        difficulty: 'medium',
        sound: 'off',
      });

      component.saveSettings();

      expect(settingsServiceSpy.save).toHaveBeenCalledWith({
        continents: ['africa'],
        difficulty: 'medium',
        sound: 'off',
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from _valueChangesSub', () => {
      component.ngOnInit(); // to initialize the subscription
      const unsubscribeSpy = spyOn(component['_valueChangesSub'], 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });
});
