import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentGuideComponent } from './document-guide.component';

describe('DocumentGuideComponent', () => {
  let component: DocumentGuideComponent;
  let fixture: ComponentFixture<DocumentGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
