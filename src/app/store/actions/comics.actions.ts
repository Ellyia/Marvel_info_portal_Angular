import { createAction, props } from '@ngrx/store';

import { CustomMarvelComic } from 'app/features/comics/models/comics.model';
import { EComicsActions } from '../enums/comics-actions.enum';
import { BackendErrorsInterface } from './characters.actions';

export const LoadComicsList = createAction(
  EComicsActions.LoadComicsList,
  props<{ start: number; count: number }>()
)

export const LoadComicsListSuccess = createAction(
  EComicsActions.ComicsListLoadedSuccess,
  props<{ comics: CustomMarvelComic[] } >()
)

export const LoadComicsListFailure = createAction(
  EComicsActions.ComicsListLoadedFailure,
  props<{ errors: BackendErrorsInterface }>()
)

export const ResetComicsList = createAction(
  EComicsActions.ResetComicsList
)
