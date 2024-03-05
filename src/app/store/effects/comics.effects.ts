import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  LoadComicsListSuccess,
  LoadComicsListFailure,
  LoadComicSuccess
} from '../actions/comics.actions';
import { ComicsMarvelService } from 'app/features/comics/services/comics-marvel.service';
import { EComicsActions } from '../enums/comics-actions.enum';

@Injectable()
export class ComicsEffects {

  LoadComicsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EComicsActions.LoadComicsList),
      switchMap(({start, count}) => this.comicsService.getComics(count, start)
        .pipe(
          map(cs => LoadComicsListSuccess({comics: cs})),
          catchError(err => {
            return of(LoadComicsListFailure({ errors: err.error.message }))
          })
        )
      )
  ));

  LoadComic$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EComicsActions.LoadComic),
      switchMap(({comicId}) => this.comicsService.getComic(comicId)
        .pipe(
          map(c => LoadComicSuccess({comic: c}))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private comicsService: ComicsMarvelService
  ) {}
}
