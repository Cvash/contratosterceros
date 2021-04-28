import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IMainUser } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { IRequestAddSupplier } from '../../models/RequestSupplier';

import { ModalAddManagerSupplierComponent } from './modal-add-manager-supplier.component';
export class mockSwal{
  fire(){
    return {
      then:()=>of({
        
      })
    }
  }
}
describe('ModalAddManagerSupplierComponent', () => {
  let component: ModalAddManagerSupplierComponent;
  let fixture: ComponentFixture<ModalAddManagerSupplierComponent>;
  let user:IMainUser;
  const dialogRefMock = {
    close: ()=>{} ,
    afterClosed: ()=>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddManagerSupplierComponent ],
      imports:[HttpClientTestingModule],
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
          provide:Swal,
          useClass:mockSwal
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(()=>{ 
    fixture=TestBed.createComponent(ModalAddManagerSupplierComponent);
    component=fixture.componentInstance;
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
  })
  afterEach(()=>{ 
    localStorage.removeItem("user");
  })
  it('when created component',()=>{
    expect(component).toBeTruthy();
  })
  it('when exeucte validateSupplierDocument',fakeAsync(()=>{
    spyOn(Swal,'fire');
    let status:boolean=false;
    status=component.validateSupplierDocument("73078273");
    expect(status).toEqual(true);

    status=component.validateSupplierDocument("");
    expect(status).toEqual(false);
    expect(Swal.fire).toHaveBeenCalled();
  }))
  it('when init variable',()=>{
    expect(component.result).toEqual(false);
    expect(component.blockUI).not.toBeUndefined();
    expect(component.company).toEqual(null);
    expect(component.user).toEqual(null);
    expect(component.supplier.name).toMatch("");
    expect(component.supplier.lastName1).toMatch("");
    expect(component.supplier.lastName2).toMatch("");
    expect(component.supplier.nationalId).toMatch("");
    expect(component.supplier.codeCompany).toMatch("");
    expect(component.supplier.idCompany).toEqual(0);
    expect(component.supplier.mail).toMatch("");
    expect(component.supplier.birthdate).toMatch("");
    expect(component.supplier.gender).toMatch("");
    expect(component.supplier.activity).toMatch("");

  })

  it('when execute ngOnInit',()=>{
    const data = {
      comp:{
        id:1,
        name:"xtreme xtreme",
        ruc:"DSDAWETGKAPRIEEE"
      }
    }
    component.dat=data;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.user.id).toMatch("2955");
    expect(component.company.id).toEqual(1);
    expect(component.disabledCondition).toEqual(false);
    expect(component.supplierForm.name.value).toMatch("");
  })
  it('when execute nextForm condition true',fakeAsync(()=>{
    spyOn(component,'nextForm').and.callThrough();
    component.supplierForm.nationalId.setValue("789555897")
    component.company={
      id:1
    }
    tick(3000);
    component.nextForm();
    const response={
      condition:true,
      supp:{
        name:"ejemplo",
        lastName1:"ejemplo2",
        lastName2:"ejemplo3",
        mail:"ejemplo4@hotmail.com",
        birthdate:null,
        gender:"M",
        activity:"ejemplo5",
        codeCompany:"das8875s"
      }
    }
    component.responseSearchSupplier(response);
    tick(3000);
    expect(component.disabledCondition).toEqual(true);
    expect(component.showMessageCondition).toEqual(false);
    expect(component.formCondition).toEqual(true);
    flush();
  }))

  it('when execute nextForm condition false message empty',fakeAsync(()=>{
    spyOn(component,'nextForm').and.callThrough();
    component.supplierForm.nationalId.setValue("789555897")
    component.company={
      id:1
    }
    tick(3000);
    component.nextForm();
    const response={
      condition:false,
      message:""
    }
    component.responseSearchSupplier(response);
    tick(3000);
    expect(component.formCondition).toEqual(true);
    flush();
  }))

  it('when execute nextForm condition false message is not empty',fakeAsync(()=>{
    spyOn(component,'nextForm').and.callThrough();
    component.supplierForm.nationalId.setValue("789555897")
    component.company={
      id:1
    }
    tick(3000);
    component.nextForm();
    const response={
      condition:false,
      message:"dasdas"
    }
    component.responseSearchSupplier(response);
    tick(3000);
    expect(component.showMessageCondition).toEqual(true);
    flush();
  }))

  it('when execute validateAddSupplier',fakeAsync(()=>{
    let suprev:IRequestAddSupplier;
    let response:{
      message:string;
      condition:boolean;
    }
    // case name
    suprev={
      name:"",
      lastName1:"okok",
      lastName2:"asdasd",
      nationalId:"98987854",
      codeCompany:"das6d4as4d65as46",
      idCompany:6,
      mail:"josue180610@hotmail.com",
      birthdate:null,
      gender:"M",
      activity:"No lo se rick"
    };
    
    response=component.validateAddSupplier(suprev);
    tick(1000);
    expect(response.condition).toEqual(false);
    expect(response.message).toMatch("Nombre");
    flush();
    // case lastName1
    suprev={
      name:"adasdas",
      lastName1:"",
      lastName2:"asdasd",
      nationalId:"98987854",
      codeCompany:"das6d4as4d65as46",
      idCompany:6,
      mail:"josue180610@hotmail.com",
      birthdate:null,
      gender:"M",
      activity:"No lo se rick"
    };
    
    response=component.validateAddSupplier(suprev);
    tick(1000);
    expect(response.condition).toEqual(false);
    expect(response.message).toMatch("Apellido paterno");
    flush();
    // case lastName2
    suprev={
      name:"adasdas",
      lastName1:"dasdaswq",
      lastName2:"",
      nationalId:"98987854",
      codeCompany:"das6d4as4d65as46",
      idCompany:6,
      mail:"josue180610@hotmail.com",
      birthdate:null,
      gender:"M",
      activity:"No lo se rick"
    };
    
    response=component.validateAddSupplier(suprev);
    tick(1000);
    expect(response.condition).toEqual(false);
    expect(response.message).toMatch("Apellido materno");
    flush();
    // case nationalId
    suprev={
      name:"adasdas",
      lastName1:"dasdaswq",
      lastName2:"dadwqqwq",
      nationalId:"",
      codeCompany:"das6d4as4d65as46",
      idCompany:6,
      mail:"josue180610@hotmail.com",
      birthdate:null,
      gender:"M",
      activity:"No lo se rick"
    };
    
    response=component.validateAddSupplier(suprev);
    tick(1000);
    expect(response.condition).toEqual(false);
    expect(response.message).toMatch("DNI");
    flush();
    // correo
    suprev={
      name:"adasdas",
      lastName1:"dasdaswq",
      lastName2:"dadasdas",
      nationalId:"98987854",
      codeCompany:"das6d4as4d65as46",
      idCompany:6,
      mail:"",
      birthdate:null,
      gender:"M",
      activity:"No lo se rick"
    };
    
    response=component.validateAddSupplier(suprev);
    tick(1000);
    expect(response.condition).toEqual(false);
    expect(response.message).toMatch("Correo");
    flush();
  }))

  it('when execute previousForm',()=>{
    component.previousForm();
    expect(component.supplierForm.name.value).toMatch("");
    expect(component.supplierForm.mail.value).toMatch("");
    expect(component.supplierForm.lastName1.value).toMatch("");
    expect(component.supplierForm.lastName2.value).toMatch("");
  })
  it('when execute closeDialog',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    component.closeDialog();
    expect(component.dialogRef.close).toHaveBeenCalled();
  }))
  it('when execute responseAddNewSupplier',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    spyOn(Swal,'fire');
    const response={
      status:1
    }
    component.responseAddNewSupplier(response);
    expect(component.dialogRef.close).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalled();
    const response2={
      status:0,
      errors:"bad request"
    }
    component.responseAddNewSupplier(response2);
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execute addNewSupplier',fakeAsync(()=>{
    let suprev:IRequestAddSupplier;
    /* let response:{
      message:string;
      condition:boolean;
    } */
    // case name
    const data = {
      comp:{
        id:1,
        name:"xtreme xtreme",
        ruc:"DSDAWETGKAPRIEEE"
      }
    }
    component.dat=data;
    suprev={
      name:"asdasdas",
      lastName1:"okok",
      lastName2:"asdasd",
      nationalId:"98987854",
      codeCompany:"das6d4as4d65as46",
      idCompany:6,
      mail:"josue180610@hotmail.com",
      birthdate:null,
      gender:"M",
      activity:"No lo se rick"
    };
    spyOn(component,'addNewSupplier').and.callThrough();
    spyOn(Swal,'fire');
    component.ngOnInit();
    tick(3000);
    component.addNewSupplier();
    const response={
      condition:true,
      message:"success"
    }
    component.addSubNewSupplier(response);
    tick(1000);
    const response2={
      condition:false,
      message:"bad request"
    }
    component.addSubNewSupplier(response2);
    expect(Swal.fire).toHaveBeenCalled();
  }))
});
