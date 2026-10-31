import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaWiseSummaryComponent } from './area-wise-summary.component';

describe('AreaWiseSummaryComponent', () => {
  let component: AreaWiseSummaryComponent;
  let fixture: ComponentFixture<AreaWiseSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaWiseSummaryComponent]
    });
    fixture = TestBed.createComponent(AreaWiseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
