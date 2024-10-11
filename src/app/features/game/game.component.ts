import { Component, Input, OnInit, inject } from '@angular/core';
import { GameStore } from '@core/store/game.store';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SoundsService } from '../../core/services/sounds/sounds.service';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { AnswerHistoryComponent } from '@ui/answer-history/answer-history.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { SummaryItemComponent } from './game-summary/ui/summary-item/summary-item';
import { GameSummaryComponent } from './game-summary/game-summary.component';
import { GamePlayStatusComponent } from './game-play-status/game-play-status.component';

@Component({
  standalone: true,
  selector: 'game',
  templateUrl: './game.component.html',
  imports: [
    GameSummaryComponent,
    GamePlayStatusComponent,
    CommonModule,
    SummaryItemComponent,
    SpeedDialModule,
    TranslocoModule,
    AnswerHistoryComponent,
  ],
})
export class GameComponent implements OnInit {
  constructor(private _router: Router, private _sounds: SoundsService) {}
  @Input() isNewGame?: boolean;
  public gameStore = inject(GameStore);

  public items: MenuItem[] = [];

  ngOnInit(): void {
    this.setMenuItems();
    this._sounds.playStartLevelSound();
    if (this.isNewGame) {
      this.gameStore.reset();
      return;
    }
    this.gameStore.init();
  }

  public setMenuItems(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this._router.navigate(['/']),
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => this._router.navigate(['/settings']),
      },
      {
        label: 'Reset',
        icon: 'pi pi-refresh',
        command: () => this.resetGame(),
      },
    ];
  }

  public resetGame(): void {
    this._sounds.playStartLevelSound();
    this.gameStore.reset();
  }
}
