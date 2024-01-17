import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BannerComponent } from '@coreComponents/banner/banner.component';
import { Subscription } from 'rxjs';
import { ComicCardComponent } from './components/comic-card/comic-card.component';
import { CustomMarvelComic } from './models/comics.model';
import { ComicsMarvelService } from './services/comics-marvel.service';

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [CommonModule, ComicCardComponent, BannerComponent],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.scss'
})
export class ComicsComponent {
  comicsList$: CustomMarvelComic[] = [];
  sub!: Subscription;

  comicsLimit: number = 15;
  comicsOffset: number = 0;

  constructor(private comicsService: ComicsMarvelService, private router: Router) {
    this.showComics();
  }

  showComics() {
    this.sub = this.comicsService.getComics(this.comicsLimit, this.comicsOffset).subscribe(
      res => {
        this.comicsList$ = [...this.comicsList$, ...res];
      }
    )
  }

  loadMore() {
    this.comicsOffset += this.comicsLimit;
    this.showComics();
  }

  showComic(id: number) {
    this.router.navigate([`comics/${id}`]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
