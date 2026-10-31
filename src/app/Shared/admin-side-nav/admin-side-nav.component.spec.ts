import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSideNavComponent } from './admin-side-nav.component';

describe('AdminSideNavComponent', () => {
  let component: AdminSideNavComponent;
  let fixture: ComponentFixture<AdminSideNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSideNavComponent]
    });
    fixture = TestBed.createComponent(AdminSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
