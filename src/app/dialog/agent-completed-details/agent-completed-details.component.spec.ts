import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCompletedDetailsComponent } from './agent-completed-details.component';

describe('AgentCompletedDetailsComponent', () => {
  let component: AgentCompletedDetailsComponent;
  let fixture: ComponentFixture<AgentCompletedDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentCompletedDetailsComponent]
    });
    fixture = TestBed.createComponent(AgentCompletedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
