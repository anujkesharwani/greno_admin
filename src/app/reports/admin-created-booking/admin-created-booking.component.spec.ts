import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatedBookingComponent } from './admin-created-booking.component';

describe('AdminCreatedBookingComponent', () => {
  let component: AdminCreatedBookingComponent;
  let fixture: ComponentFixture<AdminCreatedBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreatedBookingComponent]
    });
    fixture = TestBed.createComponent(AdminCreatedBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
