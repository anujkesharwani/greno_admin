import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingChargesComponent } from './booking-charges.component';

describe('BookingChargesComponent', () => {
  let component: BookingChargesComponent;
  let fixture: ComponentFixture<BookingChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingChargesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
