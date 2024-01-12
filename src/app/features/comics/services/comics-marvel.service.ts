import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicsMarvelService {

  constructor(private http: HttpClient) { }

  getComics(comicsLimit: number, comicsOffset: number): Observable<any> {
    return this.http.get<any>(
      `/comics?limit=${comicsLimit}&offset=${comicsOffset}`
    ).pipe(
      map(res => res.data.results)
    )
  }

}
