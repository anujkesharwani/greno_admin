import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfirmationDialogComponent } from './notification-confirmation-dialog.component';

describe('NotificationConfirmationDialogComponent', () => {
  let component: NotificationConfirmationDialogComponent;
  let fixture: ComponentFixture<NotificationConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(NotificationConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
