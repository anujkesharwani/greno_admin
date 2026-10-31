import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedAgentComponent } from './unapproved-agent.component';

describe('UnapprovedAgentComponent', () => {
  let component: UnapprovedAgentComponent;
  let fixture: ComponentFixture<UnapprovedAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnapprovedAgentComponent]
    });
    fixture = TestBed.createComponent(UnapprovedAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
