import { Routes } from '@angular/router';
import { CharactersComponent } from '@characters/characters.component';
import { PageNotFoundComponent } from '@coreComponents/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-characters' },
  { path: 'app-characters', component: CharactersComponent },
  { path: '**', component: PageNotFoundComponent }
];
