import { TestBed } from '@angular/core/testing';

import { SupplierAdminSupplierReactiveService } from './supplier-admin-reactive.service';

describe('SupplierAdminReactiveService', () => {
  let service: SupplierAdminSupplierReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierAdminSupplierReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
