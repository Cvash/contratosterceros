import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestoresComponent } from './gestores.component';

describe('GestoresComponent', () => {
  let component: GestoresComponent;
  let fixture: ComponentFixture<GestoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
