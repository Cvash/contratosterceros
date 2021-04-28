import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmbDialogVerEstadoComponent } from './emb-dialog-ver-estado.component';

describe('EmbDialogVerEstadoComponent', () => {
  let component: EmbDialogVerEstadoComponent;
  let fixture: ComponentFixture<EmbDialogVerEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogVerEstadoComponent ],
      providers:[
        {
          provide:MAT_DIALOG_DATA,
          useValue:{}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbDialogVerEstadoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
