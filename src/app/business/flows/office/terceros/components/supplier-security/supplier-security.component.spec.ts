import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { of } from 'rxjs';
import { IGetEntryPass, IMainUser, IViewModule } from '../../../../../../business/models/IModel-module';
import Swal from 'sweetalert2';
import { IRequestCheck, IResponseCheck } from '../../models/RequestSupplier';
import { mockSwal } from '../mypass/mypass.component.spec';

import { SupplierSecurityComponent } from './supplier-security.component';

export class MockDialog{
  open(){
    return {
      afterClosed:()=>of({value:"any"})
    }
  }
}

describe('SupplierSecurityComponent', () => {
  let component: SupplierSecurityComponent;
  let fixture: ComponentFixture<SupplierSecurityComponent>;
  let dialog:MatDialog;
  let router:Router;
  let dailyReview:IGetEntryPass;
  let user:IMainUser;
  let moduleList: Array<IViewModule>=[];

  const routerMock={
    navigate:jasmine.createSpy("navigate")
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierSecurityComponent ],
      imports:[
        HttpClientTestingModule,RouterTestingModule,MatDialogModule,NgxQRCodeModule
      ],
      providers:[
        {
          provide:MatDialog,
          userClass:MockDialog
        },
        {
          provide:Swal,
          userClass:mockSwal
        },
        { 
          provide:Router,
          useValue:routerMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSecurityComponent);
    component = fixture.componentInstance;
    dialog=TestBed.inject(MatDialog);
    router=TestBed.inject(Router);
  })
  beforeEach(()=>{
    
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
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
  })
  afterEach(()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("modules");
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when init variable',()=>{ 
    expect(component.blockUI).not.toBeUndefined();
    expect(component.eppTouched).toEqual(false);
    expect(component.epps).toEqual(false);
    expect(component.typeMove).toMatch("");
    expect(component.qrscan).toEqual(false);
    expect(component.selectedDevice).toEqual(null);
    expect(component.scannerEnabled).toEqual(false);
    expect(component.hasCameras).toEqual(false);
    expect(component.availableDevices).toBeUndefined;
    expect(component.hasPermission).toBeUndefined();
    expect(component.searchMessage).toMatch("Aún no realiza una busqueda...");
    expect(component.searchResult).toEqual(false);
    expect(component.requestcheck).toBeUndefined();
    expect(component.viewStatus).toEqual(0);
    expect(component.formMessage).toMatch("");
    expect(component.ready).toEqual(false);
    expect(component.dailyReview).toBeUndefined();
    expect(component.user).toBeUndefined();
    expect(component.userType).toMatch("");
    expect(component.requestCheck).toEqual(null);
    expect(component.datetime).toMatch("");

  })

  it('when execute ngOnInit',()=>{ 
    spyOn(component,'searchClear');
    let user:IMainUser;
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
    component.ngOnInit();
    expect(component.user).not.toBeUndefined();
  })

  it('when execute changeEpp',()=>{ 
     component.changeEpp(true);
     expect(component.security.protectionEquipment.value).toEqual(true);
     expect(component.eppTouched).toEqual(true);
  })
  it('when execyte changeMoveType',()=>{ 
    component.changeMovetype('inp');
    expect(component.typeMove).toMatch("inp");
    expect(component.security.typeMov.value).toMatch("inp");
  })
  it('when execute cancelQRread',()=>{
    component.cancelQRread();
    expect(component.qrscan).toEqual(false);
    expect(component.searchResult).toEqual(false);
    
  })
  it('when execute readQR',()=>{ 
    component.readQR();
    expect(component.qrscan).toEqual(true);
    expect(component.scannerEnabled).toEqual(true);
  })
  it('when execute showAlertFormByCondition epps false, temp <= 38',fakeAsync(()=>{ 
    spyOn(dialog,'open');
    component.security.typeMov.setValue("inp");
    component.showAlertFormByCondition('18:01',user,"");
    expect(dialog.open).toHaveBeenCalled();
  }))

  it('when execute showAlertFormByCondition epps false and temp >=38',fakeAsync(()=>{
    spyOn(dialog,'open');
    component.security.typeMov.setValue("inp");
    component.security.temperature.setValue(39);
    component.showAlertFormByCondition("17:00",user,"");
    expect(dialog.open).toHaveBeenCalled();
    flush();
  }))
  it('when execute showAlertFormByCondition and dailyStatus is equals 4',fakeAsync(()=>{
    spyOn(dialog,'open');
    let user:IMainUser;
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
    component.security.typeMov.setValue("out");
    component.security.temperature.setValue(35);
    component.showAlertFormByCondition("18:30",user,"4");
    expect(dialog.open).toHaveBeenCalled();
    flush();
  }))

  it('when execute showAlertFormByCondition moveType out temperature >= 38',fakeAsync(()=>{
    spyOn(dialog,'open');
    let user:IMainUser;
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
    component.security.temperature.setValue(39);
    component.security.typeMov.setValue("out");
    component.showAlertFormByCondition("22:30",user,"4");
    expect(dialog.open).toHaveBeenCalled();
    flush();
  }))

  it('when execute showAlertFormByCondition status 1 moveType out temperature < 38 epps false',fakeAsync(()=>{
    spyOn(dialog,'open');
    let user:IMainUser;
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
    component.security.temperature.setValue(36);
    component.security.protectionEquipment.setValue(false);
    component.security.typeMov.setValue("out");
    component.showAlertFormByCondition("22:30",user,"1");
    expect(dialog.open).toHaveBeenCalled();
    flush();
    
  }))
  it('when execute showAlertFormByCondition status 1 moveType out temperature >= 38 epps true',fakeAsync(()=>{
    spyOn(dialog,'open');
    let user:IMainUser;
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
    component.security.temperature.setValue(39);
    component.security.protectionEquipment.setValue(true);
    component.security.typeMov.setValue("out");
    component.showAlertFormByCondition("22:30",user,"1");
    expect(dialog.open).toHaveBeenCalled();
    flush();
    
  }))
  it('when execute searchClear',fakeAsync(()=>{
    component.searchClear();
    tick(2000);
    expect(component.searchResult).toEqual(false);
    expect(component.eppTouched).toEqual(false);
    expect(component.typeMove).toMatch("");
    expect(component.security.protectionEquipment.value).toEqual(null);
    expect(component.security.typeMov.value).toMatch("");
    expect(component.security.observations.value).toMatch("");
    expect(component.security.temperature.value).toMatch("");
    expect(component.security.document.value).toMatch("");
    expect(component.security.token.value).toMatch("");
    expect(component.searchMessage).toMatch("Aún no realiza una busqueda...");
  }))
  it('when execute validateSearchData action search nationalType dni',fakeAsync(()=>{ 
    spyOn(Swal,'fire');
    component.security.document.setValue("");
    let status=component.validateSearchData("DNI","","SEARCH");
    expect(status).toEqual(true);
    expect(Swal.fire).toHaveBeenCalled();
    
  }))
  it('when execute validateSearchData action search nationalType token',fakeAsync(()=>{ 
    spyOn(Swal,'fire');
    component.security.token.setValue("");
    let status=component.validateSearchData("TOKEN","","SEARCH");
    expect(status).toEqual(true);
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execute validateSearchData action search nationalType empty',fakeAsync(()=>{ 
    spyOn(Swal,'fire');
    let status=component.validateSearchData("","","SEARCH");
    expect(status).toEqual(false);
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execute validateSearchData action save temp < 27 and > 45',fakeAsync(()=>{ 
    spyOn(Swal,'fire');
    let status=component.validateSearchData("","","SAVE");
    component.security.temperature.setValue(10);
    expect(status).toEqual(true);
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execute showAlertSearchResult',()=>{
    spyOn(Swal,'fire');
    component.showAlertSearchResult("Hola mundo!");
    expect(Swal.fire).toHaveBeenCalled();
  })
  it('when execute searchDataByQrCode',async(()=>{
    spyOn(component,'verifyAccessPass');
    spyOn(component,'validateSearchData');
    component.searchDataByQrCode("7693","TOKEN",null,"15_7693_2020-11-27");
    fixture.whenStable().then(()=>{
      component.verifyAccessPass("7693","TOKEN",null,"15_7693_2020-11-27","TOKEN");
      
    })
    
  }))
  it('when execute searchDataByNationalId',async(()=>{
    spyOn(component,'verifyAccessPass');
    spyOn(component,'validateSearchData');
    component.searchDataByNationalId("7693","DNI","70434432",null);
    fixture.whenStable().then(()=>{ 
      component.verifyAccessPass("7693","DNI","70434432",null,"DNI")
    })
  }))
  it('when execute subVerifyPass',()=>{
    spyOn(component.sup,'validateStatusToken').and.callThrough();
    component.subVerifyPass(dailyReview);
    expect(component.ready).toEqual(true);
  })
  it('when execute subVerifyPass status 0',()=>{
    dailyReview.status="0";
    spyOn(component.sup,'validateStatusToken').and.callThrough();
    component.subVerifyPass(dailyReview);
    expect(component.ready).toBeUndefined();
  })
  it('when execute subVerifyPass status 3',()=>{
    dailyReview.status="3";
    spyOn(component.sup,'validateStatusToken').and.callThrough();
    component.subVerifyPass(dailyReview);
    expect(component.ready).toEqual(true);
  })
  it('when execute subSaveCheckInOut',()=>{
    spyOn(component,'showAlertFormByCondition');
    spyOn(component,'searchClear');
    let check: IResponseCheck;
    check={
      code:"200",
      registerDate:"2020-12-12",
      message:"Success"
    }
    component.subSaveCheckInOut(check,"3");
    expect(component.datetime).toMatch("2020-12-12");
  })
  it('when execute captureValueObjectCheck',()=>{ 
    spyOn(component.sup,'validateStatusToken').and.callThrough();
    component.ngOnInit();
    component.subVerifyPass(dailyReview);
    component.security.temperature.setValue(39);
    let requestCheck:IRequestCheck=component.captureValueObjectCheck();
    expect(requestCheck).not.toBeUndefined();
    expect(requestCheck.temperature).toEqual(39);
  })

  it('when execute errorVerifyAccessPass',()=>{
    spyOn(Swal,'fire');
    component.errorVerifyAccessPass("HOLA MUNDO");
    expect(Swal.fire).toHaveBeenCalled();
  })

  it('when execute errorSaveCheckInOut',()=>{
    spyOn(Swal,'fire');
    component.errorSaveCheckIntOur("HOLA MUNDO");
    expect(Swal.fire).toHaveBeenCalled();
  })

});
