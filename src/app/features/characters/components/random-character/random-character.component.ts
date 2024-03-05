import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { CustomMarvelChar } from '@characters/models/characters.model';
import { IAppState } from 'app/store/state/app.state';
import { BackendErrorsInterface, LoadRandomChar } from 'app/store/actions/characters.actions';
import { selectRandomCharacter, selectRequestErrors } from 'app/store/selectors/characters.selectors';

@Component({
  selector: 'app-random-character',
  standalone: true,
  imports: [],
  templateUrl: './random-character.component.html',
  styleUrl: './random-character.component.scss'
})
export class RandomCharacterComponent implements OnInit, OnDestroy {

  randomChar$: Observable<CustomMarvelChar | null> = this.store.select(selectRandomCharacter);
  errors$: Observable<BackendErrorsInterface | null> = this.store.select(selectRequestErrors);

  unsubs$: Subject<void> = new Subject;

  randomChar: CustomMarvelChar | null = null;

  constructor(private store: Store<IAppState>){}

  ngOnInit(): void {

    this.randomChar$
      .pipe(
        takeUntil(this.unsubs$)
      )
      .subscribe(randomCar => {
        this.randomChar = randomCar;
      })

    if (!this.randomChar) {
      this.updateChar();
    }

    this.errors$.pipe(takeUntil(this.unsubs$)).subscribe(err => {
      if (err?.error.code === 404) {
        this.updateChar();
      }
    });
  }

  updateChar(): void {
    const id = Math.floor(Math.random() * (1011400-1011000) + 1011000);

    this.store.dispatch(LoadRandomChar({ id }));
  }

  redirectToWiki(): void {
    window.open(this.randomChar?.wikiUrl, '_blank');
  }

  ngOnDestroy(): void {
    this.unsubs$.next();
    this.unsubs$.complete();
  }
}
