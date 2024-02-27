import { CustomMarvelChar } from '@characters/models/characters.model';
import { BackendErrorsInterface } from '../actions/characters.actions';

export interface ICharactersState {
  charactersList: CustomMarvelChar[];
  randomCharacter: CustomMarvelChar | null;
  infoCharacter: CustomMarvelChar | null;
  characterDetails: CustomMarvelChar | null;
  requestErrors: BackendErrorsInterface | null;
}

export const initialCharactersState: ICharactersState = {
  charactersList: [],
  randomCharacter: null,
  infoCharacter: null,
  requestErrors: null,
  characterDetails: null,
}
