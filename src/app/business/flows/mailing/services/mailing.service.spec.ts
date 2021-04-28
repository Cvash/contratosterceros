import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IMainUser } from 'src/app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { API_SEND_MAIL, API_TEMPLATES } from '../../config/url.constants';
import { mockSwal } from '../../office/terceros/components/mypass/mypass.component.spec';
import { IMailTemplate } from '../models/responseMailing';

import { MailingService } from './mailing.service';

describe('MailingService', () => {
  let service: MailingService;
  let mockHttp:HttpTestingController;
  let user: IMainUser;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[{
        provide:Swal,
        useClass:mockSwal
      }]
    });
    service = TestBed.inject(MailingService);
  });
  beforeEach(()=>{ 
    mockHttp=TestBed.inject(HttpTestingController);
    service=TestBed.inject(MailingService);
    user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
    localStorage.setItem("user", JSON.stringify(user))
  })

  afterEach(()=>{ 
    localStorage.clear();
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when execute service methods',()=>{ 
    service.selectTemplate().toPromise().then(
      (resp)=> {
        expect(resp).toBeTruthy();
      }
    )
    const req=mockHttp.expectOne(API_TEMPLATES);
    expect(req.request.method).toEqual("GET");

    let template:IMailTemplate;
    template={
      id:1,
      title:"Ejemplo",
      cc:"josue180610@hotmail.com",
      cco:"josue180610@hotmail.com",
      subject:"Ejemplo",
      body:"<p>HOLA</p>"
    }
    service.saveTemplate(template).toPromise().then(
      (resp)=>{
        expect(resp).toBeTruthy();
      }
    )
    const req2=mockHttp.expectOne(API_TEMPLATES);
    expect(req2.request.method).toEqual("POST");
    service.updateTemplate(template).toPromise().then(
      (resp)=>{
        expect(resp).toBeTruthy();
      }
    )
    const req3=mockHttp.expectOne(API_TEMPLATES);
    expect(req3.request.method).toEqual("PUT");
    const request = {
      headers: [],
      datos: [],
      template: { template, body: "<p>HOLA</p>" },
      attachment: [],
      cus_attach: "filename"
    }

    service.sentEmails(request).toPromise().then(
      (resp)=>{ 
        expect(resp).toBeTruthy();
      }
    )
    const req4=mockHttp.expectOne(API_SEND_MAIL);
    expect(req4.request.method).toEqual("POST");
    spyOn(Swal,'fire');
    service.sentMail(request)
    expect(Swal.fire).toHaveBeenCalled();
 
    template.id=0;
    service.mergeTemplate(template)
    service.responseMergeMailingTemplate({status:1,message:"success"},"HOLA");
    expect(Swal.fire).toHaveBeenCalled();
  
    template.id=1;
    service.mergeTemplate(template);
    service.responseMergeMailingTemplate({status:0,message:"error"},"error");
    expect(Swal.fire).toHaveBeenCalled();

    service.modalSectionsService().toPromise().then(
      (resp)=>{ 
        expect(resp).toBeTruthy();
      }
    )

    service.showSwalAlertCustoms("success","HOLA");
    expect(Swal.fire).toHaveBeenCalled();

    service.showSwalAlertHtmlContent("success","Expedientes secretos X","Bab Boys");
    expect(Swal.fire).toHaveBeenCalled();

    service.chargeTemplate(2).toPromise().then(
      (resp)=>{
        expect(resp).toBeTruthy();
      }
    )
  })
  
});
