import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWiseBookingsComponent } from './agent-wise-bookings.component';

describe('AgentWiseBookingsComponent', () => {
  let component: AgentWiseBookingsComponent;
  let fixture: ComponentFixture<AgentWiseBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentWiseBookingsComponent]
    });
    fixture = TestBed.createComponent(AgentWiseBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
