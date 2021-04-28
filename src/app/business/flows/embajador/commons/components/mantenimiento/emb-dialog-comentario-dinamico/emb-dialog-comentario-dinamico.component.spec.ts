import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbDialogComentarioDinamicoComponent } from './emb-dialog-comentario-dinamico.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

describe('EmbDialogComentarioDinamicoComponent', () => {
  let component: EmbDialogComentarioDinamicoComponent;
  let fixture: ComponentFixture<EmbDialogComentarioDinamicoComponent>;
  const mockDialogRefComentarioDinamico = {
    close: () => { },
    afterClosed: () => { }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogComentarioDinamicoComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: mockDialogRefComentarioDinamico
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbDialogComentarioDinamicoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    
  });
});
