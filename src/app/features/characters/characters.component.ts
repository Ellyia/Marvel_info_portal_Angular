import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable} from 'rxjs';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { Store } from '@ngrx/store';

import { RandomCharacterComponent } from './components/random-character/random-character.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { CustomMarvelChar} from './models/characters.model';
import { FindCharacterFormComponent } from './components/find-character-form/find-character-form.component';
import { IAppState } from 'app/store/state/app.state';
import { LoadCharInfo, LoadCharsList, ResetCharsList } from 'app/store/actions/characters.actions';
import { selectCharactersList, selectInfoCharacter } from 'app/store/selectors/characters.selectors';

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
export class CharactersComponent {

  charactersList$: Observable<CustomMarvelChar[]> = this.store.select(selectCharactersList);
  character$: Observable<CustomMarvelChar | null> = this.store.select(selectInfoCharacter);

  charsLimit: number = 16; // 109 = err 409
  charsOffset: number = 0; // start

  constructor(private store: Store<IAppState>){
    this.store.dispatch(ResetCharsList());
    this.showCharacters();
  }

  showCharacters(): void {
    this.store.dispatch(LoadCharsList({
      count: this.charsLimit,
      start: this.charsOffset
    }));
  }

  showCharacterInfo(id: number): void {
    this.store.dispatch(LoadCharInfo({id}));
  }

  loadMore(): void {
    this.charsOffset += this.charsLimit;
    this.showCharacters();
  }
}
