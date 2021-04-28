import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGestoresComponent } from './ver-gestores.component';

describe('VerGestoresComponent', () => {
  let component: VerGestoresComponent;
  let fixture: ComponentFixture<VerGestoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerGestoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerGestoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
