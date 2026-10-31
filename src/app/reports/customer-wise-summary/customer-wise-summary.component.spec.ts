import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseSummaryComponent } from './customer-wise-summary.component';

describe('CustomerWiseSummaryComponent', () => {
  let component: CustomerWiseSummaryComponent;
  let fixture: ComponentFixture<CustomerWiseSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerWiseSummaryComponent]
    });
    fixture = TestBed.createComponent(CustomerWiseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
