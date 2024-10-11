import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { TranslocoRootModule } from './utils/transloco-root.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, SharedModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'Flag Guessing';
}
