import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoVigenteComponent } from './periodo-vigente.component';

describe('PeriodoVigenteComponent', () => {
  let component: PeriodoVigenteComponent;
  let fixture: ComponentFixture<PeriodoVigenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoVigenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoVigenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
