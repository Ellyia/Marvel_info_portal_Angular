import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MarvelChar } from '@characters/models/characters.model';
import { CharacterSearchStatusEnum } from '@characters/enums/characters.enum';
import { Store } from '@ngrx/store';
import { IAppState } from 'app/store/state/app.state';
import { selectCharactersName } from 'app/store/selectors/characters.selectors';
import { LoadCharName } from 'app/store/actions/characters.actions';

@UntilDestroy()
@Component({
  selector: 'find-character-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './find-character-form.component.html',
  styleUrl: './find-character-form.component.scss'
})
export class FindCharacterFormComponent {

  character$: Observable<MarvelChar | null> = this.store.select(selectCharactersName);
  characterSearchStatusEnum = CharacterSearchStatusEnum;

  character!: MarvelChar;
  searchStatus: CharacterSearchStatusEnum = CharacterSearchStatusEnum.ClearMsg;

  charFinderForm = new FormGroup({
    charName: new FormControl<string | null>('')
  });

  constructor(
    private router: Router,
    private store: Store<IAppState>
  ) {}

  onSearchCharacter(): void {
    if (this.charFinderForm.value.charName) {

      this.store.dispatch(LoadCharName({ name: this.charFinderForm.value.charName }));

      this.character$.pipe(untilDestroyed(this))
        .subscribe(resp => {
          if (resp) {
            this.character = resp;
            this.searchStatus = CharacterSearchStatusEnum.Found;
          } else if (resp === undefined) {
            this.searchStatus = CharacterSearchStatusEnum.NotFound;
          }
        });
    } else {
      this.searchStatus = CharacterSearchStatusEnum.EmptyInput;
    }
  }

  clearSearchMsg(): void {
    this.searchStatus = CharacterSearchStatusEnum.ClearMsg;
  }

  navigateToCharPage(obj: MarvelChar): void {
    this.router.navigate([`/characters/${obj.id}`]);
  }
}
