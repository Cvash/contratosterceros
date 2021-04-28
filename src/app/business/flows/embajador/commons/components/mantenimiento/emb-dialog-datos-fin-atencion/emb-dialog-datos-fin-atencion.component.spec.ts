import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmbDialogDatosFinAtencionComponent } from './emb-dialog-datos-fin-atencion.component';

describe('EmbDialogDatosFinAtencionComponent', () => {
  let component: EmbDialogDatosFinAtencionComponent;
  let fixture: ComponentFixture<EmbDialogDatosFinAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogDatosFinAtencionComponent ],
      providers:[
    {
      provide:MAT_DIALOG_DATA,
      useValue:{}
    }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbDialogDatosFinAtencionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
