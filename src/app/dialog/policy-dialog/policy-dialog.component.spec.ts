import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDialogComponent } from './policy-dialog.component';

describe('PolicyDialogComponent', () => {
  let component: PolicyDialogComponent;
  let fixture: ComponentFixture<PolicyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyDialogComponent]
    });
    fixture = TestBed.createComponent(PolicyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
