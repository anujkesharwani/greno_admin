import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentBookingsComponent } from './dashboard-recent-bookings.component';

describe('DashboardRecentBookingsComponent', () => {
  let component: DashboardRecentBookingsComponent;
  let fixture: ComponentFixture<DashboardRecentBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardRecentBookingsComponent]
    });
    fixture = TestBed.createComponent(DashboardRecentBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
