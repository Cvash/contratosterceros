import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DocumentHomeReactiveService } from './document-home-reactive.service';

describe('DocumentHomeReactiveService', () => {
  let service: DocumentHomeReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(DocumentHomeReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
