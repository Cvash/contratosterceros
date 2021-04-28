import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { element } from 'protractor';
import { Observable, of } from 'rxjs';
import { IGetEntryPass, IMainUser, IViewModule } from '../../../../../../business/models/IModel-module';
import Swal from 'sweetalert2';
import { SupplierService } from '../../services/supplier.service';
import { MockDialog } from '../supplier-qr/supplier-qr/supplier-qr.component.spec';

import { MypassComponent } from './mypass.component';

export class mockSwal { 
  fire () {
    return {
      then : ()=> of({
        "value":true
      })
    }   
  }
}

describe('MypassComponent', () => {
  let routerMock={ 
    navigate:jasmine.createSpy("navigate")
  }
  let component: MypassComponent;
  let fixture: ComponentFixture<MypassComponent>;
  let router:Router;
  let dailyReview:IGetEntryPass;
  let moduleList: Array<IViewModule>;
  let user:IMainUser;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypassComponent ],
      imports:[ 
        HttpClientTestingModule,RouterTestingModule,MatDialogModule
      ],
      providers:[
        SupplierService,{
          provide:MatDialog,
          useClass:MockDialog
        },
        { 
          provide:Router,
          useValue:routerMock
        },
        { 
          provide:Swal,
          useClass:mockSwal
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypassComponent);
    component = fixture.componentInstance;
    router=TestBed.inject(Router);
    dailyReview={
      "userId": "2955",
      "pass": false,
      "token": "",
      "status": "7",
      "startDate": "",
      "endDate": "",
      "entryPass": {
          "contactCoronavirus": false,
          "employee": {
              "employeeId": "3027",
              "name": "JOAO JOSUE HERNANDEZ GODOY",
              "nationalType": "E",
              "nationalId": "73078273",
              "company": "T. PERU"
          },
          "location": {
              "city": "",
              "campus": "",
              "floor": "",
              "transport": {
                  "code": ""
              }
          },
          "symptoms": [],
          "affidavit": {
              "confirm": false,
              "signature": {
                  "image": ""
              }
          }
      },
      "description": "El usuario aún no resuelve el formulario. Necesita resolver el formulario para poder registrar su ingreso/salida.",
      "additionalData": [
          {
              "code": "POPUP",
              "value": "",
              "data": [
                  {
                      "code": "#QuédateEnCasa",
                      "value": "¡Tu salud y bienestar es primero! Permanece en casa trabajando en remoto, tu líder te comunicará cuando llegue el momento de retornar a oficina. Si necesitas acudir a la oficina por un tema urgente, conversa con tu líder y tu Business Partner de RRHH, maria.sandovals@telefonica.com, para autorizar tu ingreso de manera excepcional. Recuerda que en caso presentes algún síntoma de COVID-19 debes comunicarte con tu líder y contactar al médico ocupacional al 964474485 quien te brindará el asesoramiento correspondiente.",
                      "data": [
                          {
                              "code": "positive",
                              "value": "OK, entiendo",
                              "data": []
                          },
                          {
                              "code": "negative",
                              "value": "",
                              "data": []
                          }
                      ]
                  }
              ]
          }
      ]
  }
  moduleList=[
    {
    action: "coronavirus$fa fa-user-md",
    description: "CORONAVIRUS",
    id: "7",
    platform:"Web Admin",
    manageableAsset:[
      {
        action: "R",
        endDate: null,
        entityType: "CORONA_HOME",
        href: "/coronavirus/home",
        id: "28",
        reference: null,
        startDate: "2020-10-21T18:11:35"
      },
      {
        action: "R",
        endDate: null,
        entityType: "CORONA_QR",
        href: "/coronavirus/admin",
        id: "33",
        reference: null,
        startDate: "2020-10-21T18:11:35"
      }
    ]
  }]
  localStorage.setItem("modules",JSON.stringify(moduleList));
  user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
  });

  afterEach(()=>{
    localStorage.removeItem("modules");
    localStorage.removeItem("user");
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when init variable',()=>{
    expect(component.user).toEqual(null);
    expect(component.myName).toMatch('');
    expect(component.viewStatus).toBeUndefined();
    expect(component.ready).toEqual(false);
    expect(component.elementType).toMatch("url");
    expect(component.value).toMatch("");
    expect(component.banner).toMatch("");
    expect(component.dailyReview).toBeUndefined();
  })

  it('when execute ngOnInit',fakeAsync(()=>{
    spyOn(component,'verifyAccessPass');
    let user:IMainUser;
		user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
    component.ngOnInit();
    tick(1000);
    expect(component.myName).toContain("JOAO JOSUE");
    tick(2000);
    expect(component.verifyAccessPass).toHaveBeenCalled();
  }))

  it('when execute generatePass',()=>{
    component.generatePass();
    expect(router.navigate).toHaveBeenCalled();

  })
  it('when execute verifyAccessPass', fakeAsync(()=>{
    
    let spyCompSup=spyOn(component.sup,'accessPass');
    let spyComp=spyOn(component,'verifyAccessPass');
    component.verifyAccessPass(dailyReview.userId);
    component.sup.accessPass(dailyReview.userId,"","","");
    expect(spyComp).toHaveBeenCalled();
    expect(spyCompSup).toHaveBeenCalled();
  
  }))

  it('when execute verifyAccessPass errorHttpResponse',fakeAsync(()=>{
    let dailyReview:IGetEntryPass;
    dailyReview={
      "userId": "295522222222",
      "pass": false,
      "token": "",
      "status": "7",
      "startDate": "",
      "endDate": "",
      "entryPass": {
          "contactCoronavirus": false,
          "employee": {
              "employeeId": "3027",
              "name": "JOAO JOSUE HERNANDEZ GODOY",
              "nationalType": "E",
              "nationalId": "73078273",
              "company": "T. PERU"
          },
          "location": {
              "city": "",
              "campus": "",
              "floor": "",
              "transport": {
                  "code": ""
              }
          },
          "symptoms": [],
          "affidavit": {
              "confirm": false,
              "signature": {
                  "image": ""
              }
          }
      },
      "description": "El usuario aún no resuelve el formulario. Necesita resolver el formulario para poder registrar su ingreso/salida.",
      "additionalData": [
          {
              "code": "POPUP",
              "value": "",
              "data": [
                  {
                      "code": "#QuédateEnCasa",
                      "value": "¡Tu salud y bienestar es primero! Permanece en casa trabajando en remoto, tu líder te comunicará cuando llegue el momento de retornar a oficina. Si necesitas acudir a la oficina por un tema urgente, conversa con tu líder y tu Business Partner de RRHH, maria.sandovals@telefonica.com, para autorizar tu ingreso de manera excepcional. Recuerda que en caso presentes algún síntoma de COVID-19 debes comunicarte con tu líder y contactar al médico ocupacional al 964474485 quien te brindará el asesoramiento correspondiente.",
                      "data": [
                          {
                              "code": "positive",
                              "value": "OK, entiendo",
                              "data": []
                          },
                          {
                              "code": "negative",
                              "value": "",
                              "data": []
                          }
                      ]
                  }
              ]
          }
      ]
  }
    let spyCompSup=spyOn(component.sup,'accessPass');
    let spyComp=spyOn(component,'verifyAccessPass');
    component.verifyAccessPass(dailyReview.userId);
    component.sup.accessPass(dailyReview.userId,"","","");
    expect(spyComp).toHaveBeenCalled();
    expect(spyCompSup).toHaveBeenCalled();
  }))

  it('when execute subVerifyAccessPass',fakeAsync(()=>{
    component.subVerifyAccessPass(dailyReview);
    tick(2000);
    expect(component.ready).toEqual(true);
}))

it('when execute errorVerifyAccessPass',fakeAsync(()=>{ 
  spyOn(Swal,'fire');
  component.errorSubVerifyAccessPass("error");
  tick(2000);
  expect(component.banner).toMatch("Se produjo un error.")
  expect(Swal.fire).toHaveBeenCalled();
}))
});
