import { createAction, props } from '@ngrx/store';

import { CustomMarvelChar } from '@characters/models/characters.model';

export enum ECharactersActions {
  LoadCharsList = '[CharactersList] Load Characters',
  CharsListLoadedSuccess = '[CharactersList] Load Characters Success',
  CharsListLoadedFailure = '[CharactersList] Load Characters Failure',
  ResetCharsList = '[CharactersList] Reset Characters',
  LoadCharacter = '[Characters] Load Character',
  CharLoadedSuccess = '[Characters] Load Character Success',
  CharLoadedFailure = '[Characters] Load Character Failure',
}

export const LoadCharsList = createAction(
  ECharactersActions.LoadCharsList,
  props<{ start: number; count: number }>()
)

export const LoadCharsListSuccess = createAction(
  ECharactersActions.CharsListLoadedSuccess,
  props<{ characters: CustomMarvelChar[] }>()
);

export const CharsListLoadedFailure = createAction(
  ECharactersActions.CharsListLoadedFailure,
  props<{ errMsg: string}>()
);

export const LoadCharacter = createAction(
  ECharactersActions.LoadCharacter,
  props<{ id: number }>()
  // props<{ name: string }>()
)

export const GetCharSuccess = createAction(
  ECharactersActions.CharLoadedSuccess,
  props<{ character: CustomMarvelChar }>()
);

export const ResetCharsList = createAction(
  ECharactersActions.ResetCharsList
);
