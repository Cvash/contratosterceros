import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMainUser } from '../../../../../../../app/business/models/IModel-module';

import { ModalShowManagerTdpComponent } from './modal-show-manager-tdp.component';

describe('ModalShowManagerTdpComponent', () => {
  let component: ModalShowManagerTdpComponent;
  let fixture: ComponentFixture<ModalShowManagerTdpComponent>;
  let user:IMainUser;
  const dialogRefMock={
    close:()=>{},
    afterClose:()=>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShowManagerTdpComponent ],
      providers:[{
        provide:MAT_DIALOG_DATA,
        useValue:{}
      },
    {
      provide:MatDialogRef,
      useValue:dialogRefMock
    }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShowManagerTdpComponent);
    component = fixture.componentInstance;
  });
  beforeEach(()=>{ 
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user))
  })
  afterEach(()=>{ 
    localStorage.removeItem("user");
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when init variable',()=>{
    expect(component.serviceName).toMatch("");
    expect(component.displayedColumns.length).toEqual(4);
    expect(component.dataSource).not.toBeUndefined();
    expect(component.paginator).not.toEqual(null);
    expect(component.arrayGestorTdp.length).toEqual(0);
    expect(component.body).toBeUndefined();
  })
  it('when execute loadData',()=>{
    const managerTdp=[{
      cip: "010749888",
      fullname: "JOAO JOSUE HERNANDEZ GODOY",
      id: 3027,
      national_id: "73078273"
    }]
    const data={
      gestorTdp:managerTdp
    }
    component.loadData(data);
    expect(component.arrayGestorTdp.length).toEqual(1);
  })
  it('when execute onClose',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    component.OnClose();
    expect(component.dialogRef.close).toHaveBeenCalled();
  }))
  it('when execute showGestorDataTdp',fakeAsync(()=>{
    const managerTdp=[{
      cip: "010749888",
      fullname: "JOAO JOSUE HERNANDEZ GODOY",
      id: 3027,
      national_id: "73078273"
    }]
    const data={
      gestorTdp:managerTdp
    }
    component.loadData(data);
    tick(3000);
    component.showGestorDataTdp(component.arrayGestorTdp)
    tick(3000);
    expect(component.dataSource).not.toEqual(null);
    flush();
  }))
  it('when execute disabledRoleTdpMng',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    const value="ANY";
    component.disabledRoleTdpMng(value);
    expect(component.dialogRef.close).toHaveBeenCalled();
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

  it('when execute ngOnInit',()=>{
    const managerTdp=[{
      cip: "010749888",
      fullname: "JOAO JOSUE HERNANDEZ GODOY",
      id: 3027,
      national_id: "73078273"
    }]
    const data={
      gestorTdp:managerTdp
    }
    component.data=data;
    fixture.detectChanges();
    component.ngOnInit();
    
  })
});
