import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreatedBookingComponent } from './customer-created-booking.component';

describe('CustomerCreatedBookingComponent', () => {
  let component: CustomerCreatedBookingComponent;
  let fixture: ComponentFixture<CustomerCreatedBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerCreatedBookingComponent]
    });
    fixture = TestBed.createComponent(CustomerCreatedBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
