import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModalDocumentTempComponent } from './modal-document-temp.component';

describe('ModalDocumentTempComponent', () => {
  let component: ModalDocumentTempComponent;
  let fixture: ComponentFixture<ModalDocumentTempComponent>;
  const dialogRefMockTemplate={ 
    close:()=>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDocumentTempComponent ],
      imports:[MatDialogModule],
      providers:[{
        provide:MAT_DIALOG_DATA,
        useValue:{}
      },
      {
        provide:MatDialogRef,
        useValue:dialogRefMockTemplate
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDocumentTempComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.blockUI).toBeDefined();
    expect(component.data.length).toEqual(0);
    expect(component.displayedColumns.length).toBeGreaterThanOrEqual(2);
    expect(component.dataSource).toBeDefined();
    expect(component.paginator).toBeUndefined();
    expect(component.template).toBeUndefined();

  });

  it('when execute script all method modal document template',fakeAsync(()=>{
    const collectionTemplate=[{
      body:"<div><h3>HOLA MUNDO</h3></div>",
      created_at:"2021-01-01 18:34",
      id: 1,
      status: true,
      title: "hola mundo",
      updated_at:"2021-01-01 18:34"
    }]
    component.dat=collectionTemplate;
    tick(1000);
    component.ngOnInit();
    flush();
    expect(component.dataSource).toBeDefined();

    // closeModal
    spyOn(component.dialogRef,'close');
    component.closeModal();
    expect(component.dialogRef.close).toHaveBeenCalled();

    component.chargeTemplate(1);
    expect(component.template.status).toEqual(true);

    let spy=spyOn(component,'applyFilterTemplate').and.callThrough();
    const event:any={
      target:{
        value:"hola"
      }
    };
    component.applyFilterTemplate(event);
    expect(spy).toHaveBeenCalled();
   
    
  }))
});
