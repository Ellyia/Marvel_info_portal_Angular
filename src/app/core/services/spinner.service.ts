import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isLoading: boolean = false;

  constructor() { }

  set loading(value: boolean) {
    this.isLoading = value;
  }

  get loading(): boolean {
    return this.isLoading;
  }
}
