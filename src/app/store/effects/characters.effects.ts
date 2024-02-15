import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';

import { CharsListLoadedFailure, LoadCharsListSuccess } from '../actions/characters.actions';
import { CharactersMarvelService } from '@characters/services/characters-marvel.service';
import { of } from 'rxjs/internal/observable/of';
import { ECharactersActions } from '../actions/actionTypes';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CharactersEffects {
  LoadCharactersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ECharactersActions.LoadCharsList),
      switchMap(({start, count}) => this.charactersService.getCharacters(start, count)
        .pipe(
          map(chars => LoadCharsListSuccess({characters: chars})),
          tap(chars => console.log(chars)),
          catchError((errorResp: HttpErrorResponse) => {
            return of(CharsListLoadedFailure({ errors: errorResp.error.message }));
          })
        )
      )
    )
  );

  LoadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ECharactersActions.LoadCharacter),
      switchMap(({id}) => this.charactersService.getCharacter(id)
      .pipe(
        map(char => ({ type: ECharactersActions.CharLoadedSuccess, payload: char })),
        // catchError((error: { message: string }) => {
        //  return of(CharsListLoadedFailure({ errMsg: error.message }));
        // })
      ))
    )
  );

  constructor(
    private charactersService: CharactersMarvelService,
    private actions$: Actions
  ) {}
}
