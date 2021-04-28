
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IMainUser, IViewMain, IViewModule } from '../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { mockSwal } from '../../../office/terceros/components/mypass/mypass.component.spec';
import { MockDialog } from '../../../office/terceros/components/supplier-qr/supplier-qr/supplier-qr.component.spec';
import { CoronaEmployee } from '../../models/request-corona-form';
import { CoronavirusAdminService } from '../../services/coronavirus-admin.service';

import { CoronavirusAdminComponent } from './coronavirus-admin.component';
import { IAdminData } from '../../models/response-corona-form';

describe('CoronavirusAdminComponent', () => {
  let component: CoronavirusAdminComponent;
  let fixture: ComponentFixture<CoronavirusAdminComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy("navigate")
  }
  let router: Router;
  let user: IMainUser;
  let module: Array<IViewMain>;
  let dialog:MatDialog;
  let moduleList: Array<IViewModule>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoronavirusAdminComponent],
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [
        CoronavirusAdminService,
        {
          provide: MatDialog,
          useClass: MockDialog
        },
        {
          provide: Router,
          useValue: mockRouter
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
    fixture = TestBed.createComponent(CoronavirusAdminComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dialog= TestBed.inject(MatDialog);
    user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
    localStorage.setItem("user", JSON.stringify(user))
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

  afterEach(async(() => {
    localStorage.removeItem("permission");
    localStorage.removeItem("user");
    localStorage.removeItem("modules");
  }))

  it('should create', () => {
    expect(component.module.length).toEqual(0);
    expect(component.user).toEqual(null);
    expect(component.src).toMatch("");
    expect(component.type).toMatch("");
    expect(component.filename).toMatch("");
    expect(component.btnfileinputAdm).toBeUndefined();
    expect(component.checked).toEqual(false);
    expect(component.arrayCronica.length).toEqual(0);
    expect(component.arrayRequestCondition.length).toEqual(0);
    expect(component.conditionCronica).toEqual(false);
    expect(component.conditionPrecondition).toEqual(false);
    expect(component.items.length).toEqual(0);
    expect(component.searchResults.length).toEqual(0);
    expect(component.arrayCondition.length).toEqual(0);
    expect(component.showDetail).toEqual(false);
    expect(component.personDetails.id).toEqual(0);
    expect(component.personDetails.name).toMatch("");
    expect(component.personDetails.cip).toMatch("");
    expect(component.personDetails.dni).toMatch("");
    expect(component.personDetails.status).toEqual(0);
    expect(component.personDetails.comment).toMatch("");
    expect(component.personDetails.phone).toMatch("");
    expect(component.personDetails.mail).toMatch("");

    expect(component.arrayCoronaStatus.length).toEqual(0);
    expect(component.arrayCoronaType.length).toEqual(0);
    expect(component.arrayCoronaReason.length).toEqual(0);
    expect(component.displayedColumns.length).toEqual(12);
    expect(component.dataSource).not.toBeUndefined();
    expect(component.paginator).toBeUndefined();
    expect(component.sort).toBeUndefined();

    expect(component.blockUI).not.toBeUndefined();

    component.clear();
    expect(component.showDetail).toEqual(false);
    expect(component.coronaAdminForm.typeWork.value).toMatch("");
    expect(component.coronaAdminForm.healthPerson.value).toMatch("");
    expect(component.coronaAdminForm.statusWork.value).toMatch("");
  });

  it('when execute all script method', fakeAsync(() => {
    spyOn(component, 'loadDataCdo');
    spyOn(component.auth, 'executeValidateSession');
    component.ngOnInit();
    tick(1500);
    expect(component.coronaAdminForm.healthPerson.value).toEqual(0);
    expect(component.coronaAdminForm.typeWork.value).toEqual(0);
    expect(component.coronaAdminForm.statusWork.value).toEqual(0);
    expect(component.coronaAdminForm.byemployeeinp.value).toMatch("");
    flush();
    tick(1500);
    expect(component.user.id).toMatch("2955");
    expect(component.arrayIdRole.length).toBeGreaterThanOrEqual(1);
    flush();
    let response = {
      message:"success",
      status: true,
      array_r: [{
        id: 1, name: "g"
      },
      {
        id: 2, name: "r"
      }],
      array: [{
        id: 1, name: "fk"
      },
      {
        id: 2, name: "ad"
      }],
      array_t: [{
        id: 1, name: "as"
      },
      {
        id: 2, name: "aq"
      }]
    }

    component.responseLoadData(response);
    tick(1500)
    expect(component.arrayCoronaReason.length).toEqual(2);
    expect(component.arrayCoronaStatus.length).toEqual(2);
    expect(component.arrayCoronaType.length).toEqual(2);
    flush();

    response={ 
      message:"bad request",
      status: false,
      array_r: [],
      array: [],
      array_t: []
    }
    spyOn(Swal,'fire')
    component.responseLoadData(response);
    expect(Swal.fire).toHaveBeenCalled();
    flush();

    // findByStatusDetName
    const respFindStatus=[{
      cip: "000045920",
      comment: "",
      country: "",
      date_reason: "2020-4-23",
      date_type: "2020-03-16",
      degree_infection: "#99CCCC",
      dni: "06706180",
      id: 5,
      id_request: 1,
      mail: "",
      name: "LUIS ANTONIO VASQUEZ VASQUEZ",
      phone: "985589350",
      precondition_1: 0,
      precondition_2: 0,
      precondition_3: 1,
      precondition_4: 0,
      precondition_5: 0,
      precondition_6: 0,
      precondition_7: 0,
      precondition_8: 0,
      precondition_9: 0,
      precondition_10: 0,
      precondition_11: null,
      reason: "Personal sin novedad",
      status: "Personal con otras licencias",
      type: "No requiere presencia física",
      array_cronico:[{
        updated_at:null,
        other_chronic_diseases:"sobredosis",
        status: null,
        created_at:null,
        id: 14,
        coronagroupdetail:4,
        description: "no se"
      }]
    }]
    spyOn(component,'findByStatusDetName');
    component.findByStatusDetName(14);
    component.responseFindStatusDetails(respFindStatus);
    tick(1500);
    expect(component.searchResults.length).toEqual(1);
    expect(component.arrayCronica.length).toEqual(1);
    flush();

    // showDetails
    spyOn(component,'showDetails');
    const emp:CoronaEmployee ={
      id:3027,
      name:"JOAO JOSUE",
      cip:"05545548",
      dni:"73078273",
      status:1,
      comment:"hola mundo",
      phone:"936555023",
      mail:"joao.hernandezgo@telefonica.com",
      id_request:10,
      details:[{
        created_at:"2020-12-30",
        status:true,
        date_reason:"",
        type:"",
        date_type:"2020-12-30",
        reason:"Con salud",
        created_by:"joao josue",
        comment:"mentira"
      }]
    }
    let repsonseDetails= { 
      code:true,
      details:[{
        created_at:"2020-12-30",
        status:true,
        date_reason:"",
        type:"",
        date_type:"2020-12-30",
        reason:"Con salud",
        created_by:"joao josue",
        comment:"mentira"
      }]
    }
    component.showDetails(emp);
    component.responseShowDetails(repsonseDetails,emp);

    // responseEquals
    const search:IAdminData={
        id: 4, 
        name: "asdasda",
        cip: "79898988",
        dni: "78989865",
        status: "dasdas",
        comment: "dasdasd",
        country:"Peru",
        phone: "998985478",
        mail: "josue180610@hotmail.com",
        id_request: 5,
        type:"ddasd",
        date_reason:"2020-03-03",
        date_type:"2020-02-02",
        precondition_1:1,
        precondition_2:1,
        precondition_3:1,
        precondition_4:1,
        precondition_5:1,
        precondition_6:1,
        precondition_7:1,
        precondition_8:1,
        precondition_9:1,
        precondition_10:1,
        degree_infection:"ASDASD",
        office_access:1
    }
    let ArrayAdmin:Array<IAdminData>=[];
    ArrayAdmin.push(search);
    component.responseEqualsId(3027,3027,ArrayAdmin);
    tick(1500);
    expect(component.searchResults.length).toEqual(1);
    flush();

    // size <=0
    component.responseConditionSize(0);
    tick(1000);
    expect(component.conditionPrecondition).toEqual(false);
    flush();
    // code is false
    repsonseDetails= { 
      code:false,
      details:[]
    }
    component.responseShowDetails(repsonseDetails,emp);
    tick(1000);
    expect(component.personDetails.details.length).toEqual(0);
    flush();

    // showPreconditionCondition
    component.coronaAdminForm.chk00.setValue(false);
    component.coronaAdminForm.chk01.setValue(false);
    component.coronaAdminForm.chk02.setValue(false);
    component.coronaAdminForm.chk03.setValue(false);
    component.coronaAdminForm.chk04.setValue(false);
    component.coronaAdminForm.chk05.setValue(false);
    component.coronaAdminForm.chk06.setValue(false);
    component.coronaAdminForm.chk07.setValue(false);
    component.coronaAdminForm.chk08.setValue(false);
    component.coronaAdminForm.chk09.setValue(false);
    tick(1500);
    expect(component.showPreconditionByCondition()).toEqual(true);
    flush();
    component.coronaAdminForm.chk00.setValue(true);
    tick(1500);
    expect(component.showPreconditionByCondition()).toEqual(false);
    flush();

    // showDataEdit
    spyOn(dialog,'open').and.callThrough();
    spyOn(component,'searchByEmployee');
    component.showDataEdit("3027");
    expect(dialog.open).toHaveBeenCalled();
    
    // modal coronavirus report
    component.showReportCovid19();
    expect(dialog.open).toHaveBeenCalled();

    // onFileChange
    spyOn(component,'onFileChange').and.callThrough();
    const value= {
      target: {
          files: [new Blob(['ssdfsdgdjghdslkjghdjg'], { type: 'pdf' })]
      }}
    component.onFileChange(value);
    expect(component.onFileChange).toHaveBeenCalled();
  
    component.resetInput();
    expect(component.btnfileinputAdm.nativeElement.value).toMatch("");

    // uploadFile
    const rep = {
      condition:true,
      message:"success"
    }
    spyOn(component,'uploadFile');
    spyOn(component.adminService,'saveMassiveCoronaRequest');;
    component.uploadFile("asdgssfskjnkbdkvbdkfjbjkvbkjdfjkcnv","dasdfg.pdf","$$",1,"2955");
    // condition true
    component.responseUploadFile({
      condition:true,
      message:"success"
    });
    expect(dialog.open).toHaveBeenCalled();
    // condition false
    component.responseUploadFile(
      {
        condition:false,
        message:"bad request"
      }
    )
    expect(dialog.open).toHaveBeenCalled();

    // applyFilter
    let spy=spyOn(component,'applyFilter').and.callThrough();
    const event:any={
      target:{
        value:"hola"
      }
    };
    component.applyFilter(event);
    tick(3000);
    expect(spy).toHaveBeenCalled();


  }))
  it('when execute other script method',fakeAsync(()=>{
    let search={
      id: 4, 
      name: "asdasda",
      cip: "79898988",
      dni: "78989865",
      status: "dasdas",
      comment: "dasdasd",
      country:"Peru",
      phone: "998985478",
      mail: "josue180610@hotmail.com",
      id_request: 5,
      type:"ddasd",
      date_reason:"2020-03-03",
      date_type:"2020-02-02",
      precondition_1:1,
      precondition_2:1,
      precondition_3:1,
      precondition_4:1,
      precondition_5:1,
      precondition_6:1,
      precondition_7:1,
      precondition_8:1,
      precondition_9:1,
      precondition_10:1,
      degree_infection:"ASDASD",
      office_access:1,
      array_cronico:[{
        coronagroup: 4,
        created_at: "2020-03-26T21:05:26",
        description: "BASE",
        id: 17,
        name: "Diabetes",
        status: true,
        updated_at: "2020-09-09T11:13:38"
      }],
      request_condition:[{
        created_by: 2955,
        description: null,
        id: 2663,
        id_corona_condition_detail: 17,
        other_chronic_diseases: "",
        updated_by: 2955
      }]
  }
  let ArrayAdmin:Array<IAdminData>=[];
  ArrayAdmin.push(search);
  component.arrayCondition=ArrayAdmin;
  tick(1000);
  component.responseConditionSize(1);
  flush();
  expect(component.coronaAdminForm.chk00.value).toEqual(true);
  expect(component.coronaAdminForm.chk01.value).toEqual(true);
  
  search={
    id: 4, 
      name: "asdasda",
      cip: "79898988",
      dni: "78989865",
      status: "dasdas",
      comment: "dasdasd",
      country:"Peru",
      phone: "998985478",
      mail: "josue180610@hotmail.com",
      id_request: 5,
      type:"ddasd",
      date_reason:"2020-03-03",
      date_type:"2020-02-02",
      precondition_1:0,
      precondition_2:0,
      precondition_3:0,
      precondition_4:0,
      precondition_5:0,
      precondition_6:0,
      precondition_7:0,
      precondition_8:0,
      precondition_9:0,
      precondition_10:0,
      degree_infection:"ASDASD",
      office_access:1,
      array_cronico:[{
        coronagroup: 4,
        created_at: "2020-03-26T21:05:26",
        description: "BASE",
        id: 17,
        name: "Diabetes",
        status: true,
        updated_at: "2020-09-09T11:13:38"
      }],
      request_condition:[{
        created_by: 2955,
        description: null,
        id: 2663,
        id_corona_condition_detail: 17,
        other_chronic_diseases: "",
        updated_by: 2955
      }]
  }
  
  ArrayAdmin.push(search);
  component.arrayCondition=ArrayAdmin;
  tick(1000);
  component.responseConditionSize(2);
  flush();
  expect(component.coronaAdminForm.chk00.value).toEqual(false);
  expect(component.coronaAdminForm.chk01.value).toEqual(false);
    
  // responseSearchEmployee
  const response={
    "results":ArrayAdmin,
    "code":true,
  }
  component.responseSearchEmployee(response);
  expect(component.arrayCronica.length).toBeGreaterThanOrEqual(1);
}))
});
