import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTimeManagementComponent } from './day-time-management.component';

describe('DayTimeManagementComponent', () => {
  let component: DayTimeManagementComponent;
  let fixture: ComponentFixture<DayTimeManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayTimeManagementComponent]
    });
    fixture = TestBed.createComponent(DayTimeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
