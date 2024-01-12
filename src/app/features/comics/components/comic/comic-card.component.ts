import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comic-card',
  standalone: true,
  imports: [],
  templateUrl: './comic.component.html',
  styleUrl: './comic.component.scss'
})
export class ComicComponent {
  @Input() comic!: any;
  @Output() onCardClick = new EventEmitter<number>();

  emitCharacterID(): void {
    this.onCardClick.emit(this.comic.id);
  }
}
