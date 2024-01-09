import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarvelChar } from '@characters/models/characters.model';
import { Subscription } from 'rxjs';
import { CharactersMarvelService } from '@characters/services/marvel.service';

@Component({
  selector: 'app-random-character',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random-character.component.html',
  styleUrl: './random-character.component.scss'
})
export class RandomCharacterComponent implements OnInit, OnDestroy {
  id!: number;
  subs!: Subscription;

  thumbnail!: string;
  homepage!: string;
  wiki!: string;

  char: MarvelChar | null = null;

  constructor(private charactersService: CharactersMarvelService){}

  ngOnInit(): void {
    this.updateChar();
  }

  updateChar(): void {
    this.id = Math.floor(Math.random() * (1011400-1011000) + 1011000);

    this.subs = this.charactersService.getCharacter(this.id).subscribe(
      (randomCaracter) => {
        this.char = randomCaracter;

        this.thumbnail = `${randomCaracter.thumbnail.path}.${randomCaracter.thumbnail.extension}`;
        this.homepage = randomCaracter.urls[0].url;
        this.wiki = randomCaracter.urls[1].url;
      }
    )
  }

  redirectToWiki(): void {
    window.open(this.wiki, '_blank');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
