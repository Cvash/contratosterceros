import { DatePipe } from '@angular/common';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlockUIModule } from 'ng-block-ui';
import { IMainUser } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { IRequestAddNewSupplier } from '../../models/RequestSupplier';
import { SupplierManagerService } from '../../services/supplier-manager.service';
import { MockSwal } from '../supplier-report-symp/supplier-report-symp.component.spec';

import { ModalAddNewSupplierComponent } from './modal-add-new-supplier.component';

describe('ModalAddNewSupplierComponent', () => {
  let component: ModalAddNewSupplierComponent;
  let fixture: ComponentFixture<ModalAddNewSupplierComponent>;
  let user:IMainUser;
  const mockService = jasmine.createSpyObj("SupplierManagerService"
  ,["searchSupplierDocument","addNewSupplier","editNewSupplier"]);
  const dialogRefMock = {
    close: ()=>{} ,
    afterClosed: ()=>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddNewSupplierComponent ],
      imports:[BlockUIModule],
      providers:[
        DatePipe,
        {
          provide:MAT_DIALOG_DATA,
          useValue:{}
        },
        {
          provide:MatDialogRef,
          useValue:dialogRefMock
        },
        {
          provide:SupplierManagerService,
          useValue:mockService 
        },
        {
          provide:Swal,
          useClass:MockSwal
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(()=>{ 
    fixture = TestBed.createComponent(ModalAddNewSupplierComponent);
    component = fixture.componentInstance;
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
  })
  afterEach(()=>{ 
    localStorage.removeItem("user");
  })
  it('when created component',()=>{
    expect(component).toBeTruthy();
  })
  it('when init variable',fakeAsync(()=>{
    const data ={ 
        idCompany: 6,
        supplier: null,
        supplierOption: [],
        conditionEdit: false,
        actionForm: "S",
        idService: 6
    }
    component.data=data;
    component.initData(data);
    tick(2000);
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.blockUI).not.toEqual(null);
    expect(component.company).toEqual(null);
    expect(component.supplier).not.toEqual(null);
    expect(component.user).toEqual(null);
    expect(component.formCondition).toEqual(false);
    expect(component.messageCondition).toMatch('');
    expect(component.showMessageCondition).toEqual(false);
    expect(component.create).toEqual(true);
    expect(component.result).toEqual(false);
    expect(component.companyId).toEqual(6);
    expect(component.submitText).toContain("Crear");
    expect(component.titleForm).toContain("Registrar");
    expect(component.supplierId).toEqual(0);
    expect(component.suppliersCompanyService.length).toEqual(0);
    expect(component.disabledCondition).toEqual(false);
    expect(component.serviceId).toEqual(null);
    expect(component.actionForm).toMatch('');
    expect(component.edit).toEqual(true);
    expect(component.conditionService).toEqual(true);
  }))

  it('when init variable actionForm E',fakeAsync(()=>{
    const data ={ 
        idCompany: 6,
        supplier: null,
        supplierOption: [],
        conditionEdit: false,
        actionForm: "E",
        idService: 6
    }
    component.data=data;
    component.initData(data);
    tick(2000);
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.companyId).not.toEqual(null);
  }))

  it('when execute capturedataEdit',()=>{
    component.capturedataEdit();
    expect(component.supplierForm.nationalId.value).toMatch("");
  })

  
  it('when execute loadOnInit',fakeAsync(()=>{ 
    const data ={ 
      idCompany: 6,
      supplier: null,
      supplierOption: [],
      conditionEdit: false,
      actionForm: "E",
      idService: 0
  }
  component.initData(data);
  tick(2000);
  component.loadOnInit(data,"E");
  tick(2000);
  expect(component.submitText).toContain("cambios");
  }))

  it('when execute resetFormSupplier',()=>{
    component.resetFormSupplier();
    expect(component.disabledCondition).toEqual(false);
    expect(component.supplierForm.nationalId.value).toMatch("");
    expect(component.supplierForm.name.value).toMatch("");
    expect(component.supplierForm.lastName1.value).toMatch("");
    expect(component.supplierForm.lastName2.value).toMatch("");
    expect(component.supplierForm.codeCompany.value).toMatch("");
    expect(component.supplierForm.mail.value).toMatch("");
    expect(component.supplierForm.birthDate.value).toMatch("");
    expect(component.supplierForm.gender.value).toMatch("");
    expect(component.supplierForm.activity.value).toMatch("");
    expect(component.supplierForm.serviceId.value).toEqual(0);
  })
  it('when execute showSweetAlertCondition',()=>{ 
    spyOn(Swal,'fire');
    component.showSweetAlertCondition("success","Lo consegui");
    expect(Swal.fire).toHaveBeenCalled();
  })
  it('when execute validateSupplierDocument nationalId is not empty',()=>{
    let status:boolean=false;
    status=component.validateSupplierDocument("73078273");
    expect(status).toEqual(true);
  })
  it('when execute validateSupplierDocument nationalId is empty',()=>{
    let status:boolean=false;
    status=component.validateSupplierDocument("");
    expect(status).toEqual(false);
  })

  it('when execute nextForm actionFrom = S',fakeAsync(()=>{
    spyOn(component,'searchSupplierByDocument').and.callThrough();
    const data ={ 
      idCompany: 6,
      supplier: null,
      supplierOption: [{
        created_at: "2020-12-14T14:41:16",
        id: 30,
        name: "NutriBell",
        status: true,
        updated_at: "2020-12-14T14:41:43"
      }],
      conditionEdit: false,
      actionForm: "S",
      idService: 0
  }
  component.initData(data);
  tick(2000);
  component.supplierForm.serviceId.setValue(30);
  component.nextForm("S");
  expect(component.supplierForm.serviceId.value).toEqual(30);
  flush();
  }))

  it('when execute nextForm actionFrom = E',fakeAsync(()=>{
    spyOn(component,'searchSupplierByDocument').and.callThrough();
  component.nextForm("E");
  expect(component.supplierForm.serviceId.value).toEqual(0)
  flush();
  }))
  it('when execute responseSearchSupplier actionForm E',()=>{
    const supp={
      condition:true,
      message:"HOLA",
      supp:{
        activity: "",
        birthdate: null,
        codeCompany: "",
        coronaStatus: 1,
        created_at: "2020-12-14T15:25:32",
        flag_new: 0,
        gender: "",
        id: 539,
        lastName1: "NutriBell03",
        lastName2: "NutriBell03",
        mail: "josue180610@hotmail.com",
        name: "NutriBell03",
        nationalId: "52647896",
        status: true,
        statusDetail: null,
        updated_at: "2020-12-14T15:25:32"
      }
    }
    component.responseSearchSupplier(supp,"E");
    expect(component.supplierForm.name.value).toMatch("NutriBell03");
    expect(component.supplierForm.lastName1.value).toMatch("NutriBell03");
    expect(component.supplierForm.lastName2.value).toMatch("NutriBell03");
    expect(component.supplierForm.gender.value).toMatch("");

  })
  it('when execute responseSearchSupplier actionForm S',()=>{
    const supp={
      condition:true,
      message:"HOLA",
      supp:{
        activity: "",
        birthdate: null,
        codeCompany: "",
        coronaStatus: 1,
        created_at: "2020-12-14T15:25:32",
        flag_new: 0,
        gender: "",
        id: 539,
        lastName1: "NutriBell03",
        lastName2: "NutriBell03",
        mail: "josue180610@hotmail.com",
        name: "NutriBell03",
        nationalId: "52647896",
        status: true,
        statusDetail: null,
        updated_at: "2020-12-14T15:25:32"
      }
    }
    component.responseSearchSupplier(supp,"S");
    expect(component.supplierForm.name.value).toMatch("NutriBell03");
    expect(component.supplierForm.lastName1.value).toMatch("NutriBell03");
    expect(component.supplierForm.lastName2.value).toMatch("NutriBell03");
    expect(component.supplierForm.gender.value).toMatch("");

  })

  it('when execute responseSearchSupplier condition false message empty actionForm enpty',()=>{
    const supp={
      condition:false,
      message:"",
      supp:null
    }
    component.responseSearchSupplier(supp,"");
    expect(component.formCondition).toEqual(true);
  })
  it('when execute responseSearchSupplier condition false message not empty actionForm empty',()=>{
    const supp={
      condition:false,
      message:"HOLA",
      supp:null
    }
    component.responseSearchSupplier(supp,"");
    expect(component.showMessageCondition).toEqual(true);
  })
  it('when execute validateAddSupplier case nationalId',()=>{
    let suprev: IRequestAddNewSupplier;
    suprev={
      name:"..",
      lastName1:"--",
      lastName2:"-.-.",
      nationalId:"",
      codeCompany:"fs",
      idCompany:0,
      mail:"josue180610@hotmail.com",
      birthdate:"",
      gender:"M",
      activity:"ff",
      coronaStatus:1,
      statusDetail:".."
    }
    
    const json:{
      message:string,
      condition:boolean
    }=component.validateAddSupplier(suprev);
    expect(json.condition).toEqual(false);
  })
  it('when execute validateAddSupplier case name',()=>{
    let suprev: IRequestAddNewSupplier;
    suprev={
      name:"",
      lastName1:"--",
      lastName2:"-.-.",
      nationalId:"85856698",
      codeCompany:"fs",
      idCompany:0,
      mail:"josue180610@hotmail.com",
      birthdate:"",
      gender:"M",
      activity:"ff",
      coronaStatus:1,
      statusDetail:".."
    }
    const json:{
      message:string,
      condition:boolean
    }=component.validateAddSupplier(suprev);
    expect(json.condition).toEqual(false);
  })
  it('when execute validateAddSupplier case lastName1',()=>{
    let suprev: IRequestAddNewSupplier;
    suprev={
      name:"sdfsd",
      lastName1:"",
      lastName2:"-.-.",
      nationalId:"85856698",
      codeCompany:"fs",
      idCompany:0,
      mail:"josue180610@hotmail.com",
      birthdate:"",
      gender:"M",
      activity:"ff",
      coronaStatus:1,
      statusDetail:".."
    }
    const json:{
      message:string,
      condition:boolean
    }=component.validateAddSupplier(suprev);
    expect(json.condition).toEqual(false);
  })
  it('when execute validateAddSupplier case lastName2',()=>{
    let suprev: IRequestAddNewSupplier;
    suprev={
      name:"sdfsd",
      lastName1:"asdad",
      lastName2:"",
      nationalId:"85856698",
      codeCompany:"fs",
      idCompany:0,
      mail:"josue180610@hotmail.com",
      birthdate:"",
      gender:"M",
      activity:"ff",
      coronaStatus:1,
      statusDetail:".."
    }
    const json:{
      message:string,
      condition:boolean
    }=component.validateAddSupplier(suprev);
    expect(json.condition).toEqual(false);
    expect(json.message).toContain("materno");
  })
  it('when execute validateAddSupplier case mail',()=>{
    let suprev: IRequestAddNewSupplier;
    suprev={
      name:"sdfsd",
      lastName1:"asdad",
      lastName2:"asdaw",
      nationalId:"85856698",
      codeCompany:"fs",
      idCompany:0,
      mail:"",
      birthdate:"",
      gender:"M",
      activity:"ff",
      coronaStatus:1,
      statusDetail:".."
    }
    const json:{
      message:string,
      condition:boolean
    }=component.validateAddSupplier(suprev);
    expect(json.condition).toEqual(false);
    expect(json.message).toContain("correo");
  })
  it('when execute captureNewSupplier',()=>{
    let request:IRequestAddNewSupplier;
    request=component.captureNewSupplier(6);
    expect(request).toBeTruthy();
    expect(request).not.toEqual(null);
    expect(request.coronaStatus).toEqual(1);
    expect(request.statusDetail).toMatch('');
  })
  it('when execute responseAddNewSupplier status 1',()=>{
    const value = {
      status:1,
      errors:".."
    }
    component.responseAddNewSupplier(value,"Success");
    expect(component.result).toEqual(true);
  })
  it('when execute responseAddNewSupplier status 0',()=>{
    spyOn(component.dialogRef,'close');
    const value = {
      status:0,
      errors:"bad request"
    }
    component.responseAddNewSupplier(value,"Error");
    expect(component.dialogRef.close).toHaveBeenCalled();
  })
  it('when execute closeModal',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    component.closeModal(); 
    expect(component.dialogRef.close).toHaveBeenCalled();
  }))
  it('when execute previousForm',()=>{
    component.previousForm();
    expect(component.formCondition).toEqual(false);
  })
});
