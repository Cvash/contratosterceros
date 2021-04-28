import { DatePipe } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { API_TER_REPORT_MODULE } from '../../../config/url.constants';
import { ReportData } from '../models/ResponseSupplier';

import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService;
  let httpMock:HttpTestingController;
  let date:DatePipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[DatePipe]
    });
    service = TestBed.inject(ReportService);
    httpMock=TestBed.inject(HttpTestingController);
    date=TestBed.inject(DatePipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when execute loadDataOptions',()=>{
    service.loadDataOptinos("7754").toPromise().then(
      (response)=>{
        console.log(response);
        expect(response).toBeTruthy();
      }
    )
    const param="?userId=7754";
    const req=httpMock.expectOne(API_TER_REPORT_MODULE+param);
  })

  it('when execute downloadReportSupplier',fakeAsync(()=>{
    const arrayReportGeneral: Array<ReportData> = [];
    const json = {
      "userId": "7754",
      "dateStart": "",
      "dateEnd": "",
      "idService": "",
      "dataReport": arrayReportGeneral,
      "typeAction": "R"
    }
    service.downloadReportSupplier(json).toPromise().then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    )
    const req=httpMock.expectOne(API_TER_REPORT_MODULE);
    expect(req.request.method).toEqual("POST");
  }))

  it('when execute generateReportSupplier',()=>{
    let arrayIdService = []
    arrayIdService.push("6")
    const json = {
      "userId": "2955",
      "dateStart": date.transform("2020-07-20", "yyyy-MM-dd"),
      "dateEnd": date.transform("2020-07-30", "yyyy-MM-dd"),
      "idService": arrayIdService,
      "dataReport": "",
      "typeAction": "P"
    }
    service.generateReportSupplier(json).toPromise().then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    );
    const req=httpMock.expectOne(API_TER_REPORT_MODULE);
    expect(req.request.method).toEqual("POST");
  })
});
