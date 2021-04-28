import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { IMainUser } from '../../../../../../app/business/models/IModel-module';
import { API_TER_GET_VERIFY_EXIST, API_TER_POST_FINDMASSIVE_SUPPLIER, API_TER_SUPPLIER } from '../../../config/url.constants';
import { IRequestAddNewSupplier, IRequestPostAddSupplier } from '../models/RequestSupplier';

import { SupplierManagerService } from './supplier-manager.service';

describe('SupplierManagerService', () => {
  let service: SupplierManagerService;
  let user:IMainUser;
	let httpMock:HttpTestingController;	
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatDialogModule,RouterTestingModule],
      providers:[
        {
          provide:MAT_DIALOG_DATA,
          useValue:{}
        }
      ]
    });
    service = TestBed.inject(SupplierManagerService);
  });
  beforeEach(()=>{ 
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
    httpMock=TestBed.inject(HttpTestingController);
  })
  afterEach(()=>{ 
    localStorage.removeItem("user");
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('when test services',()=>{ 
    // execute searchSupp test
    service.searchSupplierDocument("45454545","S","5").toPromise().then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    );
    const param="?nationalId=45454545&typeUser=S&idService=5";
    const req0=httpMock.expectOne(API_TER_GET_VERIFY_EXIST+param);
    // add new supplier
    let request:IRequestPostAddSupplier;
    let requestCollection:Array<IRequestPostAddSupplier>=[];
    let supplier_x:IRequestAddNewSupplier;
    supplier_x={
        name:"HOLA",
        lastName1:"HOLA2",
        lastName2:"HOLA3",
        idCompany:6,
        nationalId:"22665590",
        codeCompany:"",
        mail:"josue180610@hotmail.com",
        birthdate:"2000-01-20",
        gender:"M",
        activity:"",
        coronaStatus:0,
        statusDetail:""
    };
    request={
      supplier:supplier_x,
      user_id:"10020",
      type:"mng",
      typeAction:"U"
    }
    requestCollection.push(request);
    service.addNewSupplier(requestCollection).toPromise().then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    )
    const req=httpMock.expectOne(API_TER_SUPPLIER)
    expect(req.request.method).toEqual("POST");
    // editNewSupplier
    service.editNewSupplier(requestCollection,supplier_x.idCompany).toPromise().then(
      (response)=>{ 
        expect(response).toBeTruthy();
      }
    )
    const req2=httpMock.expectOne(API_TER_SUPPLIER)
    expect(req2.request.method).toEqual("PUT");
    // findNationalId
    service.findByNationalId(requestCollection).toPromise()
    .then(
      (response)=>{
        expect(response).toBeTruthy();
      }
    )
    const req3=httpMock.expectOne(API_TER_POST_FINDMASSIVE_SUPPLIER);
    expect(req3.request.method).toEqual("POST");
  })
 
  it('when generate error service',()=>{
    service.searchSupplierDocument("asdad","d4a6sd4",null).toPromise().then(
      (response:HttpErrorResponse)=>{
            expect(response.status).not.toEqual(200);
      }
    )
  })

});
