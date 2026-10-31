import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterTankCleaningDiscountsComponent } from './water-tank-cleaning-discounts.component';

describe('WaterTankCleaningDiscountsComponent', () => {
  let component: WaterTankCleaningDiscountsComponent;
  let fixture: ComponentFixture<WaterTankCleaningDiscountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaterTankCleaningDiscountsComponent]
    });
    fixture = TestBed.createComponent(WaterTankCleaningDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
