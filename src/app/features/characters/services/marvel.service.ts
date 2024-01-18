import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomMarvelChar, MarvelApiCharsResponse, MarvelChar } from '@characters/models/characters.model';
import { SpinnerService } from '@core/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersMarvelService {

  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }

  getCharacters(charsLimit: number, charsOffset: number): Observable<CustomMarvelChar[]> {
    this.spinnerService.setLoader(true); // to interseptor

    return this.http.get<MarvelApiCharsResponse>(
      `/characters?limit=${charsLimit}&offset=${charsOffset}`
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
      thumbnailUrl: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepageUrl: char.urls[0].url,
      wikiUrl: char.urls[1].url,
      comics: char.comics.items
    }
  }
}