import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomMarvelChar } from '@characters/models/characters.model';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCardComponent {
  @Input() char!: CustomMarvelChar;
  @Output() onCardClick = new EventEmitter<number>();

  emitCharacterID(): void {
    this.onCardClick.emit(this.char.id);
  }
}
