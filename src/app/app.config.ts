import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslocoModule, TRANSLOCO_CONFIG, translocoConfig, TRANSLOCO_LOADER } from '@ngneat/transloco';
import { TranslocoPersistLangModule, TRANSLOCO_PERSIST_LANG_STORAGE } from '@ngneat/transloco-persist-lang';
import { TranslocoHttpLoader } from './utils/transloco-root.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const translocoLoader = {
  provide: TRANSLOCO_LOADER,
  useClass: TranslocoHttpLoader,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(
      TranslocoModule,
      TranslocoPersistLangModule.forRoot({
        storage: {
          provide: TRANSLOCO_PERSIST_LANG_STORAGE,
          useValue: localStorage,
        },
      }),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'es', 'de'],  // Adjust to your available languages
        defaultLang: 'en',
        reRenderOnLangChange: true,
      }),
    },
    translocoLoader,
  ],
};
