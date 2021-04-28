import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbDialogCambiarEstadoComponent } from './emb-dialog-cambiar-estado.component';

describe('EmbDialogCambiarEstadoComponent', () => {
  let component: EmbDialogCambiarEstadoComponent;
  let fixture: ComponentFixture<EmbDialogCambiarEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogCambiarEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbDialogCambiarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
