import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { Store } from '@ngrx/store';

import { RandomCharacterComponent } from './components/random-character/random-character.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharactersMarvelService } from './services/characters-marvel.service';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { CustomMarvelChar} from './models/characters.model';
import { FindCharacterFormComponent } from './components/find-character-form/find-character-form.component';
import { IAppState } from 'app/store/state/app.state';
import { LoadCharsList, ResetCharsList } from 'app/store/actions/characters.actions';
import { selectCharactersList } from 'app/store/selectors/characters.selectors';

@Component({
  selector: 'characters',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
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
  charactersList$: Observable<CustomMarvelChar[]> = this.store.select(selectCharactersList);
  // list: CustomMarvelChar[] | [] = [];
  subs!: Subscription;

  charsLimit: number = 9;
  charsOffset: number = 0; // start

  character: CustomMarvelChar | null = null;

  constructor(
    private charactersService: CharactersMarvelService,
    private store: Store<IAppState>
  ){
    this.store.dispatch(ResetCharsList());
    this.showCharacters();
  }

  showCharacters(): void {
    // this.subs = this.charactersService.getCharacters(this.charsLimit, this.charsOffset)
    //   .subscribe(
    //     resp => {
    //       this.list$ = [...this.list$, ...resp];
    //     }
    //   );
    this.store.dispatch(LoadCharsList({
      start: this.charsOffset,
      count: this.charsLimit
    }));
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
    // this.subs.unsubscribe();
  }
}
