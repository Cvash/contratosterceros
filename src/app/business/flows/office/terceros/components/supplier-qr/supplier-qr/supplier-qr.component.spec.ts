import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { IMainUser } from '../../../../../../../business/models/IModel-module';
import { SupplierService } from '../../../services/supplier.service';

import { SupplierQrComponent } from './supplier-qr.component';
export class MockDialog{
  open(){
    return {
      afterClosed:()=>of(Observable || "any")
    }
  }
}

describe('SupplierQrComponent', () => {
  let component: SupplierQrComponent;
  let fixture: ComponentFixture<SupplierQrComponent>;
  let user:IMainUser;
  let dialogRefMock = {
    close: ()=>{} ,
    afterClosed: ()=>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierQrComponent ],
      imports:[ 
        HttpClientTestingModule,RouterTestingModule,MatDialogModule
      ],
      providers:[
        SupplierService,{
          provide:MatDialog,
          useClass:MockDialog
        },
        {
          provide: MatDialogRef,
          useValue: dialogRefMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierQrComponent);
    component = fixture.componentInstance;
		user={"id":"2955","href":"/user/2955","token":"abb4d410-b92d-4157-ad52-0b307be20e48","pass":"sdasdasda","relatedParty":{"id":"3027","href":"/employee/3027","name":"JOAO JOSUE / HERNANDEZ / GODOY","email":"joao.hernandezgo@telefonica.com","description":"Employee","legalId":[{"country":"49","legalEntity":"0055","nationalIDType":"DNI","nationalID":"73078273"}]},"role":[{"id":"11","href":"/role/7046","description":"ELE2_USER"},{"id":"17","href":"/role/14482","description":"CORONA_USER"},{"id":"18","href":"/role/20551","description":"CORONA_READ_QR"},{"id":"16","href":"/role/21178","description":"CORONA_ADMIN"},{"id":"40","href":"/role/21192","description":"CORONA_ADMIN_VNZ"},{"id":"26","href":"/role/24370","description":"TER_TDPMNG"},{"id":"52","href":"/role/24381","description":"TER_ADMIN"},{"id":"65","href":"/role/28596","description":"USER_CAM"},{"id":"60","href":"/role/28597","description":"USER_TDP"},{"id":"62","href":"/role/42933","description":"USER_PERU"},{"id":"65","href":"/role/42934","description":"USER_CAM"},{"id":"60","href":"/role/42935","description":"USER_TDP"},{"id":"65","href":"/role/59766","description":"USER_CAM"},{"id":"62","href":"/role/59767","description":"USER_PERU"},{"id":"60","href":"/role/59768","description":"USER_TDP"},{"id":"65","href":"/role/76599","description":"USER_CAM"},{"id":"62","href":"/role/76600","description":"USER_PERU"},{"id":"60","href":"/role/76601","description":"USER_TDP"},{"id":"62","href":"/role/91330","description":"USER_PERU"},{"id":"60","href":"/role/91331","description":"USER_TDP"},{"id":"68","href":"/role/99604","description":"SURVEY_ADMIN"},{"id":"68","href":"/role/99605","description":"SURVEY_ADMIN"},{"id":"66","href":"/role/99606","description":"BEN_ADMIN"}]}
    localStorage.setItem("user",JSON.stringify(user));
  });

  afterEach(()=>{ 
    localStorage.removeItem("user");
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when init variable',()=>{ 
    expect(component.myName).toMatch("");
    expect(component.acepted).toEqual(false);
    expect(component.user).toBeUndefined();
  })
  it('when execute ngOnInit',()=>{ 
    
    component.ngOnInit();
    expect(component.user.id).toMatch("2955");
    expect(component.myName).toContain("JOAO JOSUE");
  })

  it('when execute closeDialog',fakeAsync(()=>{ 
    spyOn(component.dialogRef,'close');
    component.closeDialog();
    expect(component.dialogRef.close).toHaveBeenCalled();
  }))

  it('when execute acept method',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    component.acept();
    tick(2000);
    expect(component.acepted).toEqual(true);
    expect(component.dialogRef.close).toHaveBeenCalled();
  }))
});
