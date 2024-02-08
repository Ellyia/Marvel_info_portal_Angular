import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MarvelChar } from '@characters/models/characters.model';
import { CharactersMarvelService } from '@characters/services/characters-marvel.service';
import { Subscription } from 'rxjs';
import { CharacterSearchStatusEnum } from '@characters/models/characters.enum';
@Component({
  selector: 'find-character-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './find-character-form.component.html',
  styleUrl: './find-character-form.component.scss'
})
export class FindCharacterFormComponent implements OnDestroy {
  characterSearchStatusEnum = CharacterSearchStatusEnum;

  subs!: Subscription;

  character!: MarvelChar;

  searchStatus: CharacterSearchStatusEnum = CharacterSearchStatusEnum.ClearMsg;

  charFinderForm = new FormGroup({
    charName: new FormControl<string | null>('')
  });

  constructor(
    private charactersService: CharactersMarvelService,
    private router: Router
  ) {}

  onSearchCharacter(): void {
    if (this.charFinderForm.value.charName) {

      this.subs = this.charactersService.getCharacterByName(this.charFinderForm.value.charName)
        .subscribe(resp => {
          this.character = resp;

          this.searchStatus = resp ? CharacterSearchStatusEnum.Found : CharacterSearchStatusEnum.NotFound;
        });
    } else {
      this.searchStatus = CharacterSearchStatusEnum.EmptyInput;
    }
  }

  clearSearchMsg() {
    this.searchStatus = CharacterSearchStatusEnum.ClearMsg;
  }

  navigateToCharPage(obj: MarvelChar) {
    this.router.navigate([`/characters/${obj.id}`]);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
