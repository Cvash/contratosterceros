import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMainUser } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';

import { ModalQuestionDeteleComponent } from './modal-question-detele.component';

describe('ModalQuestionDeteleComponent', () => {
  let component: ModalQuestionDeteleComponent;
  let fixture: ComponentFixture<ModalQuestionDeteleComponent>;
  let user:IMainUser;
  let dialogRefMock = {
    close: ()=>{} ,
    afterClosed: ()=>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalQuestionDeteleComponent ],
      imports:[MatDialogModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
      {
        provide:MatDialogRef,useValue:dialogRefMock
      }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalQuestionDeteleComponent);
    component = fixture.componentInstance;
   
  });
  beforeEach(()=>{ 
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
  })
  afterEach(()=>{ 
    localStorage.removeItem("user");
  })
  it('when created component',()=>{
    expect(component).toBeTruthy();
  })
  it('when init variable',()=>{
    expect(component.supplierName).toMatch("");
    expect(component.serviceName).toMatch("");
    expect(component.gestorName).toMatch("");
    expect(component.serviceId.length).toEqual(0);
    expect(component.suppliersCompanyService.length).toEqual(0);
    expect(component.messageCondition).toMatch("");
    expect(component.typeAction).toMatch("");
    expect(component.conditionService).toEqual(false);
    expect(component.arrayServiceValue.length).toEqual(0);
  })

  it('when execute initNgOnInit',()=>{ 
    const value = [ 
      {
        id: "29",
        name: "Validators Dog Xtreme"
      },
      {
        id: "30",
        name: "NutriBell"
      }
    ]
    const data= {
      serviceOption:value,
      suppName:"sdfs",
      gestorName:"asdas",
      typeAct:"D",
      idService:2
    }
    component.data=data;
    fixture.detectChanges();
    component.initNgOnInit(data);
    expect(component.conditionService).toEqual(true);
    component.ngOnInit();
  })

  it('when execute getValues selected true',()=>{
    const value={
      isUserInput:true,
      source:{
        value:1,
        selected:true
      }
    }
    component.getValues(value);
    expect(component.arrayServiceValue.length).toEqual(1);
  })

  it('when execute getValues selected false',()=>{
    const value={
      isUserInput:true,
      source:{
        value:1,
        selected:true
      }
    }
    component.getValues(value);
    const value2={
      isUserInput:true,
      source:{
        value:1,
        selected:false
      }
    }
    component.getValues(value2);
    expect(component.arrayServiceValue.length).toEqual(0);
  })
  
  it('when execute deleteSupplier serviceId === 0',fakeAsync(()=>{
    spyOn(Swal,'fire');
    let arrayIdService:Array<any>=[];
    component.supplierForm.serviceId.setValidators(arrayIdService);
    component.deleteSupplier("D");
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execure requestDeleteSupplier',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    component.requestDeleteSupplier(2,"D");
    expect(component.dialogRef.close).toHaveBeenCalled();

  }))
  it('when execute onNoClick',()=>{
    spyOn(component.dialogRef,'close');
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  })

  it('when execute selectAll',fakeAsync(()=>{
    const value = [ 
      {
        id: "29",
        name: "Validators Dog Xtreme"
      },
      {
        id: "30",
        name: "NutriBell"
      }
    ]
    const data= {
      serviceOption:value,
      suppName:"sdfs",
      gestorName:"asdas",
      typeAct:"D",
      idService:2
    }
    component.data=data;
    fixture.detectChanges();
    component.initNgOnInit(data);
    tick(3000);
    component.selectAll();
    expect(component.serviceId.length).toEqual(2);
  }))
});
