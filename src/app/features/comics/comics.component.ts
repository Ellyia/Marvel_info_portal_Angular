
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BannerComponent } from '@core/components/banner/banner.component';
import { ComicCardComponent } from '@comics/components/comic-card/comic-card.component';
import { CustomMarvelComic } from '@comics/models/comics.model';
import { ComicsMarvelService } from '@comics/services/comics-marvel.service';

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [ ComicCardComponent, BannerComponent],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.scss'
})
export class ComicsComponent {
  comicsList: CustomMarvelComic[] = [];
  amountOfReceivedComics: number = 0;

  comicsLimit: number = 15;
  comicsOffset: number = 150;

  constructor(
    private comicsService: ComicsMarvelService,
    private router: Router
  ) {
    this.showComics();
  }

  showComics(): void {
    this.comicsService.getComics(this.comicsLimit, this.comicsOffset)
      .subscribe(res => {
          this.amountOfReceivedComics = res.length;
          this.comicsList = [...this.comicsList, ...res];
      })
  }

  loadMore(): void {
    this.comicsOffset += this.comicsLimit;
    this.showComics();
  }

  showComic(id: number): void {
    this.router.navigate([`comics/${id}`]);
  }
}
