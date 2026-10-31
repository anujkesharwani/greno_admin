import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookingsDialogComponent } from './all-bookings-dialog.component';

describe('AllBookingsDialogComponent', () => {
  let component: AllBookingsDialogComponent;
  let fixture: ComponentFixture<AllBookingsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBookingsDialogComponent]
    });
    fixture = TestBed.createComponent(AllBookingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
