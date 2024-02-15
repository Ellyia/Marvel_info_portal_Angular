import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ICharactersState } from '../state/characters.state';

const selectCharacters = (state: IAppState) => state.characters;

export const selectCharactersList = createSelector(
  selectCharacters,
  (state: ICharactersState) => state.charactersList
);

export const selectRequestErrors = createSelector(
  selectCharacters,
  (state: ICharactersState) => state.requestErrors
);

export const selectCharacter = createSelector(
  selectCharacters,
  (state: ICharactersState) => state.character
);
