import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerRegistrationComponent } from './interviewer-registration.component';

describe('InterviewerRegistrationComponent', () => {
  let component: InterviewerRegistrationComponent;
  let fixture: ComponentFixture<InterviewerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
