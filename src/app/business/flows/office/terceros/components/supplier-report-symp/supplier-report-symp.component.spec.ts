import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { IGetEntryPass, IMainUser, IViewModule } from '../../../../../../business/models/IModel-module';
import Swal from 'sweetalert2';
import { IRequestReportSymp } from '../../models/RequestSupplier';
import { SupplierService } from '../../services/supplier.service';

import { SupplierReportSympComponent } from './supplier-report-symp.component';
export class MockDialog{
  open(){
    return {
      afterClosed:()=>of(Observable || "any")
  }}
}
export class MockSwal{
  fire(){
    return {
        then:()=>of({
            name:"any value"
        })
    }
}
}
describe('SupplierReportSympComponent', () => {
  let component: SupplierReportSympComponent;
  let fixture: ComponentFixture<SupplierReportSympComponent>;
  let user:IMainUser;
  let dailyReview:IGetEntryPass;
  let symp:any;
  let router:Router;
  let moduleList: Array<IViewModule>=[];

  const Mockrouter={ 
    navigate:jasmine.createSpy("navigate")
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierReportSympComponent ],
      imports:[ 
        HttpClientTestingModule,RouterTestingModule
      ],
      providers:[
        SupplierService,{
          provide:MatDialog,
          useClass:MockDialog
        },
        {
          provide:Swal,
          useClass:MockSwal
        },
        {
          provide:Router,
          useValue:Mockrouter
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierReportSympComponent);
    component = fixture.componentInstance;
    router=TestBed.inject(Router);
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
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
  symp={
    "id": "2",
    "title": "Formulario basico",
    "description": "Responde las siguientes preguntas",
    "questions": [
        {
            "id": "39",
            "code": "1",
            "description": "¿Has estado en contacto con algún paciente con coronavirus en los últimos 14 días?",
            "answer": {
                "id": "1",
                "type": "switch",
                "optionsList": [
                    {
                        "id": "1",
                        "code": "",
                        "value": "SI",
                        "selected": false
                    },
                    {
                        "id": "2",
                        "code": "",
                        "value": "NO",
                        "selected": false
                    }
                ]
            }
        },
        {
            "id": "16",
            "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/icon_tos.png",
            "description": "Tos",
            "answer": {
                "id": "1",
                "type": "switch",
                "optionsList": [
                    {
                        "id": "1",
                        "code": "",
                        "value": "SI",
                        "selected": false
                    },
                    {
                        "id": "2",
                        "code": "",
                        "value": "NO",
                        "selected": false
                    }
                ]
            }
        },
        {
            "id": "17",
            "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/icon_fiebre.png",
            "description": "Fiebre",
            "answer": {
                "id": "1",
                "type": "switch",
                "optionsList": [
                    {
                        "id": "1",
                        "code": "",
                        "value": "SI",
                        "selected": false
                    },
                    {
                        "id": "2",
                        "code": "",
                        "value": "NO",
                        "selected": false
                    }
                ]
            }
        },
        {
            "id": "18",
            "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/icon_garganta.png",
            "description": "Dolor de garganta",
            "answer": {
                "id": "1",
                "type": "switch",
                "optionsList": [
                    {
                        "id": "1",
                        "code": "",
                        "value": "SI",
                        "selected": false
                    },
                    {
                        "id": "2",
                        "code": "",
                        "value": "NO",
                        "selected": false
                    }
                ]
            }
        },
        {
            "id": "19",
            "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/icon_aire.png",
            "description": "Falta de aire",
            "answer": {
                "id": "1",
                "type": "switch",
                "optionsList": [
                    {
                        "id": "1",
                        "code": "",
                        "value": "SI",
                        "selected": false
                    },
                    {
                        "id": "2",
                        "code": "",
                        "value": "NO",
                        "selected": false
                    }
                ]
            }
        },
        {
            "id": "53",
            "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Vector-5.png",
            "description": "Pérdida del olfato",
            "answer": {
                "id": "1",
                "type": "switch",
                "optionsList": [
                    {
                        "id": "1",
                        "code": "",
                        "value": "SI",
                        "selected": false
                    },
                    {
                        "id": "2",
                        "code": "",
                        "value": "NO",
                        "selected": false
                    }
                ]
            }
        },
        {
            "id": "54",
            "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/Vector-6.png",
            "description": "Pérdida del gusto",
            "answer": {
                "id": "1",
                "type": "switch",
                "optionsList": [
                    {
                        "id": "1",
                        "code": "",
                        "value": "SI",
                        "selected": false
                    },
                    {
                        "id": "2",
                        "code": "",
                        "value": "NO",
                        "selected": false
                    }
                ]
            }
        },
        {
            "id": "55",
            "code": "https://storageqallarix.blob.core.windows.net/wpqallarix-prod/congestion.png",
            "description": "Congestión nasal",
            "answer": {
                "id": "1",
                "type": "switch",
                "optionsList": [
                    {
                        "id": "1",
                        "code": "",
                        "value": "SI",
                        "selected": false
                    },
                    {
                        "id": "2",
                        "code": "",
                        "value": "NO",
                        "selected": false
                    }
                ]
            }
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
  });

  afterEach(()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("modules");
  })
  it('when init variable',()=>{ 
    expect(component.requestReport).toBeUndefined();
    expect(component.formMessage).toMatch("");
    expect(component.dailyReview).toBeUndefined();
    expect(component.ready).toEqual(false);
    expect(component.sintomas.length).toEqual(0);
    expect(component.formenable).toEqual(true);
    expect(component.myName).toMatch("");
    expect(component.viewStatus).toEqual(null);
    expect(component.validateAccess).toBeUndefined();
    expect(component.user).toEqual(null);
    expect(component.sympQuestion.length).toEqual(0);
    expect(component.blockUI).not.toBeUndefined();
    expect(component.sympFormReport.length).toEqual(0);
    expect(component.form).toEqual(null);
  })

  it('when execute ngOnInit',()=>{ 
    localStorage.setItem("user",JSON.stringify(user));
    component.ngOnInit();
    expect(user.id).toMatch("2955");
  })

  it('when execute captureValueObject',fakeAsync(()=>{
    localStorage.setItem("user",JSON.stringify(user));
    component.ngOnInit();
    component.dailyReview=dailyReview;
    tick(2000);
    let requestReport:IRequestReportSymp;
    requestReport=component.captureValueObjectReport();
    tick(2000);
    expect(requestReport.report).toMatch("SYMPTOM");
  }))

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  

  

  it('when execute addSubStartedSymp',fakeAsync(()=>{
    component.addSubStartedSympReport(symp);
    tick(2000);
    expect(component.form.description).toMatch("Responde las siguientes preguntas");
    expect(component.sympFormReport.length).toBeGreaterThan(0);
}))

it('when execute requiredOneSymp response false',fakeAsync(()=>{ 
  expect(component.requiredOneSymp(2)).toEqual(false);
}))

it('when execute requiredOneSymp response true',fakeAsync(()=>{ 
  spyOn(Swal,'fire').and.callThrough();
  component.requiredOneSymp(0);
  expect(Swal.fire).toHaveBeenCalled();
  flush();
}))
it('when execute addAnswerQuestion',fakeAsync(()=>{
  component.addSubStartedSympReport(symp);
  tick(2000);
  let status=component.addAnswerQuestion();
  tick(2000);
  expect(status).toEqual(false);
  flush();
}))

it('when execute addAnswerQuestion answer true',fakeAsync(()=>{
    component.addSubStartedSympReport(symp);
    tick(2000);
    component.sympFormReport[0].option=true;
    component.sympFormReport[0].touched=true;
    component.sympFormReport[1].option=true;
    component.sympFormReport[1].touched=true;
    tick(2000);
    let status=component.addAnswerQuestion();
    tick(2000);
    expect(status).toEqual(true);
    flush();
  }))

it('when execute generateMyPass',fakeAsync(()=>{
  component.generateMyPass();
  tick(1000);
  expect(router.navigate).toHaveBeenCalled();
}))
it('when execute generatePass',fakeAsync(()=>{
  component.generatePass();
  tick(1000);
  expect(router.navigate).toHaveBeenCalled();
}))

it('when execute errorVerifyAccessPass',fakeAsync(()=>{ 
    component.errorVerifyAccessPass();
    tick(2000);
    expect(component.formMessage).toMatch("Esta cuenta no tiene asociado a un proveedor.")
    
}))

it('when execute subVerifyAccessPass',fakeAsync(()=>{
    component.subVerifyAccessPass(dailyReview);
    tick(2000);
    expect(component.ready).toEqual(true);
}))

it('when execute changeSymptomOptionReport',()=>{ 
    component.addSubStartedSympReport(symp);
    component.changeSymptomOptionReport(2,true);
    expect(component.sympFormReport.length).toBeGreaterThan(0);
})

it('when execute errorReportSymptoms',()=>{
    spyOn(Swal,'fire');
    component.errorReportSymptoms("HOLA MUNDO");
    expect(Swal.fire).toHaveBeenCalled();
})
});
