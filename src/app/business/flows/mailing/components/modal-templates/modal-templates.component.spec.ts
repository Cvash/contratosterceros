import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModalTemplatesComponent } from './modal-templates.component';

describe('ModalTemplatesComponent', () => {
  let component: ModalTemplatesComponent;
  let fixture: ComponentFixture<ModalTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTemplatesComponent ],
      imports:[HttpClientTestingModule],
      providers:[{
        provide:MAT_DIALOG_DATA,
        useValue:{}
      },
      {
        provide:MatDialogRef,
        useValue:{}
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
