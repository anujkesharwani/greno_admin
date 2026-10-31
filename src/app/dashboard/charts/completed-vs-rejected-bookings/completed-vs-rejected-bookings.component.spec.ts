import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedVsRejectedBookingsComponent } from './completed-vs-rejected-bookings.component';

describe('CompletedVsRejectedBookingsComponent', () => {
  let component: CompletedVsRejectedBookingsComponent;
  let fixture: ComponentFixture<CompletedVsRejectedBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedVsRejectedBookingsComponent]
    });
    fixture = TestBed.createComponent(CompletedVsRejectedBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
