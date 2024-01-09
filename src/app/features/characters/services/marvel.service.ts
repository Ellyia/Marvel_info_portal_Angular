import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MarvelApiCharsResponse, MarvelChar } from '@characters/models/characters.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersMarvelService {
  charsLimit: number = 9;
  charsOffset: number = 9;

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<MarvelChar[]> {
    return this.http.get<MarvelApiCharsResponse>(
      `/characters?limit=${this.charsLimit}&offset=${this.charsOffset}`
    ).pipe(
      map(res => res.data.results)
    )
  }

  getCharacter(id: number): Observable<MarvelChar> {
    return this.http.get<MarvelApiCharsResponse>(
      `/characters/${id}`
    ).pipe(
      map(res => res.data.results[0])
    )
  }
}
