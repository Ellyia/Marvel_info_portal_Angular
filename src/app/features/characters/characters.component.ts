import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { RandomCharacterComponent } from './components/random-character/random-character.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharactersMarvelService } from './services/characters-marvel.service';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { CustomMarvelChar} from './models/characters.model';
import { FindCharacterFormComponent } from './components/find-character-form/find-character-form.component';

@Component({
  selector: 'characters',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RandomCharacterComponent,
    CharacterCardComponent,
    CharacterInfoComponent,
    InfiniteScrollModule,
    FindCharacterFormComponent
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnDestroy {
  list$: CustomMarvelChar[] = [];
  subs!: Subscription;

  charsLimit: number = 9;
  charsOffset: number = 9; // start

  character: CustomMarvelChar | null = null;

  constructor(private charactersService: CharactersMarvelService){
    this.showCharacters();
  }

  showCharacters(): void {
    this.subs = this.charactersService.getCharacters(this.charsLimit, this.charsOffset)
      .subscribe(
        resp => {
          this.list$ = [...this.list$, ...resp];
        }
      );
  }

  showCharacter(id: number): void {
    this.subs = this.charactersService.getCharacter(id)
      .subscribe(resp => {
        this.character = resp;
      });
  }

  loadMore(): void {
    this.charsOffset += this.charsLimit;
    this.showCharacters();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
