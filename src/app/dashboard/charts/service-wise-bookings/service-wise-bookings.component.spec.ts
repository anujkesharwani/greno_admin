import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceWiseBookingsComponent } from './service-wise-bookings.component';

describe('ServiceWiseBookingsComponent', () => {
  let component: ServiceWiseBookingsComponent;
  let fixture: ComponentFixture<ServiceWiseBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceWiseBookingsComponent]
    });
    fixture = TestBed.createComponent(ServiceWiseBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
