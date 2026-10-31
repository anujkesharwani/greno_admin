import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableAgentsComponent } from './available-agents.component';

describe('AvailableAgentsComponent', () => {
  let component: AvailableAgentsComponent;
  let fixture: ComponentFixture<AvailableAgentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableAgentsComponent]
    });
    fixture = TestBed.createComponent(AvailableAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
