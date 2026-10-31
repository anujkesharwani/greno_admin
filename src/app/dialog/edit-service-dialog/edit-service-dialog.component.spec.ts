import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceDialogComponent } from './edit-service-dialog.component';

describe('EditServiceDialogComponent', () => {
  let component: EditServiceDialogComponent;
  let fixture: ComponentFixture<EditServiceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditServiceDialogComponent]
    });
    fixture = TestBed.createComponent(EditServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
