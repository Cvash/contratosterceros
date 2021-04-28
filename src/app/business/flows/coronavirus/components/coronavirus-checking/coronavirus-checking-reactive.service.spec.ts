import { TestBed } from '@angular/core/testing';

import { CoronavirusCheckingReactiveService } from './coronavirus-checking-reactive.service';

describe('CoronavirusCheckingReactiveService', () => {
  let service: CoronavirusCheckingReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronavirusCheckingReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
