import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, mergeMap, tap, exhaustMap, catchError } from 'rxjs/operators';

import { CharsListLoadedFailure, ECharactersActions, LoadCharsListSuccess } from '../actions/characters.actions';
import { CharactersMarvelService } from '@characters/services/characters-marvel.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class CharactersEffects {
  LoadCharactersList$ = createEffect(() =>
    this.actions.pipe(
      ofType(ECharactersActions.LoadCharsList),
      switchMap(({start, count}) => this.charactersService.getCharacters(start, count)
        .pipe(
          map(chars => LoadCharsListSuccess({characters: chars})),
          tap(chars => console.log(chars)),
          catchError(((error: { message: string }) => {
           return of(CharsListLoadedFailure({ errMsg: error.message }))
          }))
        )
      )
    )
  );

  LoadCharacter$ = createEffect(() =>
    this.actions.pipe(
      ofType(ECharactersActions.LoadCharacter),
      switchMap(({id}) => this.charactersService.getCharacter(id)
      .pipe(
        map(char => ({ type: ECharactersActions.CharLoadedSuccess, payload: char })),
        // catchError(() => of(...()))
      ))
    )
  );

  constructor(
    private charactersService: CharactersMarvelService,
    private actions: Actions
  ) {}
}
