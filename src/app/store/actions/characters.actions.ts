import { createAction, props } from '@ngrx/store';

import { CustomMarvelChar } from '@characters/models/characters.model';
import { ECharactersActions } from './action-types.enum';

export interface GetCharactersRequestInterface {
  start: number
  count: number
}

export interface BackendErrorsInterface {
  message: string
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
  props<{ errors: BackendErrorsInterface}>()
);

export const ResetCharsList = createAction(
  ECharactersActions.ResetCharsList
);

export const LoadCharacter = createAction(
  ECharactersActions.LoadCharacter,
  props<{ id: number }>()
  // props<{ name: string }>()
)

export const LoadCharSuccess = createAction(
  ECharactersActions.CharLoadedSuccess,
  props<{ character: CustomMarvelChar }>()
);
