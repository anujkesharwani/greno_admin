import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotWiseSummaryComponent } from './slot-wise-summary.component';

describe('SlotWiseSummaryComponent', () => {
  let component: SlotWiseSummaryComponent;
  let fixture: ComponentFixture<SlotWiseSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlotWiseSummaryComponent]
    });
    fixture = TestBed.createComponent(SlotWiseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
