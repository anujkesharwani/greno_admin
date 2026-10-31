import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAndNotificationSettingsComponent } from './email-and-notification-settings.component';

describe('EmailAndNotificationSettingsComponent', () => {
  let component: EmailAndNotificationSettingsComponent;
  let fixture: ComponentFixture<EmailAndNotificationSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailAndNotificationSettingsComponent]
    });
    fixture = TestBed.createComponent(EmailAndNotificationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
