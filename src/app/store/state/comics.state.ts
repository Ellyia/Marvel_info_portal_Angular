import { CustomMarvelComic } from "app/features/comics/models/comics.model";
import { BackendErrorsInterface } from "../actions/characters.actions";

export interface IComicsState {
  comicsList: CustomMarvelComic[];
  comic: CustomMarvelComic | null;
  requestErrors: BackendErrorsInterface | null;
  comicsLimit: number;
  comicsOffset: number;
  amountOfReceivedComics: number;
}

export const initialComicsState: IComicsState = {
  comicsList: [],
  comic: null,
  requestErrors: null,
  comicsLimit: 16,
  comicsOffset: 0,
  amountOfReceivedComics: 0
}
