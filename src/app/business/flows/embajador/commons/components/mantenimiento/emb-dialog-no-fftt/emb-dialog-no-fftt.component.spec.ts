import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmbDialogNoFFTTComponent } from './emb-dialog-no-fftt.component';

describe('EmbDialogNoFFTTComponent', () => {
  let component: EmbDialogNoFFTTComponent;
  let fixture: ComponentFixture<EmbDialogNoFFTTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogNoFFTTComponent ],
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
    fixture = TestBed.createComponent(EmbDialogNoFFTTComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
