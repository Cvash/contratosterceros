import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { mockSwal } from '../../../office/terceros/components/mypass/mypass.component.spec';

import { ModalRelationshipComponent } from './modal-relationship.component';

describe('ModalRelationshipComponent', () => {
  let component: ModalRelationshipComponent;
  let fixture: ComponentFixture<ModalRelationshipComponent>;
  const dialogRefRelationshipMock = {
    close: ()=>{} ,
    afterClosed: ()=>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRelationshipComponent ],
      imports : [ HttpClientTestingModule],
      providers:[
      {
       provide:MatDialogRef,
       useValue:dialogRefRelationshipMock
      },
      {
        provide:MAT_DIALOG_DATA,
        useValue:{}
      },
     {
       provide:Swal,
       useClass:mockSwal
     }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRelationshipComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('when init variable',()=>{
    expect(component.conditionRealtionShip).toEqual(false);
    expect(component.arrayCoronaRelationshipValue.length).toEqual(0);
    expect(component.auxArrayCoronaRelationshipValue.length).toEqual(0);
    expect(component.arrayCoronaRelationship.length).toEqual(0);
  })

  it('when execute ngOnInit',fakeAsync(()=>{
    const value={ 
      request:2,
      relationship:[{
        id:1,
        name:"a",
        lastName1:"b",
        lastName2:"c"
      }]
    }
    component.data=value;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.relationshipForm.requestId.value).toEqual(2);
    
    component.relationshipForm.relationshipF.setValue(7);
    fixture.detectChanges();
    component.showOtherRelationship();
    expect(component.conditionRealtionShip).toEqual(true);

    component.relationshipForm.relationshipF.setValue(4);
    fixture.detectChanges();
    component.showOtherRelationship();
    expect(component.conditionRealtionShip).toEqual(false);

    // add family case 1
    spyOn(Swal,'fire');
    component.relationshipForm.relationshipF.setValue(0);
    tick(1000);
    component.addFamily();
    expect(Swal.fire).toHaveBeenCalled();
    flush();
    // case 2
    spyOn(component.dialogRef,'close');
    component.relationshipForm.chk01.setValue(true);
    component.relationshipForm.chk02.setValue(true);
    component.relationshipForm.chk03.setValue(true);
    component.relationshipForm.chk04.setValue(true);
    component.relationshipForm.name.setValue("HOLA MUNDO")
    component.relationshipForm.relationshipF.setValue(2);
    const response={
      request:2,
      relationship:[{
        id:2,
        name:"GG"
      }]
    }
    component.initDataRelationShip(response);
    tick(1000);
    component.addFamily();
    tick(1000);
    expect(component.arrayCoronaRelationshipValue.length).toBeGreaterThanOrEqual(1);
    expect(component.dialogRef.close).toHaveBeenCalled();
    flush();
  }))
  it('when execute onClose',fakeAsync(()=>{ 
    spyOn(component.dialogRef,'close')
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
    tick(100)
    component.reset();
    expect(component.arrayCoronaRelationship.length).toEqual(0);
    tick(100)
    component.clearForm();
    expect(component.relationshipForm.name.value).toMatch("");
    expect(component.relationshipForm.lastName1.value).toMatch("");
    expect(component.relationshipForm.lastName2.value).toMatch("");
    expect(component.relationshipForm.chk01.value).toEqual(null);
    expect(component.relationshipForm.chk02.value).toEqual(null);
    expect(component.relationshipForm.chk03.value).toEqual(null);
    expect(component.relationshipForm.chk04.value).toEqual(null);
    expect(component.relationshipForm.comment.value).toMatch("");
    expect(component.relationshipForm.otherRelationship.value).toMatch("");
    flush();
  }))

  
});
