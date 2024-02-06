import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { charactersReducer } from './characters.reducer';
// import { comicsReducer } from './comics.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  characters: charactersReducer,
  // comics: comicsReducer
};
