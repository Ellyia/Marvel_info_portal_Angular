import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loading: boolean = false;

  constructor() { }

  setLoader(loading: boolean) {
    this.loading = loading;
  }

  getLoader(): boolean {
    return this.loading;
  }
}
