import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAdminComponent } from './not-admin.component';

describe('NotAdminComponent', () => {
  let component: NotAdminComponent;
  let fixture: ComponentFixture<NotAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotAdminComponent]
    });
    fixture = TestBed.createComponent(NotAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
