import { createReducer, on } from '@ngrx/store';

import {
  ResetCharsList,
  LoadCharDetails,
  LoadCharsListSuccess,
  CharsListLoadedFailure,
  LoadCharsList,
  LoadRandomChar,
  LoadRandomCharSuccess,
  LoadCharInfo,
  LoadCharInfoSuccess,
  LoadCharDetailsSuccess
} from '../actions/characters.actions';
import { initialCharactersState } from '../state/characters.state';

export const charactersReducer = createReducer(
  initialCharactersState,
  on(LoadCharsList, (state) => ({
    ...state,
    requestErrors: null
  })),
  on(LoadCharsListSuccess, (state, { characters }) => ({
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
  // random
  on(LoadRandomChar, (state) => ({
    ...state
  })),
  on(LoadRandomCharSuccess, (state, {randomChar}) => ({
    ...state,
    randomCharacter: randomChar
  })),
  // info
  on(LoadCharInfo, (state) => ({
    ...state
  })),
  on(LoadCharInfoSuccess, (state, {character}) => ({
    ...state,
    infoCharacter: character
  })),
  // details
  on(LoadCharDetails, (state) => ({
    ...state
  })),
  on(LoadCharDetailsSuccess, (state, {character}) => ({
    ...state,
    characterDetails: character
  })),
);
