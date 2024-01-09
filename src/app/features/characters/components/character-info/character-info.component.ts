import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Comic, MarvelChar } from '@characters/models/characters.model';

@Component({
  selector: 'app-character-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterInfoComponent implements OnChanges {
  @Input() character!: MarvelChar | null;

  // MarvelChar = {
  //   name: '',
    url!: string;
  //   info: '',
  //   comics: <Comic>[];
  // }

  ngOnChanges(): void {
    if(this.character) {
      // this.MarvelChar.name = this.character?.name;
      this.url = `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`;
      // this.MarvelChar.info = this.character.description;
      // this.MarvelChar.comics = this.character.comics.items;
    }

  }
}
