import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmbDialogMotivoSubmotivoComponent } from './emb-dialog-motivo-submotivo.component';

describe('EmbDialogMotivoSubmotivoComponent', () => {
  let component: EmbDialogMotivoSubmotivoComponent;
  let fixture: ComponentFixture<EmbDialogMotivoSubmotivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogMotivoSubmotivoComponent ],
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
    fixture = TestBed.createComponent(EmbDialogMotivoSubmotivoComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
