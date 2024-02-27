import { createAction, props } from '@ngrx/store';

import { CustomMarvelChar } from '@characters/models/characters.model';
import { ECharactersActions } from '../enums/characters-actions.enum';

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
);

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

// random

export const LoadRandomChar = createAction(
  ECharactersActions.LoadRandomCharacter,
  props<{ id: number }>()
  // props<{ name: string }>()
)

export const LoadRandomCharSuccess = createAction(
  ECharactersActions.RandomCharLoadedSuccess,
  props<{ randomChar: CustomMarvelChar }>()
);

export const LoadRandomCharFailure = createAction(
  ECharactersActions.RandomCharLoadedFailure,
  props<{ errors: BackendErrorsInterface}>()
);

export const ResetRandomChar = createAction(
  ECharactersActions.ResetRandomChar
);

// info

export const LoadCharInfo = createAction(
  ECharactersActions.LoadCharacterInfo,
  props<{ id: number }>()
)

export const LoadCharInfoSuccess = createAction(
  ECharactersActions.CharacterInfoLoadedSuccess,
  props<{ character: CustomMarvelChar }>()
);

export const LoadCharInfoFailure = createAction(
  ECharactersActions.CharacterInfoLoadedFailure,
  props<{ errors: BackendErrorsInterface}>()
);

export const ResetCharInfo = createAction(
  ECharactersActions.ResetCharacterInfo
);

// details

export const LoadCharDetails = createAction(
  ECharactersActions.LoadCharacterDetails,
  props<{ id: number }>()
);

export const LoadCharDetailsSuccess = createAction(
  ECharactersActions.LoadCharacterDetailsSuccess,
  props<{ character: CustomMarvelChar }>()
);
