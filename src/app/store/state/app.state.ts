import { ICharactersState, initialCharactersState } from "./characters.state";
import { IComicsState, initialComicsState } from "./comics.state";

export interface IAppState {
  // router?: RouterReducerState;
  characters: ICharactersState;
  comics: IComicsState;
}

export const initialAppState = {
  characters: initialCharactersState,
  comics: initialComicsState,
}

export function getInitState(): IAppState {
  return initialAppState;
}
