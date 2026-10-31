import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivaryCompletedBookingComponent } from './delivary-completed-booking.component';

describe('DelivaryCompletedBookingComponent', () => {
  let component: DelivaryCompletedBookingComponent;
  let fixture: ComponentFixture<DelivaryCompletedBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelivaryCompletedBookingComponent]
    });
    fixture = TestBed.createComponent(DelivaryCompletedBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
