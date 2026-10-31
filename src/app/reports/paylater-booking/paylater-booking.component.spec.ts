import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaylaterBookingComponent } from './paylater-booking.component';

describe('PaylaterBookingComponent', () => {
  let component: PaylaterBookingComponent;
  let fixture: ComponentFixture<PaylaterBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaylaterBookingComponent]
    });
    fixture = TestBed.createComponent(PaylaterBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
