import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BathroomCleaningDiscountsComponent } from './bathroom-cleaning-discounts.component';

describe('BathroomCleaningDiscountsComponent', () => {
  let component: BathroomCleaningDiscountsComponent;
  let fixture: ComponentFixture<BathroomCleaningDiscountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BathroomCleaningDiscountsComponent]
    });
    fixture = TestBed.createComponent(BathroomCleaningDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
