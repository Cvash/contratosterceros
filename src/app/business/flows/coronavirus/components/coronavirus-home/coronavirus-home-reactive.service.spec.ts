import { TestBed } from '@angular/core/testing';

import { CoronavirusHomeReactiveService } from './coronavirus-home-reactive.service';

describe('CoronavirusHomeReactiveService', () => {
  let service: CoronavirusHomeReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronavirusHomeReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
