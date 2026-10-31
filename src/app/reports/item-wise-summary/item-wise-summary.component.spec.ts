import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWiseSummaryComponent } from './item-wise-summary.component';

describe('ItemWiseSummaryComponent', () => {
  let component: ItemWiseSummaryComponent;
  let fixture: ComponentFixture<ItemWiseSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemWiseSummaryComponent]
    });
    fixture = TestBed.createComponent(ItemWiseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
