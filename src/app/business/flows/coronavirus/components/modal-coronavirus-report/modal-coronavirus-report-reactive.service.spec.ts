import { TestBed } from '@angular/core/testing';

import { ModalCoronavirusReportReactiveService } from './modal-coronavirus-report-reactive.service';

describe('ModalCoronavirusReportReactiveService', () => {
  let service: ModalCoronavirusReportReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalCoronavirusReportReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
