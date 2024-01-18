import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomMarvelChar } from '@characters/models/characters.model';

@Component({
  selector: 'app-character-info',
  standalone: true,
  imports: [NgFor],
  templateUrl: './character-info.component.html',
  styleUrl: './character-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterInfoComponent {
  @Input() character!: CustomMarvelChar | null;
}
