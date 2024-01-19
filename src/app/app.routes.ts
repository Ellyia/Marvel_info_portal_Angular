import { Routes } from '@angular/router';

import { CharactersComponent } from '@characters/characters.component';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';
import { ComicsComponent } from '@comics/comics.component';
import { ComicsInfoComponent } from '@comics/pages/comics-info/comics-info.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'characters' },
  { path: 'characters', component: CharactersComponent },
  { path: 'comics',
    children: [
      {path: 'all', component: ComicsComponent},
      {path: ':id', component: ComicsInfoComponent},
    ],
  },
  { path: '**', component: PageNotFoundComponent }
];
