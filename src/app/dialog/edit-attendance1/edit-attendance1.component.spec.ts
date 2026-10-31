import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttendance1Component } from './edit-attendance1.component';

describe('EditAttendance1Component', () => {
  let component: EditAttendance1Component;
  let fixture: ComponentFixture<EditAttendance1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAttendance1Component]
    });
    fixture = TestBed.createComponent(EditAttendance1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
