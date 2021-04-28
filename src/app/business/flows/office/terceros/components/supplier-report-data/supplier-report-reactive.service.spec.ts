import { TestBed } from '@angular/core/testing';

import { SupplierReportReactiveService } from './supplier-report-reactive.service';

describe('SupplierReportReactiveService', () => {
  let service: SupplierReportReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierReportReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
