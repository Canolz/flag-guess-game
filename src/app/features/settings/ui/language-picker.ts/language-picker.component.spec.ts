import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguagePickerComponent } from './language-picker.component';
import { TranslocoService } from '@ngneat/transloco';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

describe('LanguagePickerComponent', () => {
  let component: LanguagePickerComponent;
  let fixture: ComponentFixture<LanguagePickerComponent>;
  let translocoServiceSpy: {
    getAvailableLangs: jasmine.Spy;
    getActiveLang: jasmine.Spy;
    setActiveLang: jasmine.Spy;
  };

  beforeEach(() => {
    translocoServiceSpy = jasmine.createSpyObj('TranslocoService', [
      'getAvailableLangs',
      'getActiveLang',
      'setActiveLang',
    ]);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [DropdownModule, FormsModule, LanguagePickerComponent],
      providers: [{ provide: TranslocoService, useValue: translocoServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagePickerComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should initialize languages and selectedLang', () => {
      const mockLanguages = ['en', 'es', 'fr'];
      translocoServiceSpy.getAvailableLangs.and.returnValue(mockLanguages);
      translocoServiceSpy.getActiveLang.and.returnValue('en');

      component.ngOnInit();

      expect(component.languages).toEqual(mockLanguages);
      expect(component.selectedLang).toBe('en');
    });
  });

  describe('changeLang', () => {
    it('should call setActiveLang with the selected language', () => {
      component.selectedLang = 'es';

      component.changeLang();

      expect(translocoServiceSpy.setActiveLang).toHaveBeenCalledWith('es');
    });
  });
});
