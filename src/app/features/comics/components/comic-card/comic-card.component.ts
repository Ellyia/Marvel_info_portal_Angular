import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomMarvelComic } from '../../models/comics.model';

@Component({
  selector: 'app-comic-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comic-card.component.html',
  styleUrl: './comic-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComicCardComponent {
  @Input() comic!: CustomMarvelComic;
  @Output() onCardClick = new EventEmitter<number>();

  emitComicID(): void {
    this.onCardClick.emit(this.comic.id);
  }
}
