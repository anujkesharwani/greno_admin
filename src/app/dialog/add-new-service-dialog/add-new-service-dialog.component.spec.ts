import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewServiceDialogComponent } from './add-new-service-dialog.component';

describe('AddNewServiceDialogComponent', () => {
  let component: AddNewServiceDialogComponent;
  let fixture: ComponentFixture<AddNewServiceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewServiceDialogComponent]
    });
    fixture = TestBed.createComponent(AddNewServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
