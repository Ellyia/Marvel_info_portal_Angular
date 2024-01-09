import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterInfoComponent {
  @Input() character!: any;
  name = '';
  url = '';
  info = '';
  comics: any = [];

  ngOnChanges() {
    this.name = this.character?.name;
    this.url = `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`;
    this.info = this.character.description;
    this.comics = this.character.comics.items;
  }
}
