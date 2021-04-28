import { TestBed } from '@angular/core/testing';

import { SupplierAdminReactiveService } from './supplier-admin-reactive.service';

describe('SupplierAdminReactiveService', () => {
  let service: SupplierAdminReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierAdminReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
