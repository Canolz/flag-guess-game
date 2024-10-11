import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameStore } from '@core/store/game.store';
import { TranslocoModule } from '@ngneat/transloco';
import { CardComponent } from '@ui/card/card.component';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'home',
  templateUrl: './home.component.html',
  imports: [CardComponent, CommonModule, ButtonModule, TranslocoModule, RouterLink],
})
export class HomeComponent {
  public gameStore = inject(GameStore);
}
