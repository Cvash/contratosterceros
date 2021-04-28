import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IMainUser, IViewModule } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { IResponseManagementSupplier } from '../../models/ResponseSupplier';
import { mockSwal } from '../mypass/mypass.component.spec';
import { MockDialog } from '../supplier-qr/supplier-qr/supplier-qr.component.spec';

import { SupplierAdminSupplierComponent } from './supplier-admin-supplier.component';
export class newDialogMock {
  open() {
    return {
      afterClosed: () => of({

        condition: 1,
        employee: {
          id: 2
        },
        result: true,
        mail: "josue180610@hotmail.com",
        flagActive:1,
        cond:true,
        idService:6,
        actionType:"D",
        supplier:{
          id:6,name:"HOLA",lastName1:"COMO",lastName2:"ESTAS"
        }

      })
    }
  }
}
describe('SupplierAdminSupplierComponent', () => {
  let component: SupplierAdminSupplierComponent;
  let fixture: ComponentFixture<SupplierAdminSupplierComponent>;
  let user: IMainUser;
  let dialog:MatDialog;
  let moduleList: Array<IViewModule>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierAdminSupplierComponent],
      imports: [MatDialogModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: MatDialog,
          useClass: MockDialog
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
    fixture = TestBed.createComponent(SupplierAdminSupplierComponent);
    component = fixture.componentInstance;
    dialog=TestBed.inject(MatDialog);
  }));

  beforeEach(async(() => {
    user = { "id": "2955", "href": "/user/2955", "token": "abb4d410-b92d-4157-ad52-0b307be20e48", "pass": "sdasdasda", "relatedParty": { "id": "3027", "href": "/employee/3027", "name": "JOAO JOSUE / HERNANDEZ / GODOY", "email": "joao.hernandezgo@telefonica.com", "description": "Employee", "legalId": [{ "country": "49", "legalEntity": "0055", "nationalIDType": "DNI", "nationalID": "73078273" }] }, "role": [{ "id": "11", "href": "/role/7046", "description": "ELE2_USER" }, { "id": "17", "href": "/role/14482", "description": "CORONA_USER" }, { "id": "18", "href": "/role/20551", "description": "CORONA_READ_QR" }, { "id": "16", "href": "/role/21178", "description": "CORONA_ADMIN" }, { "id": "40", "href": "/role/21192", "description": "CORONA_ADMIN_VNZ" }, { "id": "26", "href": "/role/24370", "description": "TER_TDPMNG" }, { "id": "52", "href": "/role/24381", "description": "TER_ADMIN" }, { "id": "65", "href": "/role/28596", "description": "USER_CAM" }, { "id": "60", "href": "/role/28597", "description": "USER_TDP" }, { "id": "62", "href": "/role/42933", "description": "USER_PERU" }, { "id": "65", "href": "/role/42934", "description": "USER_CAM" }, { "id": "60", "href": "/role/42935", "description": "USER_TDP" }, { "id": "65", "href": "/role/59766", "description": "USER_CAM" }, { "id": "62", "href": "/role/59767", "description": "USER_PERU" }, { "id": "60", "href": "/role/59768", "description": "USER_TDP" }, { "id": "65", "href": "/role/76599", "description": "USER_CAM" }, { "id": "62", "href": "/role/76600", "description": "USER_PERU" }, { "id": "60", "href": "/role/76601", "description": "USER_TDP" }, { "id": "62", "href": "/role/91330", "description": "USER_PERU" }, { "id": "60", "href": "/role/91331", "description": "USER_TDP" }, { "id": "68", "href": "/role/99604", "description": "SURVEY_ADMIN" }, { "id": "68", "href": "/role/99605", "description": "SURVEY_ADMIN" }, { "id": "66", "href": "/role/99606", "description": "BEN_ADMIN" }] }
    localStorage.setItem("user", JSON.stringify(user))
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
  }))
  afterEach(async(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("modules");
  }))

  it('when component is created', () => {
    expect(component).toBeTruthy();
  })

  it('when init variable', () => {
    expect(component.user).toEqual(null);
    expect(component.suppliers.length).toEqual(0);
    expect(component.suppliersBack.length).toEqual(0);
    expect(component.deshabilitados.length).toEqual(0);
    expect(component.suppliersCompanyService.length).toEqual(0);
    expect(component.suppliersGestorCompanyService.length).toEqual(0);
    expect(component.suppliersServiceDisabled.length).toEqual(0);
    expect(component.displayedColumns.length).toEqual(0);
    expect(component.displayColumnsService.length).toEqual(5);
    expect(component.today).toMatch("");
    expect(component.loading).toEqual(true);
    expect(component.company).toEqual(null);
    expect(component.supplierId).toEqual(0);
    expect(component.gestorName).toMatch("");
    expect(component.filtro).toMatch("");
    expect(component.serviceId).toEqual(0);
    expect(component.companyName).toMatch("");
    expect(component.type).toMatch("");
    expect(component.conditionLoad).toEqual(0);
    expect(component.sizeSupplierCompanyService).toEqual(0);
    expect(component.cssSuccess).toMatch("");
    expect(component.cssCancel).toMatch("");
    expect(component.cssWait).toMatch("");
    expect(component.dataSource).not.toBeUndefined();
    expect(component.dataSourceService).not.toBeUndefined();
    expect(component.paginator).toBeUndefined();
    expect(component.paginator2).toBeUndefined();
    expect(component.blockUI).not.toBeUndefined();
  })

  it('when execute loadData init === 0', fakeAsync(() => {
    let init=0;
    /* component.laodData() */
    const response = {
      "company": {
        company: 23,
        companyName: "....",
        contactMail: "josue180610@hotmail.com",
        contactPerson: "joao",
        contactPhone: "999985874",
        created_at: "2020-12-11T16:25:07",
        description: "Validators Dog Xtreme",
        id: 29,
        managerMail: "i201715100@cibertec.edu.pe",
        managerTdpOwnerMail: "joao.hernandezgo@telefonica.com",
        name: "Validators Dog Xtreme",
        status: true,
        updated_at: "2020-12-11T16:25:49"
      },
      "services": [{
        created_at: "2020-12-11T16:25:07",
        id: 29,
        name: "Validators Dog Xtreme",
        status: true,
        updated_at: "2020-12-11T16:25:49"
      }],
      "status": 1,
      "suppliers": [{
        activity: "",
      birthdate: "0000-00-00 00:00:00",
      codeCompany: "",
      coronaStatus: 2,
      gender: "",
      id: 538,
      lastName1: "nutriBell2.2",
      lastName2: "nutriBell2",
      mail: "josue180610@hotmail.com",
      mgn: 0,
      name: "nutriBell2",
      nationalId: "54778745",
      serviceName: ["Validators Dog Xtreme"],
      statusDetail: "Reportó posibles síntomas de COVID-19 al generar su pase.",
      statusToken: "Pendiente",
      updatedAt: "2020-12-18 10:46:21"
      }]
    }
    spyOn(component,'laodData').and.callThrough();
    component.ngOnInit();
    tick(3000);
    component.laodData(init);
    component.responseLoadData(response,init);
    expect(component.suppliersCompanyService.length).toEqual(1);
    flush();
    component.changeFilter("nutriBell2");
    tick(2000);
    expect(component.suppliers.length).toBeGreaterThanOrEqual(0);
    
  }))

  it('when execute loadData init === 1', fakeAsync(() => {
    let init=1;
    /* component.laodData() */
    const response = {
      "company": {
        company: 23,
        companyName: "....",
        contactMail: "josue180610@hotmail.com",
        contactPerson: "joao",
        contactPhone: "999985874",
        created_at: "2020-12-11T16:25:07",
        description: "Validators Dog Xtreme",
        id: 29,
        managerMail: "i201715100@cibertec.edu.pe",
        managerTdpOwnerMail: "joao.hernandezgo@telefonica.com",
        name: "Validators Dog Xtreme",
        status: true,
        updated_at: "2020-12-11T16:25:49"
      },
      "services": [{
        created_at: "2020-12-11T16:25:07",
        id: 29,
        name: "Validators Dog Xtreme",
        status: true,
        updated_at: "2020-12-11T16:25:49"
      }],
      "status": 1,
      "suppliers": []
    }
    spyOn(component,'laodData').and.callThrough();
    component.ngOnInit();
    tick(3000);
    component.laodData(init);
    component.responseLoadData(response,init);
    expect(component.suppliersCompanyService.length).toEqual(1);
    flush();
  }))
  it('when execute responseloadDataSuppliers init = 0 size = 1',fakeAsync(()=>{
    let init=0;
    /* component.laodData() */
    const response = {
      "company": {
        company: 23,
        companyName: "....",
        contactMail: "josue180610@hotmail.com",
        contactPerson: "joao",
        contactPhone: "999985874",
        created_at: "2020-12-11T16:25:07",
        description: "Validators Dog Xtreme",
        id: 29,
        managerMail: "i201715100@cibertec.edu.pe",
        managerTdpOwnerMail: "joao.hernandezgo@telefonica.com",
        name: "Validators Dog Xtreme",
        status: true,
        updated_at: "2020-12-11T16:25:49"
      },
      "services": [{
        created_at: "2020-12-11T16:25:07",
        id: 29,
        name: "Validators Dog Xtreme",
        status: true,
        updated_at: "2020-12-11T16:25:49"
      }],
      "status": 1,
      "suppliers": [
        {
          id:6,
          name:"aaaa",
          lastName1:"sssdd",
          lastName2:"ddas"
        }
      ]
    }
    spyOn(component,'laodData').and.callThrough();
    component.ngOnInit();
    tick(3000);
    component.laodData(init);
    component.responseLoadData(response,init);
    tick(3000);
    const response2={
      status:1,
      suppliers:[{
        id:1,
        name:"",
        lastName1:"",
        lastName2:""
      }],
      serviceDisabled:[{
        id:1,
        name:""
      },{
        id:2,
        name:"A"
      }],

    }
    component.sizeSupplierCompanyService=1;
    tick(3000)
    component.responseLoadDataSuppliers(response2,0,0);
    flush();
    expect(component.displayedColumns.length).toEqual(9);

    component.sizeSupplierCompanyService=3;
    tick(3000)
    component.responseLoadDataSuppliers(response2,0,1);
    flush();
    expect(component.displayedColumns.length).toEqual(10);
    
    const response3={
      status:0,
      suppliers:[{
        id:1,
        name:"",
        lastName1:"",
        lastName2:""
      }],
      serviceDisabled:[{
        id:1,
        name:""
      },{
        id:2,
        name:"A"
      }],
      
    }
    spyOn(Swal,'fire');
    tick(3000)
    component.responseLoadDataSuppliers(response3,0,1);
    expect(Swal.fire).toHaveBeenCalled();
    flush();

    const response4={
      result:true,
      dataSheet:{
        id:6,
        name:"",
        lastName1:"",
        lastName2:""
      }
    }
    component.responseMassiveCharge(response4);

    const response5={
      result:true,
      supplier:{
        id:6,
        name:"assfa",
        lastName1:"asda",
        lastName2:"asdasdad"
      }
    }
    let suptoedit: IResponseManagementSupplier;
    suptoedit={
      id:6,
    activity:"string",
    birthdate:"string",
    codeCompany:"string",
    gender:"string",
    lastName1:"string",
    lastName2:"string",
    mail:"string",
    name:"string",
    nationalId:"string",
    coronaStatus:1,
    statusDetail:"string"
    }
    component.responseEditAfterClosedSupplier(response5,suptoedit);

    component.responseNewTerceroAfterClosed(response5);
    expect(component.suppliers.length).toBeGreaterThanOrEqual(0);
    expect(component.suppliersBack.length).toBeGreaterThanOrEqual(0);
  }))
  it('when execute applyFilter',fakeAsync(()=>{ 
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
  it('when execute applyFilter2',fakeAsync(()=>{ 
    let spy=spyOn(component,'applyFilter2').and.callThrough();
    const event:any={
      target:{
        value:"hola"
      }
    };
    component.applyFilter2(event);
    tick(3000);
    expect(spy).toHaveBeenCalled();
  }))
  it('when execute enabled supplier', fakeAsync(() => {
    const response = {
      activity: "",
      birthdate: "None",
      codeCompany: "",
      coronaStatus: 2,
      gender: "",
      id: 538,
      lastName1: "nutriBell2",
      lastName2: "nutriBell2",
      mail: "josue180610@hotmail.com",
      mgn: 0,
      name: "nutriBell2",
      nationalId: "54778745",
      serviceName: ["Validators Dog Xtreme."],
      statusDetail: "Reportó posibles síntomas de COVID-19 al generar su pase.",
      statusToken: "Pendiente",
      updatedAt: "2020-12-15 20:10:47"
    }
    spyOn(dialog,'open').and.callThrough();
    spyOn(component,'laodData');
    component.habilitar(response);
    expect(dialog.open).toHaveBeenCalled();
  }))
  it('when execute newTercero',fakeAsync(()=>{
    tick(2000)
    component.ngOnInit();
    flush();
    spyOn(dialog,'open').and.callThrough();
    component.newTercero();
    expect(dialog.open).toHaveBeenCalled();
    flush();
  }))
  it('when execute delete suppliers', fakeAsync(() => {
    let init=0;
    /* component.laodData() */
    const response = {
      "company": {
        company: 23,
        companyName: "....",
        contactMail: "josue180610@hotmail.com",
        contactPerson: "joao",
        contactPhone: "999985874",
        created_at: "2020-12-11T16:25:07",
        description: "Validators Dog Xtreme",
        id: 29,
        managerMail: "i201715100@cibertec.edu.pe",
        managerTdpOwnerMail: "joao.hernandezgo@telefonica.com",
        name: "Validators Dog Xtreme",
        status: true,
        updated_at: "2020-12-11T16:25:49"
      },
      "services": [{
        created_at: "2020-12-11T16:25:07",
        id: 29,
        name: "Validators Dog Xtreme",
        status: true,
        updated_at: "2020-12-11T16:25:49"
      }],
      "status": 1,
      "suppliers": [{
        id:6,
        name:"",
        lastName1:"",
        lastName2:""
      }]
    }
    spyOn(component,'laodData').and.callThrough();
    component.ngOnInit();
    tick(3000);
    component.laodData(init);
    component.responseLoadData(response,init);

    const response2 = {
      condition: true,
      array: [{
        id: "30",
        name: "NutriBell"
      }]
    }
    spyOn(component,'deleteSupplier').and.callThrough();
    spyOn(component,'responseDeleteSupplier').and.callThrough();
    component.ngOnInit();
    tick(1000);
    let spy=spyOn(dialog,'open').and.callThrough();
    component.deleteSupplier(6,"D");
    component.responseDeleteSupplier(response2,6,"D");
    tick(3000);
    expect(component.suppliersGestorCompanyService.length).toEqual(1);
    expect(spy).toHaveBeenCalled();
    flush();
    component.deleteSupplier(6,"E");
    component.responseDeleteSupplier(response2,6,"E");
    tick(3000);
    expect(component.suppliersGestorCompanyService.length).toEqual(1);
    expect(spy).toHaveBeenCalled();
    flush();

    const response3={
      status:1,
      message:"dasd"
    }
    spyOn(Swal,'fire');
    spyOn(component,'removeSupplier');
    component.removeSupplier(6,true,6,"2955","D");
    component.repsonseRemoveSupplier(response3,"D",6);
    expect(Swal.fire).toHaveBeenCalled();
    flush();

    component.removeSupplier(6,true,6,"2955","E");
    component.repsonseRemoveSupplier(response3,"E",6);
    expect(Swal.fire).toHaveBeenCalled();
    flush();

    // edit
    let suptoedit: IResponseManagementSupplier;
    suptoedit={
      id:6,
    activity:"string",
    birthdate:"string",
    codeCompany:"string",
    gender:"string",
    lastName1:"string",
    lastName2:"string",
    mail:"string",
    name:"string",
    nationalId:"string",
    coronaStatus:1,
    statusDetail:"string"
    }
    component.editSupplier(suptoedit);
    expect(spy).toHaveBeenCalled();
    flush();
  }))
  it('when execute modal question delete', () => {
    const response = {
      actionType: "D",
      cond: true,
      flagActive: 1,
      idService: ["30"]
    }
  })
  it('when execute ngAfterViewinit',fakeAsync(()=>{
    spyOn(component.auth,'executeValidateSession');
    component.ngOnInit();
    tick(2000);
    component.ngAfterViewInit();
    flush();
  }))
  it('when execute asign new gestor', fakeAsync(() => {
    const response = {
      activity: "",
      birthdate: "0000-00-00 00:00:00",
      codeCompany: "",
      coronaStatus: 2,
      gender: "",
      id: 538,
      lastName1: "nutriBell2.2",
      lastName2: "nutriBell2",
      mail: "josue180610@hotmail.com",
      mgn: 0,
      name: "nutriBell2",
      nationalId: "54778745",
      serviceName: ["Validators Dog Xtreme"],
      statusDetail: "Reportó posibles síntomas de COVID-19 al generar su pase.",
      statusToken: "Pendiente",
      updatedAt: "2020-12-18 10:46:21"
    }
    spyOn(component,'asignNewGestor');
    component.ngOnInit();
    tick(1000);
    component.asignNewGestor(response);
    component.responseAsignNewGestor({
      condition:true,
      message:"HOLA"
    })
    flush();
    tick(2000);
    component.asignNewGestor(response);
    component.responseAsignNewGestor({
      condition:false,
      message:"HOLA"
    })
    flush();
  }))

  it('when execute clear content',()=>{
    component.clear();
    fixture.detectChanges();
    expect(component.suppliers.length).toEqual(0)
  })
  it('when execute getCoronaStatus',()=>{
    let status:string="";
    status=component.getCoronaStatus(1);
    expect(status).toMatch("Sin novedad");

    status=component.getCoronaStatus(2);
    expect(status).toMatch("Deshabilitado");

    status=component.getCoronaStatus(3);
    expect(status).toMatch("Sin definir");
  })

  it('when execute responseAfterClosedQuestionDelete',()=>{
    let spy=spyOn(component,'removeSupplier').and.callThrough();
    component.ngOnInit();
    const response={
      flagActive:1,
      cond:true,
      idService:1,
      actionType:"D"
    }
    component.responseAfterClosedQuestionDelete(response,7659);
    expect(spy).toHaveBeenCalled();
  })
});


