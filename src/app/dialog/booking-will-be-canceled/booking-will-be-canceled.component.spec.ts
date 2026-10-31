import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingWillBeCanceledComponent } from './booking-will-be-canceled.component';

describe('BookingWillBeCanceledComponent', () => {
  let component: BookingWillBeCanceledComponent;
  let fixture: ComponentFixture<BookingWillBeCanceledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingWillBeCanceledComponent]
    });
    fixture = TestBed.createComponent(BookingWillBeCanceledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
