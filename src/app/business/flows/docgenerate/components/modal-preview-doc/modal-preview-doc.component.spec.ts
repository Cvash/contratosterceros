import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPreviewDocComponent } from './modal-preview-doc.component';

describe('ModalPreviewDocComponent', () => {
  let component: ModalPreviewDocComponent;
  let fixture: ComponentFixture<ModalPreviewDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPreviewDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPreviewDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
