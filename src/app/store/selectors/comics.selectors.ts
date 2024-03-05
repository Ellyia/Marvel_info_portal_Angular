import { createSelector } from "@ngrx/store";

import { IAppState } from "../state/app.state";
import { IComicsState } from "../state/comics.state";

const selectComics = (state: IAppState) => state.comics;

export const selectComicsList = createSelector(
  selectComics,
  (state: IComicsState) => state.comicsList
);

export const amountOfReceivedComics = createSelector(
  selectComics,
  (state: IComicsState) => state.amountOfReceivedComics
)

export const selectComic = createSelector(
  selectComics,
  (state: IComicsState) => state.comicDetails
);
