import { Component, OnDestroy } from '@angular/core';

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
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'characters',
  standalone: true,
  imports: [
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

  subs!: Subscription;

  charsLimit: number = 16; // 109 = err 409

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
    this.store.dispatch(LoadCharsList({
      count: this.charsLimit,
      start: this.charsOffset
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
    this.subs?.unsubscribe();
  }
}
