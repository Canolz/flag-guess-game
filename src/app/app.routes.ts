import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'game',
    pathMatch: 'full',
    loadComponent: () => import('./features/game/game.component').then(m => m.GameComponent),
  },
  {
    path: 'settings',
    pathMatch: 'full',
    loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  { path: '**', redirectTo: '' },
];
