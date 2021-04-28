import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IMainUser, IViewMain, IViewModule } from '../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { mockSwal } from '../../../office/terceros/components/modal-add-manager-supplier/modal-add-manager-supplier.component.spec';
import { MockDialog } from '../../../office/terceros/components/supplier-security/supplier-security.component.spec';

import { CoronavirusCheckingComponent } from './coronavirus-checking.component';

describe('CoronavirusCheckingComponent', () => {
  let moduleList: Array<IViewModule>;
  let component: CoronavirusCheckingComponent;
  let fixture: ComponentFixture<CoronavirusCheckingComponent>;
  let mockRouter = { 
    navigate : jasmine.createSpy("navigate")
  }
  let module: Array<IViewMain>;
  let user:IMainUser;
  let dialog:MatDialog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusCheckingComponent ],
      imports:[ MatDialogModule,RouterTestingModule,HttpClientTestingModule],
      providers:[
        {
          provide:MatDialog,
          useClass:MockDialog
        },
        {
          provide:Router,
          useValue:mockRouter
        },
        {
          provide:Swal,
          useClass:mockSwal
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoronavirusCheckingComponent);
    component = fixture.componentInstance;
    user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
    localStorage.setItem("user", JSON.stringify(user));
    dialog=TestBed.inject(MatDialog);
    module = [
      {
        relatedEntity: [],
        id: 7,
        involvementRole: "CORONA_USER",
        href: "/HRManagement/usersandroles/v1/role/17",
        entitlement: [
          {
            action: "coronavirus$fa fa-user-md",
            description: "CORONAVIRUS",
            id: "7",
            platform: "App Web",
            manageableAsset: [{
              action: "R&W",
              endDate: null,
              startDate: null,
              entityType: "CORONA_HOME",
              href: "/coronavirus/home",
              id: "28",
              reference: null
            }]
          }
        ]
      }
    ]
    localStorage.setItem("permission", JSON.stringify(module));
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
  }));
  afterEach(async(()=>{ 
    localStorage.removeItem("user");
    localStorage.removeItem("permission");
    localStorage.removeItem("modules");
  }))
  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    expect(component.user).toEqual(null);
    expect(component.arrayIdRole.length).toEqual(0);
    expect(component.arrayPermissions.length).toEqual(0);
    expect(component.arrayAssistMgn.length).toEqual(0);
    expect(component.btnfileinput).toBeUndefined();
    expect(component.src).toMatch("");
    expect(component.type).toMatch("");
    expect(component.filename).toMatch("");
    expect(component.blockUI).not.toBeUndefined();
    expect(component.displayedColumns.length).toEqual(7);
    expect(component.dataSource).not.toBeUndefined();
    expect(component.paginator).toBeUndefined();
    expect(component.sort).toBeUndefined();

    spyOn(component.auth,'executeValidateSession');
    spyOn(dialog,'open');
    component.showCheckingReportCovid19();
    expect(dialog.open).toHaveBeenCalled();

    component.ngOnInit();
    spyOn(component,'onFileChange').and.callThrough();
    const value= {
      target: {
          files: [new Blob(['ssdfsdgdjghdslkjghdjg'], { type: 'pdf' })]
      }}
    component.onFileChange(value);
    expect(component.onFileChange).toHaveBeenCalled();
    
    // responseUploadFile
    spyOn(Swal,'fire');
    let rptUploadFile={
      condition:true,
      message:"success"
    }
    component.responseUploadFile(rptUploadFile);
    expect(Swal.fire).toHaveBeenCalled();

    rptUploadFile={
      condition:false,
      message:"error"
    }
    component.responseUploadFile(rptUploadFile);
    expect(Swal.fire).toHaveBeenCalled();

    // applyFilter
    const spy=spyOn(component,'applyFilter').and.callThrough();
      const event:any={
        target:{
          value:"hola"
        }
      };
      component.applyFilter(event);
      tick(1000);
      expect(spy).toHaveBeenCalled();


  }));
  it('when execute other script method',fakeAsync(()=>{ 
    spyOn(component,"showDataAssistManagement");
    component.showData("","2020-02-02");
    tick(1000);
    /* spyOn(component,'showDataAssistByDate'); */
    component.showData("2020-03-03","2020-04-04");
    component.showDataAssistByDate("2020-03-04","2020-03-12");
    let response=[{
    id:1,
    cip:"12223565",
    id_employee: "3027",
    datemark: "2020-03-03",
    hourmark: "18:38",
    typemark:"QR",
    comment:"palmaso",
    user_name:"joao josue"
    }]
    component.responseShowDataAssistMng(response);
    tick(1000);
    expect(component.arrayAssistMgn.length).toEqual(1);
    flush();

    spyOn(Swal,'fire');
    const response2={
      condition:false,
      message:"error"
    }
    component.responseShowDataAssistMng(response2);
    expect(Swal.fire).toHaveBeenCalled();

    component.responseShowDataByDate(response)

    // removeDataAssistManagement
    spyOn(component,'removeDataAssistManagement');
    component.removeDataAssistManagement(15);
    let response3 = { 
      condition:true,
      message:"success"
    }
    component.responseRemoveData(response3);

    response3={ 
      condition:false,
      message:"error"
    }
    component.responseRemoveData(response3);
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execute other script method', fakeAsync(()=>{
    spyOn(Swal,'fire');
    const requestCheck=[];
    tick(1000);
    component.responseShowDataByDate(requestCheck);
    

    const response=[{
      id:1,
      cip:"12223565",
      id_employee: "3027",
      datemark: "2020-03-03",
      hourmark: "18:38",
      typemark:"QR",
      comment:"palmaso",
      user_name:"joao josue"
      }]
      tick(1000);
      component.responseShowDataByDate(response);
      flush();
      expect(component.checkingForm.startDate.value).toMatch("");
      expect(component.checkingForm.endDate.value).toMatch("");
  }))
});
