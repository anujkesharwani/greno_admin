import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreYouSureToClearNotificationComponent } from './are-you-sure-to-clear-notification.component';

describe('AreYouSureToClearNotificationComponent', () => {
  let component: AreYouSureToClearNotificationComponent;
  let fixture: ComponentFixture<AreYouSureToClearNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreYouSureToClearNotificationComponent]
    });
    fixture = TestBed.createComponent(AreYouSureToClearNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
