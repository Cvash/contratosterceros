import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { ModalLinkImageComponent } from './modal-link-image.component';

describe('ModalLinkImageComponent', () => {
  let component: ModalLinkImageComponent;
  let fixture: ComponentFixture<ModalLinkImageComponent>;
  const dialogRefLinkMock = {
    close : () => {}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLinkImageComponent ],
      imports: [ HttpClientTestingModule], 
      providers:[{
        provide:MatDialogRef,
        useValue:dialogRefLinkMock
      }]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalLinkImageComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.imgstatus).toEqual(0);
    expect(component.result).toMatch("");
    expect(component.image).toMatch("");
    expect(component.link).toMatch("");
    expect(component.flagdis).toEqual(true);
  });

  it('when execute script method modal link image',fakeAsync(()=>{
    spyOn(component.dialogRef,'close');
    component.closeModal();
    expect(component.dialogRef.close).toHaveBeenCalled();

    component.insert();
    expect(component.dialogRef.close).toHaveBeenCalled();

    // changeimg
    let spy=spyOn(component,'changeimg').and.callThrough();
    const value= {
      target: {
          files: [new Blob(['ssdfsdgdjghdslkjghdjg'], { type: 'pdf' })]
      }
      }
    component.changeimg(value);
    expect(spy).toHaveBeenCalled();

    // responseChangeImg
    let rpt={ 
      "rpt":1,
      "filename":"attach_887.pdf"
    }
    component.responseChangeimg(rpt);
    expect(component.imgstatus).toEqual(2);
    expect(component.flagdis).toEqual(false);

    rpt={
      "rpt":0,
      "filename":""
    }
    component.responseChangeimg(rpt);
    expect(component.imgstatus).toEqual(3);
  }))
});
