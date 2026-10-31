import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPermissionCatalogueComponent } from './users-permission-catalogue.component';

describe('UsersPermissionCatalogueComponent', () => {
  let component: UsersPermissionCatalogueComponent;
  let fixture: ComponentFixture<UsersPermissionCatalogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersPermissionCatalogueComponent]
    });
    fixture = TestBed.createComponent(UsersPermissionCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
