import { TestBed } from '@angular/core/testing';

import { SupplierManagerReactiveService } from './supplier-manager-reactive.service';

describe('SupplierManagerReactiveService', () => {
  let service: SupplierManagerReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierManagerReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
