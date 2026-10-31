import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceWiseSummaryComponent } from './service-wise-summary.component';

describe('ServiceWiseSummaryComponent', () => {
  let component: ServiceWiseSummaryComponent;
  let fixture: ComponentFixture<ServiceWiseSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceWiseSummaryComponent]
    });
    fixture = TestBed.createComponent(ServiceWiseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
