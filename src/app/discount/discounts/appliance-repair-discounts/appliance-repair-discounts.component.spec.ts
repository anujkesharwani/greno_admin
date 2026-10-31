import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplianceRepairDiscountsComponent } from './appliance-repair-discounts.component';

describe('ApplianceRepairDiscountsComponent', () => {
  let component: ApplianceRepairDiscountsComponent;
  let fixture: ComponentFixture<ApplianceRepairDiscountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplianceRepairDiscountsComponent]
    });
    fixture = TestBed.createComponent(ApplianceRepairDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
