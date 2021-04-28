import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmbDialogVerRutasQuiebresComponent } from './emb-dialog-ver-rutas-quiebres.component';

describe('EmbDialogVerRutasQuiebresComponent', () => {
  let component: EmbDialogVerRutasQuiebresComponent;
  let fixture: ComponentFixture<EmbDialogVerRutasQuiebresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbDialogVerRutasQuiebresComponent ],
      providers:[{
        provide:MAT_DIALOG_DATA,
        useValue:{}
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbDialogVerRutasQuiebresComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });
});
