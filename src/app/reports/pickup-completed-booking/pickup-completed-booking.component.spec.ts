import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupCompletedBookingComponent } from './pickup-completed-booking.component';

describe('PickupCompletedBookingComponent', () => {
  let component: PickupCompletedBookingComponent;
  let fixture: ComponentFixture<PickupCompletedBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickupCompletedBookingComponent]
    });
    fixture = TestBed.createComponent(PickupCompletedBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
