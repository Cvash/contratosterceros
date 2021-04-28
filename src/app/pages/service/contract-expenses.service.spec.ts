import { TestBed } from '@angular/core/testing';

import { ContractExpensesService } from './contract-expenses.service';

describe('ContractExpensesService', () => {
  let service: ContractExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
