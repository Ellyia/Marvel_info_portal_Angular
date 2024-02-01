import { Routes } from '@angular/router';
import { CharactersComponent } from '@characters/characters.component';
import { CharacterComponent } from '@characters/pages/character/character.component';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'characters' },
  { path: 'characters',
        children: [
          { path: 'all', component: CharactersComponent },
          { path: ':id', component: CharacterComponent }
        ],
  },
  { path: '**', component: PageNotFoundComponent }
];
