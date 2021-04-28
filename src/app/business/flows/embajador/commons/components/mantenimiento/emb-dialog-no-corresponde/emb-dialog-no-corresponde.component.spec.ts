import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmbDialogNoCorrespondeComponent } from './emb-dialog-no-corresponde.component';

describe('EmbDialogNoCorrespondeComponent', () => {
  let component: EmbDialogNoCorrespondeComponent;
  let fixture: ComponentFixture<EmbDialogNoCorrespondeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogNoCorrespondeComponent ],
      providers:[
        HttpClient,
        HttpHandler,
        FormBuilder,
        {
          provide:MatDialogRef,
          useValue:{}
        },
        {
          provide:MAT_DIALOG_DATA,
          useValue:{}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbDialogNoCorrespondeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
