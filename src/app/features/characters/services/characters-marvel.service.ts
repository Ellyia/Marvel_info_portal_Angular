import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomMarvelChar, MarvelApiCharsResponse, MarvelChar } from '@characters/models/characters.model';
import { SpinnerService } from '@core/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersMarvelService {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  getCharacters(charsLimit: number, charsOffset: number): Observable<CustomMarvelChar[]> {
    this.spinnerService.startLoading(); // to interseptor

    return this.http.get<MarvelApiCharsResponse>(`/characters?limit=${charsLimit}&offset=${charsOffset}`)
      .pipe(
        map(res => res.data.results.map(char => this.transformCharacter(char))),
        tap(() => this.spinnerService.stopLoading())
      )
  }

  getCharacter(id: number): Observable<CustomMarvelChar> {
    this.spinnerService.startLoading(); // to interseptor

    return this.http.get<MarvelApiCharsResponse>(`/characters/${id}`)
      .pipe(
        map(res => this.transformCharacter(res.data.results[0])),
        tap(() => this.spinnerService.stopLoading())
      )
  }

  getCharacterByName(name: string): Observable<MarvelChar> {
    return this.http.get<MarvelApiCharsResponse>(`/characters?name=${name}`)
      .pipe(
        map(res => res.data.results[0])
      )
  }

  transformCharacter(char: MarvelChar): CustomMarvelChar {
    return {
      ...char,
      thumbnailUrl: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepageUrl: char.urls[0].url,
      wikiUrl: char.urls[1].url,
      comicsItems: char.comics.items
    }
  }
}
