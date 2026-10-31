import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWiseSummaryComponent } from './agent-wise-summary.component';

describe('AgentWiseSummaryComponent', () => {
  let component: AgentWiseSummaryComponent;
  let fixture: ComponentFixture<AgentWiseSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentWiseSummaryComponent]
    });
    fixture = TestBed.createComponent(AgentWiseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
