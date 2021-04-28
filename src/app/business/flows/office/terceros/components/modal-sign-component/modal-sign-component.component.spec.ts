import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { SignaturePad } from 'angular2-signaturepad';
import { SupplierService } from '../../services/supplier.service';
import { MockDialog } from '../supplier-qr/supplier-qr/supplier-qr.component.spec';

import { ModalSignComponentComponent } from './modal-sign-component.component';

describe('ModalSignComponentComponent', () => {
  let component: ModalSignComponentComponent;
  let fixture: ComponentFixture<ModalSignComponentComponent>;
  let dialogRefMock = {
    close: ()=>{} ,
    afterClosed: ()=>{}
  }
  let signatureMock= {
    set : ()=>{},
    clear : ()=>{},
    toDataUrl : ()=>{}
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSignComponentComponent ],
      imports:[ 
        HttpClientTestingModule,RouterTestingModule,MatDialogModule
      ],
      providers:[
        SupplierService,
        {
          provide:MatDialog,
          useClass:MockDialog
        },
        {
          provide: MatDialogRef,
          useValue: dialogRefMock
        },
        { 
          provide:SignaturePad,
          userValue:signatureMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSignComponentComponent);
    component = fixture.componentInstance;
  });

  afterEach(()=>{ 
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when init variable',()=>{
    expect(component.acepted).toEqual(false);
    expect(component.flagSign).toEqual(false);
    expect(component.base64data).toEqual(null);
    expect(component.blobData).toBeUndefined();
  })

  it('when execute saveSign',fakeAsync(()=>{
    let viewChildComponent :any = fixture.componentInstance.signaturePad;
    console.log("GOLA",viewChildComponent);
    component.drawComplete();
    component.drawStart();
    spyOn(component,'ngAfterViewInit');
    component.ngAfterViewInit();

    let spyClear=spyOn(component,'clearSign');
    component.clearSign();
    expect(spyClear).toHaveBeenCalled();

    spyOn(component.dialogRef,'close');
    component.closeModal();
    expect(component.dialogRef.close).toHaveBeenCalled();

    let spySaveSign=spyOn(component,'saveSign');
    component.saveSign();
    expect(spySaveSign).toHaveBeenCalled();
  }))
});
