import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingGuideComponent } from './mailing-guide.component';

describe('MailingGuideComponent', () => {
  let component: MailingGuideComponent;
  let fixture: ComponentFixture<MailingGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingGuideComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
