import { TestBed } from '@angular/core/testing';

import { MailingHomeReactiveService } from './mailing-home-reactive.service';

describe('MailingHomeReactiveService', () => {
  let service: MailingHomeReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailingHomeReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
