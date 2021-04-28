import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoronavirusFormService } from './coronavirus-form.service';

describe('CoronavirusFormService', () => {
  let service: CoronavirusFormService;
  let mockHttp:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,RouterTestingModule
      ]
    });
    service = TestBed.inject(CoronavirusFormService);
  });
  beforeEach(()=>{
    mockHttp=TestBed.inject(HttpTestingController);
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
