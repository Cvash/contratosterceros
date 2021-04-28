import { TestBed } from '@angular/core/testing';

import { TercerosService } from './terceros.service';

describe('TercerosService', () => {
  let service: TercerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TercerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
