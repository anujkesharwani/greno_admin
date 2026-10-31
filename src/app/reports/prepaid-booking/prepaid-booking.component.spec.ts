import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepaidBookingComponent } from './prepaid-booking.component';

describe('PrepaidBookingComponent', () => {
  let component: PrepaidBookingComponent;
  let fixture: ComponentFixture<PrepaidBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrepaidBookingComponent]
    });
    fixture = TestBed.createComponent(PrepaidBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
