import { createReducer, on } from '@ngrx/store';

import { LoadCharSuccess, ResetCharsList, LoadCharsListSuccess, CharsListLoadedFailure, LoadCharsList } from '../actions/characters.actions';
import { initialCharactersState } from '../state/characters.state';

export const charactersReducer = createReducer(
  initialCharactersState,
  on(LoadCharsList, (state) => ({
    ...state,
    requestErrors: null
  })),
  on(LoadCharsListSuccess, (state, {characters}) => ({
    ...state,
    charactersList: [...state.charactersList, ...characters]
  })),
  on(CharsListLoadedFailure, (state, action) => ({
    ...state,
    requestErrors: action.errors,
    charactersList: []
  })),
  on(ResetCharsList, (state) => ({
    ...state,
    charactersList: [],
  })),
  // on(LoadCharacter, (state) => ({
  //   ...state
  // })),
  on(LoadCharSuccess, (state, action) => ({
    ...state,
    character: action.character
  }))
);
