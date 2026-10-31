import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatalogueComponent } from './admin-catalogue.component';

describe('AdminCatalogueComponent', () => {
  let component: AdminCatalogueComponent;
  let fixture: ComponentFixture<AdminCatalogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCatalogueComponent]
    });
    fixture = TestBed.createComponent(AdminCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
