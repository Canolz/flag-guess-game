import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CardComponent } from '@ui/card/card.component';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'about',
  templateUrl: './about.component.html',
  imports: [CardComponent, ButtonModule, TranslocoModule, RouterLink],
})
export class AboutComponent {}
