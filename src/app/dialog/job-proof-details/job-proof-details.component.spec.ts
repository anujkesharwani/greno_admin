import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProofDetailsComponent } from './job-proof-details.component';

describe('JobProofDetailsComponent', () => {
  let component: JobProofDetailsComponent;
  let fixture: ComponentFixture<JobProofDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobProofDetailsComponent]
    });
    fixture = TestBed.createComponent(JobProofDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
