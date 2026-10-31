import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerConfirmationDialogComponent } from './ledger-confirmation-dialog.component';

describe('LedgerConfirmationDialogComponent', () => {
  let component: LedgerConfirmationDialogComponent;
  let fixture: ComponentFixture<LedgerConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LedgerConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(LedgerConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
