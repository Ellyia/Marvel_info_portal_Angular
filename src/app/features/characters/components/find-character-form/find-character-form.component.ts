import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomMarvelChar } from '@characters/models/characters.model';
import { CharactersMarvelService } from '@characters/services/marvel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'find-character-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './find-character-form.component.html',
  styleUrl: './find-character-form.component.scss'
})
export class FindCharacterFormComponent implements OnDestroy {
  subs!: Subscription;
  character$: CustomMarvelChar | null = null;

  charFinder = new FormGroup({
    charName: new FormControl<string | null>('')
  });

  constructor(private charactersService: CharactersMarvelService) {}

  searchCharacter(): void {
    if (this.charFinder.value.charName) {

      this.subs = this.charactersService.getCharacterByName(this.charFinder.value.charName)
        .subscribe(
          resp => {
            this.character$ = resp;
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
