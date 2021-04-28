import { TestBed } from '@angular/core/testing';

import { SupplierReportSympReactiveService } from './supplier-report-symp-reactive.service';

describe('SupplierReportSympReactiveService', () => {
  let service: SupplierReportSympReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierReportSympReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
