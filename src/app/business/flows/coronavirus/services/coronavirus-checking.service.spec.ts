import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoronavirusCheckingService } from './coronavirus-checking.service';

describe('CoronavirusCheckingService', () => {
  let service: CoronavirusCheckingService;
  let mockHttp:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule]
    });
    service = TestBed.inject(CoronavirusCheckingService);
  });
  beforeEach(()=>{
    mockHttp=TestBed.inject(HttpTestingController)
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
