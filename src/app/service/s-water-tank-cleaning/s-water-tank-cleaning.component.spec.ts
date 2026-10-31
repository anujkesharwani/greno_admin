import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SWaterTankCleaningComponent } from './s-water-tank-cleaning.component';

describe('SWaterTankCleaningComponent', () => {
  let component: SWaterTankCleaningComponent;
  let fixture: ComponentFixture<SWaterTankCleaningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SWaterTankCleaningComponent]
    });
    fixture = TestBed.createComponent(SWaterTankCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
