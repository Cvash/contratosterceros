import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { IMainUser, IViewMain } from '../../../../../../../app/business/models/IModel-module';
import Swal from 'sweetalert2';
import { EmployeeData } from '../../models/ResponseSupplier';

import { ModalAddManagerTdpComponent } from './modal-add-manager-tdp.component';
export class mockSwal{
  fire(){
    return {
      then:()=>of({})
    }
  }
}
describe('ModalAddManagerTdpComponent', () => {
  let component: ModalAddManagerTdpComponent;
  let fixture: ComponentFixture<ModalAddManagerTdpComponent>;
  let mockHttp:HttpTestingController;
  let user:IMainUser;
  let module:Array<IViewMain>;
  const dialogRefMock = {
    close: ()=>{} ,
    afterClosed: ()=>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddManagerTdpComponent ],
      imports:[HttpClientTestingModule,MatDialogModule],
      providers: [
      { provide: MAT_DIALOG_DATA, useValue: {} },
      {
        provide:MatDialogRef,useValue:dialogRefMock
      },
    {
      provide:Swal,
      useClass:mockSwal
    }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddManagerTdpComponent);
    component = fixture.componentInstance;
    
  });
  beforeEach(()=>{
    mockHttp=TestBed.inject(HttpTestingController);
    user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    module=[
      {
        relatedEntity:[],
        id:7,
        involvementRole:"CORONA_USER",
        href:"/HRManagement/usersandroles/v1/role/17",
        entitlement:[
          {
            action:"coronavirus$fa fa-user-md",
            description:"CORONAVIRUS",
            id:"7",
            platform:"App Web",
            manageableAsset:[{
              action:"R&W",
              endDate:null,
              startDate:null,
              entityType:"CORONA_HOME",
              href:"/coronavirus/home",
              id:"28",
              reference:null
            }]
          }
        ]
      }
    ]
    localStorage.setItem("permission",JSON.stringify(module));
    localStorage.setItem("user",JSON.stringify(user))
  })
  afterEach(()=>{ 
    localStorage.removeItem("user");
    localStorage.removeItem("permission");
  })
  it('when created component',()=>{
    expect(component).toBeTruthy();
  })
  it('when init variable',()=>{
    expect(component.byemployeeinp).toMatch("");
    expect(component.serviceName).toMatch("");
    expect(component.module.length).toEqual(0);
    expect(component.arrayIdRole.length).toEqual(0);
    expect(component.dataSource).not.toBeUndefined();
    expect(component.displayedColumns.length).toEqual(6);
    expect(component.lstEmployee.length).toEqual(0);
    expect(component.blockUI).not.toEqual(null);
    expect(component.sort).toBeUndefined();
    expect(component.paginator).toBeUndefined();
  })
  it('when execute asignManagerTdp',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    const emp: EmployeeData=null;
    component.asignManagerTdp(emp);
    expect(component.dialogRef.close).toHaveBeenCalled();

  }))
  it('when execute  errorAlertTdpManager',fakeAsync(()=>{
    spyOn(Swal,'fire');
    component.errorAlertTdpManager("HOLA");
    expect(Swal.fire).toHaveBeenCalled();
  }))

  it('when execute addDataSourceEmployee',()=>{
    let lstEmployee: Array<EmployeeData> = [];
    const emp: EmployeeData={
      id:2955,
      cip:"546565455",
      last_name_1:"ASDASD",
      last_name_2:"RADFGH",
      legal_entity_id:"0055",
      mail:"SDASD@hotmail.com",
      name:"AAA",
      national_id:"78889856"
    };
    const array={
      employee:lstEmployee.push(emp)
    }
    component.addDataSourceEmployee(array);
    expect(component.dataSource).not.toBeUndefined();
  })
  it('when execute onClose',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    component.onClose();
    expect(component.dialogRef.close).toHaveBeenCalled();
  }))

  it('when execute addDataToVariable',()=>{
    const data={
      serviceObj:{
        service:"ASDAS"
      }
    }
    component.addDataToVariable(data);
    expect(component.serviceName).toMatch("ASDAS");
  })

  it('when execute addPermissionSarch',()=>{
    component.addPermissionSearch();
    expect(component.arrayIdRole.length).toBeGreaterThan(0);
  })

  it('when execute loadDataManager',fakeAsync(()=>{
    const data={
      serviceObj:{
        service:"ASDAS"
      }
    }
    component.loadDataManager(data);
    tick(1500);
    expect(component.arrayIdRole.length).toBeGreaterThan(0);
    flush();
  }))

  it('when execute ngOnInit',fakeAsync(()=>{
    let spy=spyOn(component,'loadDataManager').and.callThrough();
    const data={
      serviceObj:{
        service:"ASDAS"
      }
    }
    component.data=data;
    fixture.detectChanges();
    component.ngOnInit();
    tick(2000);
    expect(spy).toHaveBeenCalled();
    flush();
  }))
});
