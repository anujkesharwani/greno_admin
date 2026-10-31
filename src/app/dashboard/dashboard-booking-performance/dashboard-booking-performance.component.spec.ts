import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBookingPerformanceComponent } from './dashboard-booking-performance.component';

describe('DashboardBookingPerformanceComponent', () => {
  let component: DashboardBookingPerformanceComponent;
  let fixture: ComponentFixture<DashboardBookingPerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardBookingPerformanceComponent]
    });
    fixture = TestBed.createComponent(DashboardBookingPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
