import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAgentComponent } from './select-agent.component';

describe('SelectAgentComponent', () => {
  let component: SelectAgentComponent;
  let fixture: ComponentFixture<SelectAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAgentComponent]
    });
    fixture = TestBed.createComponent(SelectAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
