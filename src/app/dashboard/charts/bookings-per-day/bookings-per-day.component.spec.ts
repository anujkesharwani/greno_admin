import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsPerDayComponent } from './bookings-per-day.component';

describe('BookingsPerDayComponent', () => {
  let component: BookingsPerDayComponent;
  let fixture: ComponentFixture<BookingsPerDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsPerDayComponent]
    });
    fixture = TestBed.createComponent(BookingsPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
