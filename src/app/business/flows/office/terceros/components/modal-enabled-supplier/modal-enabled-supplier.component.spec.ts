import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMainUser } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { IResponseManagementSupplier } from '../../models/ResponseSupplier';
import { SupplierEnabledService } from '../../services/supplier-enabled.service';
import { MockSwal } from '../supplier-report-symp/supplier-report-symp.component.spec';

import { ModalEnabledSupplierComponent } from './modal-enabled-supplier.component';

describe('ModalEnabledSupplierComponent', () => {
  let component: ModalEnabledSupplierComponent;
  let fixture: ComponentFixture<ModalEnabledSupplierComponent>;
  let user:IMainUser;
  let service;
  const dialogMock = {
		close: () => { }
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEnabledSupplierComponent ],
      imports:[MatDialogModule,HttpClientTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue:dialogMock},
        SupplierEnabledService,
        {provide:Swal,useClass:MockSwal}
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEnabledSupplierComponent);
    component = fixture.componentInstance;
    service=fixture.debugElement.injector.get(SupplierEnabledService);
  });
  beforeEach(()=>{ 
    service=TestBed.inject(SupplierEnabledService);
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
    spyOn(component.dialogRef,'close').and.callThrough();
    
  })
  afterEach(()=>{ 
    localStorage.removeItem("user");
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when init variable enabled component',()=>{
    expect(component.document).toMatch("");
    expect(component.blockUI).not.toEqual(null);
    expect(component.filename).toContain("No se seleccionó");
    expect(component.checkbox).toEqual(false);
    expect(component.fileloaded).toEqual(false);
    component.data={
      activity:"..",
      birthdate:"2000-11-11",
      codeCompany:"--",
      gender:"M",
      lastName1:"ho",
      lastName2:"la",
      mail:"josue180610@hotmail.com",
      name:"josue",
      nationalId:"25898878",
      coronaStatus:1,
      statusDetail:"..",
      
        }
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.supplier).not.toEqual(null);
    expect(component.supplier.mail).toContain("josue180610");
    expect(component.user).not.toEqual(null);
    expect(component.inputAttachFile).not.toEqual(null);
  })
  it('when execute closeDialog',()=>{
    component.closeDialog();
    expect(component.dialogRef.close).toHaveBeenCalled();
  })

  it('when execute initData',()=>{
    let data:IResponseManagementSupplier;
    data={
      activity:"..",
      birthdate:"2000-11-11",
      codeCompany:"--",
      gender:"M",
      lastName1:"ho",
      lastName2:"la",
      mail:"josue180610@hotmail.com",
      name:"josue",
      nationalId:"25898878",
      coronaStatus:1,
      statusDetail:"..",
      
        }
    component.initData(data);
    expect(component.user).not.toEqual(null);

  })
  it('when execute showAlertByCondition',()=>{
    spyOn(Swal,'fire');
    component.showAlertByCondition("error","No lo se rick");
    expect(Swal.fire).toHaveBeenCalled();
  })

  it('when execute sendRequest check true fileLoad true',async(()=>{
    let data:IResponseManagementSupplier;
    data={
      activity:"..",
      birthdate:"2000-11-11",
      codeCompany:"--",
      gender:"M",
      lastName1:"ho",
      lastName2:"la",
      mail:"josue180610@hotmail.com",
      name:"josue",
      nationalId:"25898878",
      coronaStatus:1,
      statusDetail:"..",
      
        }
    component.initData(data);
    fixture.detectChanges();
    let rpt:boolean=component.validateAccept(true,true);
    fixture.whenStable().then(()=>{
      expect(rpt).toEqual(true);
    });
    
  }))
 it('when execute sendRequest check false fileLoad true',fakeAsync(()=>{
  let data:IResponseManagementSupplier;
  data={
    activity:"..",
    birthdate:"2000-11-11",
    codeCompany:"--",
    gender:"M",
    lastName1:"ho",
    lastName2:"la",
    mail:"josue180610@hotmail.com",
    name:"josue",
    nationalId:"25898878",
    coronaStatus:1,
    statusDetail:"..",
    
      }
  component.initData(data);
  component.supplierForm.checkbox.setValue(false);
  component.fileloaded=true;
  tick(3000);
  expect(component.supplierForm.checkbox.value).toEqual(false);
  let rpt:boolean=component.validateAccept(false,true);
  expect(rpt).toEqual(false);
  flush();
  
}))
it('when execute sendRequest check true fileLoad false',fakeAsync(()=>{
  let data:IResponseManagementSupplier;
  data={
    activity:"..",
    birthdate:"2000-11-11",
    codeCompany:"--",
    gender:"M",
    lastName1:"ho",
    lastName2:"la",
    mail:"josue180610@hotmail.com",
    name:"josue",
    nationalId:"25898878",
    coronaStatus:1,
    statusDetail:"..",
    
      }
  component.initData(data);
  tick(3000);
  let rpt:boolean=component.validateAccept(true,false);
  expect(rpt).toEqual(false);
  flush();
  
}))
it('when exeucte responseSendRequest value = 1',()=>{
  spyOn(Swal,'fire');
  let value:{
    status:string;
  }
  value={
    status:"1"
  };
  component.responseSendRequest(value);
  expect(Swal.fire).toHaveBeenCalled();


})
it('when exeucte responseSendRequest value = 0',()=>{
  spyOn(Swal,'fire');
  let value:{
    status:string;
  }
  value={
    status:"0"
  };
  component.responseSendRequest(value);
  expect(Swal.fire).toHaveBeenCalled();
  expect(component.dialogRef.close).toHaveBeenCalled();

})
it('when execute  showAlertByCondition',()=>{
  spyOn(Swal,'fire');
  component.showAlertByCondition("success","hola");
  expect(Swal.fire).toHaveBeenCalled();
})

it('when execute attach file',fakeAsync(()=>{
  // pasos para testear un FileReaser
  /*
    1. definir objeto file, en donde cada elemento del archivo debe de estar paseado al tipo Blob.
    2. crear un spyOn del metodo que utilizara el FileReader
    3. llamar al metodo, dando como valor del parametro el mock definido al inicio
    4. al final mediante un expect volver a llamar el metodo pero sin parametro y verificar si se realizo la llamada al metodo
    mediante el toHaveBeenCalled();
  */
  const value= {
    target: {
        files: [new Blob(['ssdfsdgdjghdslkjghdjg'], { type: 'pdf' })]
    }
};
  spyOn(component,'attachFileChange').and.callThrough();
  component.attachFileChange(value);
  expect(component.attachFileChange).toHaveBeenCalled(); 

}))

/* it('when execute nativeElement addEvent Click',async(()=>{
  let spy=spyOn(component,'clickAttachFile').and.callThrough();
  let button = fixture.debugElement.nativeElement.querySelector('button');
  button.click();
  component.clickAttachFile()
  fixture.whenStable().then(()=>{
  expect(component.clickAttachFile).toHaveBeenCalled();
  })
})) */
});
