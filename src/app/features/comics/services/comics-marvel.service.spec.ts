import { TestBed } from '@angular/core/testing';

import { ComicsMarvelService } from './comics-marvel.service';

describe('ComicsMarvelService', () => {
  let service: ComicsMarvelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicsMarvelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
