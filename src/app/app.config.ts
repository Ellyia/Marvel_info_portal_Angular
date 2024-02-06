import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { httpInterceptor } from '@core/interceptors/http.interceptor';
import { appReducers } from './store/reducers/app.reducers';
import { CharactersEffects } from './store/effects/characters.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), // importProvidersFrom(HttpClientModule)
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideStore( appReducers ), // common reducer - // appReducers - // alternative to `StoreModule.forRoot`
    // provideRouterStore(), // alternative to `StoreRouterConnectingModule.forRoot` - // { stateKey: 'router' }
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }), // { maxAge: 25, logOnly: !isDevMode() } - // alternative to `StoreDevtoolsModule.instrument`
    provideEffects([ CharactersEffects ]), // [CoursesEffects, AuthEffects] - // alternative to `EffectsModule.forRoot` // RouterEffects - what is this
  ]
};
