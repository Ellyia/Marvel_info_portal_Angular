import { CustomMarvelChar } from '@characters/models/characters.model';
export interface ICharactersState {
  charactersList: CustomMarvelChar[];
  character: CustomMarvelChar | null;
  charsLimit: number;
  charsOffset: number;
}

export const initialCharactersState: ICharactersState = {
  charactersList: [],
  character: null,
  charsLimit: 9,
  charsOffset: 9
}
