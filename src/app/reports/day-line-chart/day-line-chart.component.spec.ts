import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayLineChartComponent } from './day-line-chart.component';

describe('DayLineChartComponent', () => {
  let component: DayLineChartComponent;
  let fixture: ComponentFixture<DayLineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayLineChartComponent]
    });
    fixture = TestBed.createComponent(DayLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
