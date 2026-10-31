import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountBookingComponent } from './discount-booking.component';

describe('DiscountBookingComponent', () => {
  let component: DiscountBookingComponent;
  let fixture: ComponentFixture<DiscountBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountBookingComponent]
    });
    fixture = TestBed.createComponent(DiscountBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
