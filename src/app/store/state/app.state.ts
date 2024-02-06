import { ICharactersState, initialCharactersState } from "./characters.state";

export interface IAppState {
  // router?: RouterReducerState;
  characters: ICharactersState;
}

export const initialAppState = {
  characters: initialCharactersState
};

export function getInitState(): IAppState {
  return initialAppState;
}
