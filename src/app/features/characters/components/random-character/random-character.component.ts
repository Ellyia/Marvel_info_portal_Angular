// import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CharactersMarvelService } from '@characters/services/marvel.service';
import { CustomMarvelChar } from '@characters/models/characters.model';

@Component({
  selector: 'app-random-character',
  standalone: true,
  imports: [],
  templateUrl: './random-character.component.html',
  styleUrl: './random-character.component.scss'
})
export class RandomCharacterComponent implements OnInit, OnDestroy {
  id!: number;
  subs!: Subscription;

  char: CustomMarvelChar | null = null;

  constructor(private charactersService: CharactersMarvelService){}

  ngOnInit(): void {
    this.updateChar();
  }

  updateChar(): void {
    this.id = Math.floor(Math.random() * (1011400-1011000) + 1011000);

    this.subs = this.charactersService.getCharacter(this.id)
      .subscribe((randomCaracter) => {
        this.char = randomCaracter;
      }
    )
  }

  redirectToWiki(): void {
    window.open(this.char?.wikiUrl, '_blank');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
