import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBookingComponent } from './no-booking.component';

describe('NoBookingComponent', () => {
  let component: NoBookingComponent;
  let fixture: ComponentFixture<NoBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoBookingComponent]
    });
    fixture = TestBed.createComponent(NoBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
