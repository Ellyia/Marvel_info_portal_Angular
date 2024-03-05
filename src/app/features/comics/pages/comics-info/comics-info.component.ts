import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { BannerComponent } from '@core/components/banner/banner.component';
import { CustomMarvelComic } from '@comics/models/comics.model';
import { IAppState } from 'app/store/state/app.state';
import { selectComic } from 'app/store/selectors/comics.selectors';
import { LoadComic } from 'app/store/actions/comics.actions';

@UntilDestroy()
@Component({
  selector: 'app-comics-info',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './comics-info.component.html',
  styleUrl: './comics-info.component.scss'
})
export class ComicsInfoComponent implements OnInit {

  comics$: Observable<CustomMarvelComic | null> = this.store.select(selectComic);

  id!: number;
  comics!: CustomMarvelComic | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);

    this.store.dispatch(LoadComic({comicId: this.id}));

    this.comics$.pipe(untilDestroyed(this)).subscribe(comics => {
      this.comics = comics;
    })
  }

  toComics(): void {
    this.router.navigate(['comics']);
  }
}
