import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { RandomCharacterComponent } from './components/random-character/random-character.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { MarvelService } from './services/marvel.service';
import { CharacterInfoComponent } from './components/character-info/character-info.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [ CommonModule, RandomCharacterComponent, CharacterCardComponent, CharacterInfoComponent ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent {
  list$: Observable<any[]> = this.marvelService.getCharacters();

  character$!: Observable<any>;
  char: boolean = false;

  constructor(private marvelService: MarvelService){}

  showCharacter(id: any) {
    this.character$ = this.marvelService.getCharacter(id);
    this.char = true;
  }
}
