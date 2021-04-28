import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IMainUser } from '../../../../../../app/business/models/IModel-module';
import { API_TER_COMPANY_SERVICE, API_TER_COMPANY_SERVICES, API_TER_GET_COMPANY, API_TER_GET_COMPANYSERVICE_DESCRIPTION, API_TER_MNG_TDP_POST, API_TER_POST_ADD_USERSERVICE } from '../../../config/url.constants';
import { RequestCompany, RequestService } from '../models/RequestSupplier';

import { ManagerTdpService } from './manager-tdp.service';

describe('ManagerTdpService', () => {
  let service: ManagerTdpService;
  let mockHttp:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ManagerTdpService);
  });
  beforeEach(()=>{
    mockHttp=TestBed.inject(HttpTestingController);
  })
  afterEach(()=>{
    mockHttp.verify();
  })
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when execute services',()=>{
    // showManagerGestorTdp
    const value={
      id:6
    }
    service.showManagerGestorTdp(value).toPromise().then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    )
    const param="?idService="+value.id;
    const req=mockHttp.expectOne(API_TER_POST_ADD_USERSERVICE+param)
    expect(req.request.method).toEqual("GET");

    // addUserService
    const body={
      "id_emp":"3027",
      "id_serv":"6",
      "created_by":"2955",
      "updated_by":"2955"
    }
    service.addUserService(body).toPromise().then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    )
    const req2=mockHttp.expectOne(API_TER_POST_ADD_USERSERVICE);
    expect(req2.request.method).toEqual("POST");

    // searchEmployeeByEntity
    // ROLES
  let arrayIdRole: Array<any> = [];
  arrayIdRole.push("16");
  const request = { filter: "3027", role_x: arrayIdRole };
  service.searchEmployeeByEntity(request).toPromise().then(
    (response)=>{
      expect(response).toBeTruthy();
    }
  )
  const req3=mockHttp.expectOne(API_TER_MNG_TDP_POST);
  expect(req3.request.method).toEqual("POST");
  // findCompanyRuc
  const ruc:string="20600918975";
  const paramRuc:string="?ruc="+ruc;
  service.findCompanyByRuc(ruc).toPromise().then(
    (response)=>{
      expect(response).toBeTruthy();
    }
  )
   const req4=mockHttp.expectOne(API_TER_GET_COMPANY+paramRuc);
   expect(req4.request.method).toEqual("GET");
  // createCompanyService
  // 1 execute validateFromCompanyService
  const company_x:RequestCompany={
    ruc:"20600918975",
    alias:"HELLO",
    name:"Innotec Labs",
    activity:"Desarrollo de software malicioso"
  }
  const service_x:RequestService={
    id_company:6,
    name:"xpress velocy real life",
    description:"No lo se",
    contactname:"Marco Anthonio",
    contactmail:"josue180610@hotmail.com",
    contactnumber:"995878745"
  }
  const foundCondition=true;
  const requestCreate = {action: foundCondition==true?"C":"B",
    company: company_x, service: service_x,id_user:"2955"};
  service.createCompanyService(requestCreate).toPromise().then(
    (response)=>{
      expect(response).toBeTruthy();
    }
  )
  const req5=mockHttp.expectOne(API_TER_COMPANY_SERVICE);
  expect(req5.request.method).toEqual("POST");
  // loadContentManager
  let userRequest:IMainUser;
  userRequest={
    href:"",
    id:"7696",
    relatedParty:null,
    role:[],
    token:"",
    pass:""
  }
  service.loadContentManager(userRequest).toPromise().then(
    (response)=>{
      expect(response).toBeTruthy();
    }
  )
  const req6=mockHttp.expectOne(API_TER_COMPANY_SERVICES+userRequest.id);
  expect(req6.request.method).toEqual("GET");
  // showDescriptionCompanyService
  const paramCompServ="?id_serv=6";
  service.showDescriptionCompanyService("6").toPromise().then(
    (response)=>{
      expect(response).toBeTruthy();
    }
  )
  const req7=mockHttp.expectOne(API_TER_GET_COMPANYSERVICE_DESCRIPTION+paramCompServ);
  expect(req7.request.method).toEqual("GET");

  // removeGestorTdpService
  const obj={
    id_emp:3027,
    user_id:2955,
    idService:6
  };
  service.removeGestorTdpService(obj).toPromise().then(
    (response)=>{
      expect(response).toBeTruthy();
    }
  )
  const req8=mockHttp.expectOne(API_TER_POST_ADD_USERSERVICE);
  expect(req8.request.method).toEqual("PUT");
  })

  it('when execute handleError',()=>{
    const value={
      id:"F"
    };
    service.showManagerGestorTdp(value).toPromise().then
    (
      (response)=>{
        fail("BAD REQUESt")
      },
      (error:HttpErrorResponse)=>{
        expect(error.status).toEqual(400);
      }
    )
    const param="?idService=F";
    const req=mockHttp.expectOne(API_TER_POST_ADD_USERSERVICE+param);
    expect(req.request.method).toEqual("GET");
  })
});
