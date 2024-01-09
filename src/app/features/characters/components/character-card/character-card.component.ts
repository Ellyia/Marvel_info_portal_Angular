import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCardComponent {
  @Input() char!: any;
  @Output() onCardClick = new EventEmitter<number>();

  charImgUrl!: string;

  ngOnInit(): void {
    this.charImgUrl = this.char?.thumbnail.path + '.' + this.char?.thumbnail.extension;
  }

  emitCharacterID(): void {
    this.onCardClick.emit(this.char.id);
  }
}
