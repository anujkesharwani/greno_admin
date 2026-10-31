import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyToWalletDialogComponent } from './add-money-to-wallet-dialog.component';

describe('AddMoneyToWalletDialogComponent', () => {
  let component: AddMoneyToWalletDialogComponent;
  let fixture: ComponentFixture<AddMoneyToWalletDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMoneyToWalletDialogComponent]
    });
    fixture = TestBed.createComponent(AddMoneyToWalletDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
