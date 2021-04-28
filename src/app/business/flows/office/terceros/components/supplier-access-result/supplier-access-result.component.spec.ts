import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SupplierAccessResultComponent } from './supplier-access-result.component';

describe('SupplierAccessResultComponent', () => {
  let component: SupplierAccessResultComponent;
  let fixture: ComponentFixture<SupplierAccessResultComponent>;
  let dialogRefMock = {
    close: () => { } ,
    afterClosed: () => {}
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierAccessResultComponent ],
      imports:[MatDialogModule],
      providers:[
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAccessResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when execute method close',()=>{
    spyOn(component.dialogRef, "close");
    component.closeDialog();
    expect(component.dialogRef.close).toHaveBeenCalled();
  })
  it('when execute data include in ngOnInit',()=>{ 
    const value= {
      showdefaultMessage_x:"ejemplo",
      defaultMessage_x:"ejemplo",
      defaultTitle_x:"ejemplo",
      defaultResult_x:"ejemplo",
      defaultIcon_x:"ejemplo",
      resultStatus_x:"2",
      user_x:"2955",
      hour_x:"",
    }
    component.data=value;
    component.ngOnInit();
    expect(component.data.showdefaultMessage_x).toMatch("ejemplo")
  })
});
