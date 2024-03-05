
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';

import { BannerComponent } from '@core/components/banner/banner.component';
import { amountOfReceivedComics, selectComicsList } from 'app/store/selectors/comics.selectors';
import { LoadComicsList, ResetComicsList } from 'app/store/actions/comics.actions';
import { IAppState } from 'app/store/state/app.state';
import { CustomMarvelComic } from './models/comics.model';
import { ComicCardComponent } from './components/comic-card/comic-card.component';

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [
    ComicCardComponent,
    BannerComponent,
    AsyncPipe
  ],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.scss'
})
export class ComicsComponent implements OnDestroy {

  comicsList$: Observable<CustomMarvelComic[]> = this.store.select(selectComicsList);
  amountOfReceivedComics$: Observable<number> = this.store.select(amountOfReceivedComics);

  unsubscribe$: Subject<void> = new Subject();

  amountOfReceivedComics: number = 0;

  comicsLimit: number = 15;
  comicsOffset: number = 0;

  constructor(
    private router: Router,
    private store: Store<IAppState>
  ) {
    this.store.dispatch(ResetComicsList());
    this.showComics();
  }

  showComics(): void {
    this.store.dispatch(LoadComicsList({
      start: this.comicsOffset,
      count: this.comicsLimit
    }))

    this.amountOfReceivedComics$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(res => {
        this.amountOfReceivedComics = res;
      })
  }

  loadMore(): void {
    this.comicsOffset += this.comicsLimit;
    this.showComics();
  }

  showComic(id: number): void {
    this.router.navigate([`comics/${id}`]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
