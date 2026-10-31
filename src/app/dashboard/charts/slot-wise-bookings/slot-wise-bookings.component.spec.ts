import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotWiseBookingsComponent } from './slot-wise-bookings.component';

describe('SlotWiseBookingsComponent', () => {
  let component: SlotWiseBookingsComponent;
  let fixture: ComponentFixture<SlotWiseBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlotWiseBookingsComponent]
    });
    fixture = TestBed.createComponent(SlotWiseBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
