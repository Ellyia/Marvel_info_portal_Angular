import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from '@core/services/spinner.service';
import { map, Observable, tap } from 'rxjs';
import { CustomMarvelComic, MarvelApiComicsResponse, MarvelComic } from '../models/comics.model';

@Injectable({
  providedIn: 'root'
})
export class ComicsMarvelService {

  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }

  getComics(comicsLimit: number, comicsOffset: number): Observable<CustomMarvelComic[]> {

    this.spinnerService.setLoader(true); // to interseptor

    return this.http.get<MarvelApiComicsResponse>(
      `/comics?limit=${comicsLimit}&offset=${comicsOffset}`
    ).pipe(
      map(res => res.data.results.map(comic => this.transformComic(comic))),
      tap(() => this.spinnerService.setLoader(false))
    )
  }

  getComic(id: number): Observable<CustomMarvelComic> {
    return this.http.get<MarvelApiComicsResponse>(
      `/comics/${id}`
    ).pipe(
      map(res => res.data.results[0]),
      map(comic => this.transformComic(comic))
    )
  }

  transformComic(comic: MarvelComic): CustomMarvelComic {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description,
      thumbnailUrl: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      price: comic.prices[0].price ? `${comic.prices[0].price}$` : "not available",
      pages: comic.pageCount || 0,
      textObjects: comic.textObjects[0]
    }
  }

}
