import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { HttpErrorResponse } from '@angular/common/http';

import {
  CharsListLoadedFailure,
  LoadCharDetailsSuccess,
  LoadCharInfoSuccess,
  LoadCharsListSuccess,
  LoadRandomCharSuccess
} from '../actions/characters.actions';
import { CharactersMarvelService } from '@characters/services/characters-marvel.service';
import { ECharactersActions } from '../enums/characters-actions.enum';

@Injectable()
export class CharactersEffects {
  LoadCharactersList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ECharactersActions.LoadCharsList),
      switchMap(({start, count}) => this.charactersService.getCharacters(count, start)
        .pipe(
          map(chars => LoadCharsListSuccess({characters: chars})),
          catchError((errorResp: HttpErrorResponse) => {
            return of(CharsListLoadedFailure({ errors: errorResp.error.message }));
          })
        )
      )
    )
  );

  LoadRandomCharacter$ = createEffect(() => // loadType, id, successType
    this.actions$.pipe(
      ofType(ECharactersActions.LoadRandomCharacter),
      switchMap(({id}) => this.charactersService.getCharacter(id)
        .pipe(
          map(char => LoadRandomCharSuccess({ randomChar: char})),
          // catchError((error: { message: string }) => {
          //  return of(CharsListLoadedFailure({ errors: error.message }));
          // })
        ))
    )
  );

  LoadInfoCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ECharactersActions.LoadCharacterInfo),
      switchMap(({id}) => this.charactersService.getCharacter(id)
        .pipe(
          map(char => LoadCharInfoSuccess({ character: char})),
          // catchError((error: { message: string }) => {
          //  return of(CharsListLoadedFailure({ errors: error.message }));
          // })
        ))
    )
  );

  LoadCharacterDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ECharactersActions.LoadCharacterDetails),
      switchMap(({id}) => this.charactersService.getCharacter(id)
        .pipe(
          map(char => LoadCharDetailsSuccess({ character: char})),
          // catchError((error: { message: string }) => {
          //  return of(CharsListLoadedFailure({ errors: error.message }));
          // })
        ))
    )
  );

  constructor(
    private charactersService: CharactersMarvelService,
    private actions$: Actions
  ) {}
}
