import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomMarvelChar, MarvelApiCharsResponse, MarvelChar } from '@characters/models/characters.model';
import { SpinnerService } from '@core/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersMarvelService {
  charsLimit: number = 9;
  charsOffset: number = 9;

  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }

  getCharacters(): Observable<CustomMarvelChar[]> {

    this.spinnerService.setLoader(true); // to interseptor

    return this.http.get<MarvelApiCharsResponse>(
      `/characters?limit=${this.charsLimit}&offset=${this.charsOffset}`
    ).pipe(
      map(res => res.data.results),
      map(res => {
        return res.map(char => this.transformCharacter(char))
      }),
      tap(() => this.spinnerService.setLoader(false))
    )
  }

  getCharacter(id: number): Observable<CustomMarvelChar> {

    this.spinnerService.setLoader(true); // to interseptor

    return this.http.get<MarvelApiCharsResponse>(
      `/characters/${id}`
    ).pipe(
      map(res => res.data.results[0]),
      map(res => this.transformCharacter(res)),
      tap(() => this.spinnerService.setLoader(false))
    )
  }

  transformCharacter(char:MarvelChar): CustomMarvelChar {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }
}
