import { CustomMarvelChar } from '@characters/models/characters.model';
import { BackendErrorsInterface } from '../actions/characters.actions';
export interface ICharactersState {
  charactersList: CustomMarvelChar[];
  character: CustomMarvelChar | null;
  requestErrors: BackendErrorsInterface | null;
  charsLimit: number;
  charsOffset: number;
}

export const initialCharactersState: ICharactersState = {
  charactersList: [],
  character: null,
  requestErrors: null,
  charsLimit: 9,
  charsOffset: 9
}
