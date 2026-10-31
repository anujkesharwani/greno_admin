import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemLogsAndAuditingComponent } from './system-logs-and-auditing.component';

describe('SystemLogsAndAuditingComponent', () => {
  let component: SystemLogsAndAuditingComponent;
  let fixture: ComponentFixture<SystemLogsAndAuditingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemLogsAndAuditingComponent]
    });
    fixture = TestBed.createComponent(SystemLogsAndAuditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
