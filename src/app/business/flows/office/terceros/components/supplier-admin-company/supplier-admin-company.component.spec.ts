import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule} from '@angular/router/testing';
import { of } from 'rxjs';
import { IMainUser, IViewModule } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { RequestCompany, RequestService, RequestUserService } from '../../models/RequestSupplier';
import { ICompanyService } from '../../models/ResponseSupplier';
import { mockSwal } from '../mypass/mypass.component.spec';
import { SupplierAdminCompanyComponent } from './supplier-admin-company.component';
import { SupplierAdminReactiveService } from './supplier-admin-reactive.service';
export class newDialogMock{
  open(){
    return {
      afterClosed:()=>of({
        
          condition:1,
          employee:{
            id:2
          },
          result:true,
          mail:"josue180610@hotmail.com"
        
      })
    }
  }
}

describe('SupplierAdminCompanyComponent', () => {
  let component: SupplierAdminCompanyComponent;
  let fixture: ComponentFixture<SupplierAdminCompanyComponent>;
  let user:IMainUser;
  let moduleList: Array<IViewModule>;
  const dialogRefmock={
    close:()=>{},
    afterClosed:()=>{}
  }
  let dialog:MatDialog;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierAdminCompanyComponent ],
      imports : [MatDialogModule,HttpClientTestingModule,RouterTestingModule],
      providers:[
        SupplierAdminReactiveService,
        {
          provide:MatDialog,
          useClass:newDialogMock
        },
        {
          provide:MatDialogRef,
          useValue:dialogRefmock
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
    fixture = TestBed.createComponent(SupplierAdminCompanyComponent);
    component = fixture.componentInstance;
  }));
  beforeEach(async(()=>{ 
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
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
    dialog=TestBed.inject(MatDialog);
  }))
  afterEach(async(()=>{ 
    localStorage.removeItem("user");
    localStorage.removeItem("modules");
  }))
  it('when created is success',()=>{
    expect(component).toBeTruthy();
  })
  it('when init variable',()=>{
    expect(component.conditionService).toEqual(false);
    expect(component.showMessageCondition).toEqual(false);
    expect(component.messageCondition).toMatch("");
    expect(component.lstCompanies.length).toEqual(0);
    expect(component.lstCompaniesOwn.length).toEqual(0);
    expect(component.flagFoundAdminRole).toEqual(false);
    expect(component.displayedColumns.length).toEqual(6);
    expect(component.dataSource).not.toBeUndefined();
    expect(component.paginator).toBeUndefined();

    expect(component.optionCompany.length).toEqual(0);
    expect(component.optionCompanyFilter.length).toEqual(0);

    expect(component.arrayCompanyService.length).toEqual(0);
    expect(component.arrayGestorTdp.length).toEqual(0);

    expect(component.user).toEqual(null);
    
    expect(component.formDisabled).toEqual(false);
    expect(component.foundCondition).toEqual(false);
    expect(component.formCondition).toEqual(false);

    expect(component.newService).toEqual(true);
    expect(component.blockUI).not.toBeUndefined();
    expect(component.actionForm).toMatch('');

    expect(component.company.ruc).toMatch("");
    expect(component.company.alias).toMatch("");
    expect(component.company.name).toMatch("");
    expect(component.company.activity).toMatch("");

    expect(component.service.id_company).toEqual(0);
    expect(component.service.name).toMatch('');
    expect(component.service.description).toMatch("");
    expect(component.service.contactname).toMatch("");
    expect(component.service.contactnumber).toMatch("");
    expect(component.service.contactmail).toMatch("");
  })

  it('when execute loadContent',fakeAsync(()=>{
    spyOn(component,'loadContent');
    component.user=user;
    tick(1000);
    const response={ 
      "foundAdmin":true,
      'companies':[{
        id:1,
        name:"xd",
        description:"hola",
        createdBy:"2955"
      },
      {
        id:1,
        name:"xd",
        description:"hola",
        createdBy:"1"
      }]
    }
    flush();
    const arrayOwn:Array<ICompanyService>=[{
      ruc:"5656598974565461",
      company_name:"yo soy peru",
      service:"noSeRick",
      managerMail:"joao.hernandezgo@telefonica.com",
      status:"activo"
    }]

    component.addContent(response,user);
    expect(component.lstCompaniesOwn.length).toEqual(0);
    flush();
  }))

  it('when execute nextForm ruc is empty',fakeAsync(()=>{
    component.ngOnInit();
    component.nextForm();
    expect(component.showMessageCondition).toEqual(true);
    component.formAdmin.ruc.setValue("");
    tick(1000);
    component.findCompanyByRuc();
    flush();
    expect(component.showMessageCondition).toEqual(true);

  }))

  
  it('when execute nextForm ruc is not empty',fakeAsync(()=>{
    component.formAdmin.ruc.setValue("fsfsd");
    spyOn(component.manager,'findCompanyByRuc').and.callThrough();
    component.nextForm();
    expect(component.manager.findCompanyByRuc).toHaveBeenCalled();
  
  }))

  it('when execute responseFindCompanyRuc condition === true',()=>{
    const company={
      activity: "Unit Test",
      alias: "....",
      company_code: "5587459987856574",
      created_at: "2020-12-10T09:46:03",
      id: 23,
      name: "Jira xtreme RPG",
      status: true,
      updated_at: "2020-12-10T09:46:03"
    }
    const condition=true;
    const message="";
    const response={
      "condition":condition,
      "company":company,
      "message":message
    }
    component.responseFindCompanyRuc(response);
    expect(component.formDisabled).toEqual(true);
    expect(component.formCondition).toEqual(true);
    expect(component.actionForm).toMatch("B");
  })
  it('when execute previousTableCompanyService',()=>{
    component.previousTableCompanyService();
    expect(component.newService).toEqual(true);
  })
  it('when execute showAddNewCompanyService',()=>{
    let type:string;
    type="E";
    component.showAddNewCompanyService(type);
    expect(component.newService).toEqual(false);

    type="D";
    component.showAddNewCompanyService(type);
    expect(component.newService).toEqual(true);
  })
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
  it('when execute responseFindCompanyRuc condition === false',()=>{
    const response={
      "condition":false
    }
    component.responseFindCompanyRuc(response);
    expect(component.formDisabled).toEqual(false);
    expect(component.formCondition).toEqual(true);
    expect(component.actionForm).toMatch("B");
  })

  it('when execute showDialogSuccessManagerTdp',fakeAsync(()=>{
    const condition=true;
    const object={
      company_name: "Jira xtreme RPG",
      contact: "j - josue180610@hotmail.com",
      createdBy: 2955,
      id: 30,
      idManager: 534,
      managerMail: "i201715100@cibertec.edu.pe",
      ruc: "5587459987856574",
      service: "NutriBell",
      status: true
    }
    const response={
      "condition":condition,
      "employee":{ 
        cip: "010749888",
      fullname: "JOAO JOSUE HERNANDEZ GODOY",
      id: 3027,
      national_id: "73078273"
      }

    }
    component.showDialogSuccessManagerTdp(response,object.id,user);    
    flush();
  }))
  it('when executeRemoveGestorTdpService',fakeAsync(()=>{ 
    spyOn(component,"removeGestorTdpService");
    const response={ 
      condition:1,
      employee:{
        id:2
      }
    }
    component.executeRemoveGestorTdpService(response.condition,response.employee.id,6,7695);
    expect(component.removeGestorTdpService).toHaveBeenCalled();
  }))
  it('when execute showManagerGestor',fakeAsync(()=>{
    spyOn(component,'showManagerGestor').and.callThrough();
    const value={
      id:"6"
    };
    component.ngOnInit();
    tick(3000);
    component.showManagerGestor(value);
    flush();
  }))
  it('when execute showSweetAlertMessage',fakeAsync(()=>{
    spyOn(Swal,'fire');
    component.showSweetAlertMessage("error","bab request");
    expect(Swal.fire).toHaveBeenCalled();
  }))
  it('when execute showAlertResponse',fakeAsync(()=>{
    spyOn(Swal,'fire');
    const response={
      condition:true,
      message:"Success"
    }
    component.showAlertResponse(response);
    expect(Swal.fire).toHaveBeenCalled();
    const response2={
      condition:false,
      errors:"Bad request"
    }
    component.showAlertResponse(response2);
    expect(Swal.fire).toHaveBeenCalled();
  }))
  it('when execute responseRemoveGestorTdpService === true',fakeAsync(()=>{
    spyOn(Swal,'fire');
    component.ngOnInit();
    tick(3000);
    const response={
      condition:true,
      message:"hola"
    }
    component.responseRemoveGestorTdpService(response)
    expect(Swal.fire).toHaveBeenCalled();
  }))
  it('when execute responseRemoveGestorTdpService === false',fakeAsync(()=>{
    spyOn(Swal,'fire');
    component.ngOnInit();
    tick(3000);
    const response={
      condition:false,
      message:"hola"
    }
    component.responseRemoveGestorTdpService(response)
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execute addUserService',fakeAsync(()=>{
    const response= {
      condition:true,
      message:"success",
      errors:"bad request"
    }
    spyOn(component,'addUserService').and.callFake(()=>{
        return response;
    })
    let userService:RequestUserService;
    userService={ 
      id_emp:7695,
      id_serv:8,
      created_by:"7695",
      updated_by:"7695"
    };
    component.addUserService(userService);
    expect(component.addUserService).toHaveBeenCalled();
  }))
  it('when execute validateFormCompanyService',()=>{
    spyOn(Swal,'fire');
    let status:boolean=false;
    // ruc equals ''
    component.formAdmin.ruc.setValue("");
    fixture.detectChanges();
    status=component.validateFormCompanyService()
    expect(status).toEqual(true);
    expect(Swal.fire).toHaveBeenCalled();
    // companyName equals ''
    component.formAdmin.ruc.setValue("A");
    component.formAdmin.companyName.setValue("");
    status=component.validateFormCompanyService()
    expect(status).toEqual(true);
    expect(Swal.fire).toHaveBeenCalled();
    // serviceName equals ''
    component.formAdmin.ruc.setValue("A");
    component.formAdmin.companyName.setValue("B");
    component.formAdmin.serviceName.setValue("");
    status=component.validateFormCompanyService()
    expect(status).toEqual(true);
    expect(Swal.fire).toHaveBeenCalled();
    // contactName
    component.formAdmin.ruc.setValue("A");
    component.formAdmin.companyName.setValue("B");
    component.formAdmin.serviceName.setValue("C");
    component.formAdmin.contactName.setValue("");
    status=component.validateFormCompanyService()
    expect(status).toEqual(true);
    expect(Swal.fire).toHaveBeenCalled();
    // contactNumber
    component.formAdmin.ruc.setValue("A");
    component.formAdmin.companyName.setValue("B");
    component.formAdmin.serviceName.setValue("C");
    component.formAdmin.contactName.setValue("D");
    component.formAdmin.contactNumber.setValue("");
    status=component.validateFormCompanyService()
    expect(status).toEqual(true);
    expect(Swal.fire).toHaveBeenCalled();
    // input's different's ''
    component.formAdmin.ruc.setValue("A");
    component.formAdmin.companyName.setValue("B");
    component.formAdmin.serviceName.setValue("C");
    component.formAdmin.contactName.setValue("D")
    component.formAdmin.contactNumber.setValue("E");
    status=component.validateFormCompanyService()
    expect(status).toEqual(false);
  })

  it('when execute responseCreateCompanyService condition 1',fakeAsync(()=>{ 
    component.ngOnInit();
    spyOn(component,'responseCreateCompanyService').and.callThrough();
    spyOn(Swal,"fire").and.callThrough();
    let response:any={
      status:1,
      message:"success"
    }
    component.responseCreateCompanyService(response);
    expect(Swal.fire).toHaveBeenCalled();
    flush();

    component.responseThenSwal();
    component.user=user;
    tick(1000);
    flush();
    expect(component.formAdmin.formAction.value).toMatch("");

  }))
  it('when execute responseCreateCompanyService condition 0',fakeAsync(()=>{ 
    component.ngOnInit();
    spyOn(Swal,'fire');
    let response:any={
      status:0,
      message:"success"
    }
    component.responseCreateCompanyService(response);
    expect(Swal.fire).toHaveBeenCalled();
  }))
  it('when execute captureCompanyObject',()=>{
    let company:RequestCompany=component.captureCompanyObject();
    expect(company.ruc).toMatch("");
    expect(company.alias).toMatch("");
    expect(company.name).toMatch("");
    expect(company.activity).toMatch("");
  })

  it('when execute captureServiceObject',()=>{
    let service:RequestService=component.captureServiceObject();
    expect(service.id_company).toEqual(0);
    expect(service.name).toMatch("");
    expect(service.description).toMatch("");
    expect(service.contactname).toMatch("");
    expect(service.contactmail).toMatch("");
    expect(service.contactnumber).toMatch("");
  })
  it('when execute createCompanyService',fakeAsync(()=>{
    spyOn(component,'createCompanyService').and.callThrough();
    spyOn(component.manager,'createCompanyService').and.callThrough();
    fixture.detectChanges();
    component.ngOnInit();
    component.formAdmin.ruc.setValue("A");
    component.formAdmin.companyName.setValue("B");
    component.formAdmin.serviceName.setValue("C");
    component.formAdmin.contactName.setValue("D")
    component.formAdmin.contactNumber.setValue("E");
    tick(2000);
    component.createCompanyService();
    
  }))
  it('when execute asignManagerGestor',fakeAsync(()=>{
    let spy=spyOn(component,'asignManagerGestor').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    const response={
      id:6
    };
    component.asignManagerGestor(response);
    expect(spy).toHaveBeenCalled();
    flush();
  }))
  it('when execute responseAsignManagerGestor',fakeAsync(()=>{
    spyOn(component,'addUserService');
    const response={ 
      condition:1,
      employee:{
        id:2
      }
    }
    component.responseAsignManagerGestor(response,6,user);
    expect(component.addUserService).toHaveBeenCalled();
  }))
  it('when execute previusForm',()=>{
    component.previousForm();
    expect(component.formCondition).toEqual(false);

  })
  it('when execute responseAsignManager',fakeAsync(()=>{
    const final={
      condition:1,
          employee:{
            id:2
          },
          result:true,
          mail:"josue180610@hotmail.com"
    }
    const object={
      company_name: "Jira xtreme RPG",
      contact: "j - josue180610@hotmail.com",
      createdBy: 2955,
      id: 30,
      idManager: 534,
      managerMail: "i201715100@cibertec.edu.pe",
      ruc: "5587459987856574",
      service: "NutriBell",
      status: true
    }
    let lstCompaniesAuex=[]
    lstCompaniesAuex.push(object);
    component.ngOnInit();
    component.lstCompanies=lstCompaniesAuex;
    tick(3000);
    component.responseAsignManager(final,user);
  }))
  it('when execute asignManager',fakeAsync(()=>{
    spyOn(dialog,'open').and.callThrough();
    const final={
      condition:1,
          employee:{
            id:2
          },
          result:true,
          mail:"josue180610@hotmail.com"
    }
    const object={
      company_name: "Jira xtreme RPG",
      contact: "j - josue180610@hotmail.com",
      createdBy: 2955,
      id: 30,
      idManager: 534,
      managerMail: "i201715100@cibertec.edu.pe",
      ruc: "5587459987856574",
      service: "NutriBell",
      status: true
    }
    let lstCompaniesAuex=[]
    lstCompaniesAuex.push(object);
    component.ngOnInit();
    component.lstCompanies=lstCompaniesAuex;    
    tick(3000);
    component.asignManager({
      id:1,
      name:"any"
    })
    expect(dialog.open).toHaveBeenCalled();
    
  }))
});
