import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullHomeCleaningDiscountsComponent } from './full-home-cleaning-discounts.component';

describe('FullHomeCleaningDiscountsComponent', () => {
  let component: FullHomeCleaningDiscountsComponent;
  let fixture: ComponentFixture<FullHomeCleaningDiscountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullHomeCleaningDiscountsComponent]
    });
    fixture = TestBed.createComponent(FullHomeCleaningDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
