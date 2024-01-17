import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerComponent } from '@coreComponents/banner/banner.component';
import { Subscription } from 'rxjs';
import { CustomMarvelComic } from '../../models/comics.model';
import { ComicsMarvelService } from '../../services/comics-marvel.service';

@Component({
  selector: 'app-comics-info',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './comics-info.component.html',
  styleUrl: './comics-info.component.scss'
})
export class ComicsInfoComponent {
  id!: number;
  sub!: Subscription;
  comics!: CustomMarvelComic;

  constructor(private route: ActivatedRoute, private comicsService: ComicsMarvelService, private router: Router) {}

  ngOnInit(): void {
    this.id = +(this.route.snapshot.paramMap.get('id') || 0);
    this.sub = this.comicsService.getComic(this.id).subscribe(
      res => {
        this.comics = res;
      }
    )
  }

  toComics() {
    this.router.navigate(['comics/all']);
  }
}
