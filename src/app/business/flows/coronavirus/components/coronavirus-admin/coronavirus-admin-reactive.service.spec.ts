import { TestBed } from '@angular/core/testing';

import { CoronavirusAdminReactiveService } from './coronavirus-admin-reactive.service';

describe('CoronavirusAdminReactiveService', () => {
  let service: CoronavirusAdminReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronavirusAdminReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
