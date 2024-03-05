import { createReducer, on } from '@ngrx/store';

import { initialComicsState } from '../state/comics.state';
import {
  LoadComic,
  LoadComicsList,
  LoadComicsListSuccess,
  LoadComicSuccess,
  ResetComicsList
} from '../actions/comics.actions';

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
  })),
  //
  on(LoadComic, (state) => ({
    ...state,
    comicDetails: null
  })),
  on(LoadComicSuccess, (state, {comic}) => ({
    ...state,
    comicDetails: comic
  }))
)
