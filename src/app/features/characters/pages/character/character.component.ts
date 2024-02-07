import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomMarvelChar } from '@characters/models/characters.model';
import { CharactersMarvelService } from '@characters/services/characters-marvel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterDetailsComponent {

  character!: CustomMarvelChar;
  id!: number;
  subs!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersMarvelService) {}

  ngOnInit() {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);

    this.subs = this.charactersService.getCharacter(this.id)
      .subscribe(res => {
        this.character = res;
      });
  }
}
