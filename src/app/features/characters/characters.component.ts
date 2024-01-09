import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { RandomCharacterComponent } from './components/random-character/random-character.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharactersMarvelService } from './services/marvel.service';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { MarvelChar } from './models/characters.model';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [ CommonModule, RandomCharacterComponent, CharacterCardComponent, CharacterInfoComponent ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnDestroy {
  list$!: Observable<MarvelChar[]>;
  subs!: Subscription;

  character$: MarvelChar | null = null;

  constructor(private charactersService: CharactersMarvelService){
    this.list$ = this.charactersService.getCharacters();
  }

  // ngOnInit(): void {
  //   this.list$ = this.marvelService.getCharacters();
  // }

  showCharacter(id: number): void {
    this.subs = this.charactersService.getCharacter(id).subscribe(resp => {
      this.character$ = resp;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
