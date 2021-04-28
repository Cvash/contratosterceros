import { TestBed } from '@angular/core/testing';

import { GraficoBarrasVerticalService } from './grafico-barras-vertical.service';

describe('GraficoBarrasVerticalService', () => {
  let service: GraficoBarrasVerticalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficoBarrasVerticalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
