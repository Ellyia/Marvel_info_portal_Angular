import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MarvelChar } from '@characters/models/characters.model';
import { CharactersMarvelService } from '@characters/services/characters-marvel.service';
import { Subscription } from 'rxjs';
import { CharacterSearchStatus } from '@characters/models/characters.enum';
@Component({
  selector: 'find-character-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './find-character-form.component.html',
  styleUrl: './find-character-form.component.scss'
})
export class FindCharacterFormComponent implements OnDestroy {
  static CharacterSearchStatus = CharacterSearchStatus;

  get charSearchStatus() {
    return CharacterSearchStatus;
  }

  subs!: Subscription;

  character!: MarvelChar;

  searchStatus: CharacterSearchStatus = CharacterSearchStatus.ClearMsg;

  charFinder = new FormGroup({
    charName: new FormControl<string | null>('')
  });

  constructor(
    private charactersService: CharactersMarvelService,
    private router: Router
  ) {}

  onSearchCharacter(): void {

    if (this.charFinder.value.charName) {

      this.subs = this.charactersService.getCharacterByName(this.charFinder.value.charName)
        .subscribe(resp => {
          this.character = resp;

          this.searchStatus = resp ? CharacterSearchStatus.Found : CharacterSearchStatus.NotFound;
        });
    } else {
      this.searchStatus = CharacterSearchStatus.EmptyInput;
    }
  }

  clearSearchMsg() {
    this.searchStatus = CharacterSearchStatus.ClearMsg;
  }

  navigateToCharPage(obj: MarvelChar) {
    this.router.navigate([`/characters/${obj.id}`]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
