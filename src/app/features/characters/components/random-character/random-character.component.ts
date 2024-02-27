import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { CustomMarvelChar } from '@characters/models/characters.model';
import { IAppState } from 'app/store/state/app.state';
import { LoadRandomChar } from 'app/store/actions/characters.actions';
import { selectRandomCharacter } from 'app/store/selectors/characters.selectors';

@Component({
  selector: 'app-random-character',
  standalone: true,
  imports: [],
  templateUrl: './random-character.component.html',
  styleUrl: './random-character.component.scss'
})
export class RandomCharacterComponent implements OnInit, OnDestroy {

  randomChar$: Observable<CustomMarvelChar | null> = this.store.select(selectRandomCharacter);

  subs!: Subscription;

  randomChar: CustomMarvelChar | null = null;

  constructor(private store: Store<IAppState>){}

  ngOnInit(): void {
    this.subs = this.randomChar$.subscribe(randomCar => {
      this.randomChar = randomCar;
    })

    if (!this.randomChar) {
      this.updateChar();
    }
  }

  updateChar(): void {
    const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);

    this.store.dispatch(LoadRandomChar({ id }));
  }

  redirectToWiki(): void {
    window.open(this.randomChar?.wikiUrl, '_blank');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
