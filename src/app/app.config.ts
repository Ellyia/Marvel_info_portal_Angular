import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { httpInterceptor } from '@core/interceptor/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule), provideHttpClient( // importProvidersFrom(HttpClientModule)
    withInterceptors([httpInterceptor])
  )]
};
