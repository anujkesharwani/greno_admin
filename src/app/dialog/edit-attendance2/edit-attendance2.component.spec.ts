import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttendance2Component } from './edit-attendance2.component';

describe('EditAttendance2Component', () => {
  let component: EditAttendance2Component;
  let fixture: ComponentFixture<EditAttendance2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAttendance2Component]
    });
    fixture = TestBed.createComponent(EditAttendance2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
