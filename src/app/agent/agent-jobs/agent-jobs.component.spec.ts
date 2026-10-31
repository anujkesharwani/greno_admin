import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentJobsComponent } from './agent-jobs.component';

describe('AgentJobsComponent', () => {
  let component: AgentJobsComponent;
  let fixture: ComponentFixture<AgentJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentJobsComponent]
    });
    fixture = TestBed.createComponent(AgentJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
