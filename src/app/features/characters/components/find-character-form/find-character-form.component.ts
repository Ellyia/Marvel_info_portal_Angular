import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MarvelChar } from '@characters/models/characters.model';
import { CharactersMarvelService } from '@characters/services/characters-marvel.service';
import { Subscription } from 'rxjs';

enum EMSG {
  clear = '',
  emptyInput = 'empty input',
  notFound = 'not found',
  found = 'found'
}

@Component({
  selector: 'find-character-form',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './find-character-form.component.html',
  styleUrl: './find-character-form.component.scss'
})
export class FindCharacterFormComponent implements OnDestroy {
  static EMSG = EMSG;

  get enumMessages() {
    return EMSG;
  }

  subs!: Subscription;

  character!: MarvelChar;

  msg: string = EMSG.clear;

  charFinder = new FormGroup({
    charName: new FormControl<string | null>('')
  });

  constructor(
    private charactersService: CharactersMarvelService,
    private router: Router
  ) {}

  searchCharacter(): void {

    if (this.charFinder.value.charName) {

      this.subs = this.charactersService.getCharacterByName(this.charFinder.value.charName)
        .subscribe(
          resp => {
            this.character = resp;

            this.msg = resp ? EMSG.found : EMSG.notFound;
            // if(!resp) {
            //   this.msg = EMSG.notFound;
            // } else {
            //   this.msg = EMSG.found;
            // }
          }
        );
    } else {
      this.msg = EMSG.emptyInput;
    }
  }

  clearMsg() {
    this.msg = EMSG.clear;
  }

  navigateToCharPage(obj: MarvelChar) {
    this.router.navigate(['/app-character'], { queryParams: {
      name: obj.name,
      description: obj.description,
      thumbnailUrl: `${obj.thumbnail.path}.${obj.thumbnail.extension}`
    } });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
