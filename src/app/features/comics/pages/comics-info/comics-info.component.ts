import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BannerComponent } from '@core/components/banner/banner.component';
import { CustomMarvelComic } from '@comics/models/comics.model';
import { ComicsMarvelService } from '@comics/services/comics-marvel.service';

@Component({
  selector: 'app-comics-info',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './comics-info.component.html',
  styleUrl: './comics-info.component.scss'
})
export class ComicsInfoComponent implements OnInit {

  id!: number;
  comics!: CustomMarvelComic;

  constructor(
    private route: ActivatedRoute,
    private comicsService: ComicsMarvelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);

    this.comicsService.getComic(this.id)
      .subscribe(res => {
          this.comics = res;
      })
  }

  toComics(): void {
    this.router.navigate(['comics']);
  }
}
