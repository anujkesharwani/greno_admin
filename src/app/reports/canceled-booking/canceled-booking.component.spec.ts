import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledBookingComponent } from './canceled-booking.component';

describe('CanceledBookingComponent', () => {
  let component: CanceledBookingComponent;
  let fixture: ComponentFixture<CanceledBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanceledBookingComponent]
    });
    fixture = TestBed.createComponent(CanceledBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
