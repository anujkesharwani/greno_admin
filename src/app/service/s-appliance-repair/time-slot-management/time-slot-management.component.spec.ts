import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotManagementComponent } from './time-slot-management.component';

describe('TimeSlotManagementComponent', () => {
  let component: TimeSlotManagementComponent;
  let fixture: ComponentFixture<TimeSlotManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeSlotManagementComponent]
    });
    fixture = TestBed.createComponent(TimeSlotManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
