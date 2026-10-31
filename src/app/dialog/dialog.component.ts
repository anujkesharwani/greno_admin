import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressDialogComponent } from './add-address-dialog/add-address-dialog.component';
import { AddNewCategoryDialogComponent } from './add-new-category-dialog/add-new-category-dialog.component';
import { EditAddressDialogComponent } from './edit-address-dialog/edit-address-dialog.component';
import { AddMoneyToWalletDialogComponent } from './add-money-to-wallet-dialog/add-money-to-wallet-dialog.component';
import { AreYouSureToClearNotificationComponent } from './are-you-sure-to-clear-notification/are-you-sure-to-clear-notification.component';
import { AssignAgentComponent } from './assign-agent/assign-agent.component';
import { BookingWillBeCanceledComponent } from './booking-will-be-canceled/booking-will-be-canceled.component';
import { EditAttendance1Component } from './edit-attendance1/edit-attendance1.component';
import { EditAttendance2Component } from './edit-attendance2/edit-attendance2.component';
import { AddNewServiceDialogComponent } from './add-new-service-dialog/add-new-service-dialog.component';
import { EditServiceDialogComponent } from './edit-service-dialog/edit-service-dialog.component';
import { DebitDetialsDialogComponent } from './debit-detials-dialog/debit-detials-dialog.component';
import { CreditDetialsDialogComponent } from './credit-detials-dialog/credit-detials-dialog.component';
import { PolicyDialogComponent } from './policy-dialog/policy-dialog.component';
import { LedgerConfirmationDialogComponent } from './ledger-confirmation-dialog/ledger-confirmation-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dialog.open(LedgerConfirmationDialogComponent);
  }

  openAddAddress() {
    const dialogRef = this.dialog.open(AddAddressDialogComponent);
    // console.log(dialog);
  }

  openAddCategory() {
    const dialogRef = this.dialog.open(AddNewCategoryDialogComponent);
  }

  openEditAddress() {
    const dialogRef = this.dialog.open(EditAddressDialogComponent);
  }

  openAddMoneyToWallet() {
    const dialogRef = this.dialog.open(AddMoneyToWalletDialogComponent);
  }

  openAreYouSureToClearNotification() {
    const dialogRef = this.dialog.open(AreYouSureToClearNotificationComponent);
  }

  openAssignAgent() {
    const dialogRef = this.dialog.open(AssignAgentComponent);
  }

  openBookingWillCanceled() {
    const dialogRef = this.dialog.open(BookingWillBeCanceledComponent);
  }

  openEditAttendance1() {
    const dialogRef = this.dialog.open(EditAttendance1Component);
  }
  openEditAttendance2() {
    const dialogRef = this.dialog.open(EditAttendance2Component);
  }

  openAddNewService() {
    const dialogRef = this.dialog.open(AddNewServiceDialogComponent);
  }

  openEditService() {
    const dialogRef = this.dialog.open(EditServiceDialogComponent);
  }

  openDebitDetails() {
    const dialogRef = this.dialog.open(DebitDetialsDialogComponent);
  }

  openCreditDetails() {
    const dialogRef = this.dialog.open(CreditDetialsDialogComponent);
  }

  openPolicy(){
    const dialogRef = this.dialog.open(PolicyDialogComponent);
  }

  openLedgerConfirmation(){
    const dialogRef = this.dialog.open(LedgerConfirmationDialogComponent);
  }

}
