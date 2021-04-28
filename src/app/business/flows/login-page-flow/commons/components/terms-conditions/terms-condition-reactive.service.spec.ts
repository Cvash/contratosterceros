import { TestBed } from '@angular/core/testing';

import { TermsConditionReactiveService } from './terms-condition-reactive.service';

describe('TermsConditionReactiveService', () => {
  let service: TermsConditionReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermsConditionReactiveService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
