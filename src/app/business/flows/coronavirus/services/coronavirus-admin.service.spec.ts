import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoronavirusAdminService } from './coronavirus-admin.service';
describe('CoronavirusAdminService', () => {
  let service: CoronavirusAdminService;
  let mockHttp:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule]
    });
    service = TestBed.inject(CoronavirusAdminService);
  });

  beforeEach(()=>{ 
    mockHttp=TestBed.inject(HttpTestingController);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
