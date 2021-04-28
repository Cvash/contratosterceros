import { TestBed } from '@angular/core/testing';

import { ModalRelationshipReactiveService } from './modal-relationship-reactive.service';

describe('ModalRelationshipReactiveService', () => {
  let service: ModalRelationshipReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalRelationshipReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
