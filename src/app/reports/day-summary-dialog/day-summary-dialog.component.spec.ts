import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySummaryDialogComponent } from './day-summary-dialog.component';

describe('DaySummaryDialogComponent', () => {
  let component: DaySummaryDialogComponent;
  let fixture: ComponentFixture<DaySummaryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaySummaryDialogComponent]
    });
    fixture = TestBed.createComponent(DaySummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
