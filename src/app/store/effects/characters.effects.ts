import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap, map, retry, catchError, shareReplay, expand, take } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { HttpErrorResponse } from '@angular/common/http';

import {
  CharsListLoadedFailure,
  LoadCharDetailsSuccess,
  LoadCharInfoSuccess,
  LoadCharNameSuccess,
  LoadCharsListSuccess,
  LoadRandomCharFailure,
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
      switchMap(({ id }) => this.charactersService.getCharacter(id)
        .pipe(
          // retry({delay: (error, retryCount) => {
          //   if (retryCount < 3) {
          //   console.log(error);
          //   return this.charactersService.getCharacter(generateRandomId());
          // } else {
          //   throw Error(error)
          // }}}),
          // expand((char, index) => {
          //   console.log(index, char)
          //   if (!char && index < 3) {
          //     const newId = generateRandomId();
          //     console.log(`Retrying with new id: ${newId}`);
          //     return this.charactersService.getCharacter(newId);
          //   } else if (char) {
          //     return of(char)
          //   } else {
          //       throw new Error('Retry limit reached');
          //   }
          // }),
          // retry(3),
          // take(1),
          map(char => LoadRandomCharSuccess({ randomChar: char})),
          catchError((error) => {
            console.log('err:', error);
            return of(LoadRandomCharFailure({ errors: error }));
          }),
          // shareReplay()
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

  LoadCharacterByName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ECharactersActions.LoadCharacterName),
      switchMap(({name}) => this.charactersService.getCharacterByName(name)
        .pipe(
          map(char => LoadCharNameSuccess({charByName: char}))
        ))
    )
  )

  constructor(
    private charactersService: CharactersMarvelService,
    private actions$: Actions
  ) {}
}

// function generateRandomId(): number {
//   const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);
//   console.log('expand', id);
//   return id;
// }
