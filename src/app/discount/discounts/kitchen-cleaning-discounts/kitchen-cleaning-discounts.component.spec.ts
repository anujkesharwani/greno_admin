import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenCleaningDiscountsComponent } from './kitchen-cleaning-discounts.component';

describe('KitchenCleaningDiscountsComponent', () => {
  let component: KitchenCleaningDiscountsComponent;
  let fixture: ComponentFixture<KitchenCleaningDiscountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KitchenCleaningDiscountsComponent]
    });
    fixture = TestBed.createComponent(KitchenCleaningDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
