import { createReducer, on } from '@ngrx/store';

import { initialComicsState } from '../state/comics.state';
import { LoadComicsList, LoadComicsListSuccess, LoadComicsListFailure, ResetComicsList } from '../actions/comics.actions';

export const comicsReducer = createReducer(
  initialComicsState,
  on(LoadComicsList, (state) => ({
    ...state,
    requestErrors: null,
    amountOfReceivedComics: 0
  })),
  on(LoadComicsListSuccess, (state, { comics }) => ({
    ...state,
    comicsList: [...state.comicsList, ...comics],
    amountOfReceivedComics: comics.length
  })),
  on(ResetComicsList, (state) => ({
    ...state,
    comicsList: []
  }))
)
