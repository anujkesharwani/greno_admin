import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCatalogueComponent } from './agent-catalogue.component';

describe('AgentCatalogueComponent', () => {
  let component: AgentCatalogueComponent;
  let fixture: ComponentFixture<AgentCatalogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentCatalogueComponent]
    });
    fixture = TestBed.createComponent(AgentCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
