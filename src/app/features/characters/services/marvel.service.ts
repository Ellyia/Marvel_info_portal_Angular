import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';


interface MarvelApiResponse {
  data: {
    results: any[];
  };
}

interface MarvelApiCharResponse {
  data: {
    results: any;
  };
}


@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  apiBase = 'https://gateway.marvel.com:443/v1/public/';
  apiKey = 'apikey=fe7700287fdcc6bdb92ae7f6e5f64d9c';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any[]> {
    return this.http.get<MarvelApiResponse>(
      `${this.apiBase}characters?limit=9&${this.apiKey}`
    ).pipe(
      map(res => res.data.results)
    )
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get<MarvelApiCharResponse>(
      `${this.apiBase}characters/${id}?${this.apiKey}`
    ).pipe(
      map(res => res.data.results[0]),
      tap(res => console.log(res.name))
    )
  }
}
