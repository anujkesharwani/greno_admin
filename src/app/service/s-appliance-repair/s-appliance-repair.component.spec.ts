import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SApplianceRepairComponent } from './s-appliance-repair.component';

describe('SApplianceRepairComponent', () => {
  let component: SApplianceRepairComponent;
  let fixture: ComponentFixture<SApplianceRepairComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SApplianceRepairComponent]
    });
    fixture = TestBed.createComponent(SApplianceRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
