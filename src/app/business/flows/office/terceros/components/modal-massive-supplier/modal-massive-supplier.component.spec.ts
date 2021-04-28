import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMainUser } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { IRequestAddSupplier, IRequestPostAddSupplier } from '../../models/RequestSupplier';

import { ModalMassiveSupplierComponent } from './modal-massive-supplier.component';

describe('ModalMassiveSupplierComponent', () => {
  let component: ModalMassiveSupplierComponent;
  let fixture: ComponentFixture<ModalMassiveSupplierComponent>;
  let user:IMainUser;
  let dialogRefMock = {
    close: ()=>{} ,
    afterClosed: ()=>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMassiveSupplierComponent ],
      imports : [HttpClientTestingModule,MatDialogModule],
      providers:[
        DatePipe,
        { 
          provide:MAT_DIALOG_DATA,
          useValue:{}
        },
        {
          provide:MatDialogRef,
          useValue:dialogRefMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMassiveSupplierComponent);
    component = fixture.componentInstance;
   
  });
  beforeEach(()=>{ 
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
  })
  afterEach(()=>{ 
    localStorage.removeItem("user");
  })
  // error al testear unreachable
  it('when created component',()=>{
    expect(component).toBeTruthy();
  })
  it('when init variable',()=>{ 
    expect(component.blockUI).not.toEqual(null);
    expect(component.result).toEqual(false);
    expect(component.companyId).toEqual(null);
    expect(component.user).toEqual(null);
    expect(component.SHEET_NAME).toMatch("Hoja1");
    expect(component.hojaDatos.length).toEqual(0);
    expect(component.errors.length).toEqual(0);
    expect(component.inputfileExcel).not.toEqual(null);
    expect(component.suppliersCompanyService.length).toEqual(0);
    expect(component.conditionService).toEqual(false);
    expect(component.serviceId).toEqual(null);
  })
  it('when execute initNgOnInit',()=>{
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
      idService: 1
  }
  component.initNgOnInit(data);
  expect(component.user.id).toMatch("2955");
  expect(component.conditionService).toEqual(true);
  })
  it('when execute validateSaveCorrects 0',()=>{
    spyOn(Swal,'fire');
    let status:boolean=null;
    status=component.validateSaveCorrects(0);
    expect(status).toEqual(false);
  })
  it('when execute validateSaveCorrects 1',()=>{
    spyOn(Swal,'fire');
    let status:boolean=null;
    status=component.validateSaveCorrects(1);
    expect(status).toEqual(true);
  })
  it('when execute captureValueSaveCorrects',fakeAsync(()=>{
    let supp:IRequestPostAddSupplier;
    let suppValue:IRequestAddSupplier;
    let arraySupp:Array<IRequestPostAddSupplier>=[];
    suppValue={ 
      name:"hola",
      lastName1:"hola2",
      lastName2:"hola3",
      nationalId:"98748293",
      codeCompany:"fs",
      idCompany:6,
      mail:"josue180610@hotmail.com",
      birthdate:"2020-11-11",
      gender:"M",
      activity:"asfd"
    }
    supp={
      supplier:suppValue,
      user_id:"2955",
      type:"mng",
      typeAction:"d"
    }
    component.hojaDatos.push(suppValue);
    tick(3000);
    arraySupp=component.captureValueSaveCorrects("2955");
    expect(arraySupp.length).toEqual(1);
  }))
  it('when execute responseFindByNationalId status 1',fakeAsync(()=>{
    let spy=spyOn(component,'saveMassiveSupplier').and.callThrough();
    let supp:IRequestPostAddSupplier;
    let suppValue:IRequestAddSupplier;
    let arraySupp:Array<IRequestPostAddSupplier>=[];
    suppValue={ 
      name:"hola",
      lastName1:"hola2",
      lastName2:"hola3",
      nationalId:"98748293",
      codeCompany:"fs",
      idCompany:6,
      mail:"josue180610@hotmail.com",
      birthdate:"2020-11-11",
      gender:"M",
      activity:"asfd"
    }
    supp={
      supplier:suppValue,
      user_id:"2955",
      type:"mng",
      typeAction:"d"
    }
    arraySupp.push(supp);
    let find:any;
    find={
      status:1,
      message:"success"
    };
    component.responseFindByNationalId(find,arraySupp);
    expect(spy).toHaveBeenCalled();
  }))
  it('when execute responseFindByNationalId status 1',fakeAsync(()=>{
    spyOn(Swal,'fire');
    let arraySupp:Array<IRequestPostAddSupplier>=[];
    let find:any;
    find={
      status:0,
      errors:"success"
    };
    component.responseFindByNationalId(find,arraySupp);
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execute showAlertCondition',fakeAsync(()=>{
    spyOn(Swal,'fire');
    component.showAlertCondition("error","bab request");
    expect(Swal.fire).toHaveBeenCalled();
  }))
  
  it('when execute responseSaveMassiveSupplier status 1',fakeAsync(()=>{ 
    spyOn(Swal,'fire');
    spyOn(component.dialogRef,'close');
    const value= {
      status:1,
      message:"success"
    };
    component.responseSaveMassiveSupplier(value);
    expect(Swal.fire).toHaveBeenCalled();
    expect(component.result).toEqual(true);
    expect(component.dialogRef.close).toHaveBeenCalled();
    flush();
  }))
  it('when execute responseSaveMassiveSupplier status 0',fakeAsync(()=>{ 
    spyOn(component.dialogRef,'close');
    spyOn(Swal,'fire');
    const value= {
      status:0,
      errors:"bad request"
    };
    component.responseSaveMassiveSupplier(value);
    expect(Swal.fire).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
    flush();
  }))
  it('when execute onFileChange',fakeAsync(()=>{ 
    spyOn(component,'onFileChange').and.callThrough();
    const value= {
      target: {
          files: [new Blob(['ssdfsdgdjghdslkjghdjg'], { type: 'pdf' })]
      }
    };

    component.onFileChange(value);
    expect(component.onFileChange).toHaveBeenCalled();
  }))
  it('when execute showAlertFileChange',fakeAsync(()=>{
    spyOn(Swal,'fire');
    component.showAlertFileChange("error","GG","GG");
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execute onNoClick',fakeAsync(()=>{ 
    spyOn(component.dialogRef,'close');
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  }))

  it('when execute ngOnInit',()=>{
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
      idService: 1
  }
  component.data=data;
  fixture.detectChanges();
  component.ngOnInit();
  })

  it('when execute ExcelDateToJSDate',()=>{
    const dateNum=5454444;
    let date:any=component.ExcelDateToJSDate(dateNum);
    expect(date).not.toEqual(null);
  })

  it('when execute validateSizeEquals',fakeAsync(()=>{
    spyOn(Swal,'fire');
    let array:Array<any>=[]
    component.validateSizeEquals(array);
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execute validateSheetValue',()=>{
    const jsonData=[
      {
        DNI:"730782",
        CORREO:"ASDA",
        NOMBRE:"ASDASDA",
        APELLIDO1:"ASAFGB,",
        APELLIDO2:"asdasd",
        GENERO:"M",
        NACIMIENTO:"ASDAS"
      }
    ]
    component.validateSheetValue(jsonData);
    expect(component.errors.length).toEqual(1);
    
    const jsonData2=[
      {
        DNI:"73078273",
        CORREO:false,
        NOMBRE:"ASDASDA",
        APELLIDO1:"ASAFGB,",
        APELLIDO2:"asdasd",
        GENERO:"M",
        NACIMIENTO:"ASDAS"
      }
    ]
    component.validateSheetValue(jsonData2);
    expect(component.errors.length).toEqual(2);

    const jsonData3=[
      {
        DNI:"73078273",
        CORREO:true,
        NOMBRE:false,
        APELLIDO1:"ASAFGB,",
        APELLIDO2:"asdasd",
        GENERO:"M",
        NACIMIENTO:"ASDAS"
      }
    ]
    component.validateSheetValue(jsonData3);
    expect(component.errors.length).toEqual(3);

    const jsonData4=[
      {
        DNI:"73078273",
        CORREO:true,
        NOMBRE:true,
        APELLIDO1:false,
        APELLIDO2:"asdasd",
        GENERO:"M",
        NACIMIENTO:"ASDAS"
      }
    ]
    component.validateSheetValue(jsonData4);
    expect(component.errors.length).toEqual(4);

    const jsonData5=[
      {
        DNI:"73078273",
        CORREO:true,
        NOMBRE:true,
        APELLIDO1:true,
        APELLIDO2:true,
        GENERO:"OK",
        NACIMIENTO:"ASDAS"
      }
    ]
    component.validateSheetValue(jsonData5);
    expect(component.errors.length).toEqual(5);

    const jsonData6=[
      {
        DNI:"73078273",
        CORREO:true,
        NOMBRE:true,
        APELLIDO1:true,
        APELLIDO2:true,
        GENERO:"M",
        NACIMIENTO:"ASDAS"
      }
    ]
    component.validateSheetValue(jsonData6);
    expect(component.errors.length).toEqual(6);

    const jsonData7=[
      {
        DNI:"73078273",
        CORREO:true,
        NOMBRE:true,
        APELLIDO1:true,
        APELLIDO2:true,
        GENERO:"M",
        NACIMIENTO:52552
      }
    ]
    component.validateSheetValue(jsonData7);
    expect(component.hojaDatos.length).toEqual(1);
  })
});
