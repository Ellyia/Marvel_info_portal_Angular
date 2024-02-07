import { createReducer, on } from '@ngrx/store';

import { GetCharSuccess, ResetCharsList, LoadCharsListSuccess } from '../actions/characters.actions';
import { initialCharactersState } from '../state/characters.state';

export const charactersReducer = createReducer(
  initialCharactersState,
  // on(LoadCharsList, (state) => ({
  //   ...state
  // })),
  on(LoadCharsListSuccess, (state, {characters}) => ({
    ...state,
    charactersList: [...state.charactersList, ...characters]
  })),
  on(GetCharSuccess, (state, action) => ({
    ...state,
    character: action.character
  })),
  on(ResetCharsList, (state) => ({
      ...state,
      charactersList: []
    })
  )
);
