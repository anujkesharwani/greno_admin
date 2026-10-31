import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SofaCarpetCleaningDiscountsComponent } from './sofa-carpet-cleaning-discounts.component';

describe('SofaCarpetCleaningDiscountsComponent', () => {
  let component: SofaCarpetCleaningDiscountsComponent;
  let fixture: ComponentFixture<SofaCarpetCleaningDiscountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SofaCarpetCleaningDiscountsComponent]
    });
    fixture = TestBed.createComponent(SofaCarpetCleaningDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
