import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { EComicsActions } from '../actions/action-types.enum';
import { LoadComicsListSuccess, LoadComicsListFailure } from '../actions/comics.actions';
import { ComicsMarvelService } from 'app/features/comics/services/comics-marvel.service';


@Injectable()
export class ComicsEffects {
  LoadComicsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EComicsActions.LoadComicsList),
      switchMap(({start, count}) => this.comicsService.getComics(count, start)
        .pipe(
          map(cs => LoadComicsListSuccess({comics: cs})),
          tap(cs => console.log(cs)),
          catchError(err => {
            return of(LoadComicsListFailure({ errors: err.error.message }))
          })
        )
      )
  ))

  constructor(
    private actions$: Actions,
    private comicsService: ComicsMarvelService
  ) {}
}
