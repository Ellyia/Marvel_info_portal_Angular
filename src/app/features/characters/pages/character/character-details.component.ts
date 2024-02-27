import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { CustomMarvelChar } from '@characters/models/characters.model';
import { BannerComponent } from '@core/components/banner/banner.component';
import { LoadCharInfo } from 'app/store/actions/characters.actions';
import { selectCharacterDetails } from 'app/store/selectors/characters.selectors';
import { IAppState } from 'app/store/state/app.state';

@Component({
  selector: 'character-details',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {

  character$: Observable<CustomMarvelChar | null> = this.store.select(selectCharacterDetails);

  character!: CustomMarvelChar | null;
  id!: number;
  subs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);

    this.store.dispatch(LoadCharInfo({ id: this.id}));

    this.subs = this.character$.subscribe(char => {
      this.character = char;
    })
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
