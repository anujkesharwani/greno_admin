import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { MatDialog } from '@angular/material/dialog';
import { AddMoneyToWalletDialogComponent } from 'src/app/dialog/add-money-to-wallet-dialog/add-money-to-wallet-dialog.component';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent {

  constructor(
    public location: Location,
    private dialog: MatDialog
  ) { }

  tableData = [
    {
      transaction: '#UL13-072 ',
      agentID: 'JC15156',
      dateNtime: '11:00 AM, 21 Feb 23',
      phoneNumber: 9862660200,
      amount: 1500,
      type: 'Withdrawal',
      acc: 9862660200,
      status: 'Failed',
    }, {
      transaction: '#UL13-072 ',
      agentID: 'JC15156',
      dateNtime: '11:00 AM, 21 Feb 23',
      phoneNumber: 9862660200,
      amount: 1500,
      type: 'Topup',
      acc: 9862660200,
      status: 'Success',
    }, {
      transaction: '#UL13-072 ',
      agentID: 'JC15156',
      dateNtime: '11:00 AM, 21 Feb 23',
      phoneNumber: 9862660200,
      amount: 1500,
      type: 'Job Fee',
      acc: 9862660200,
      status: 'Failed',
    }, {
      transaction: '#UL13-072 ',
      agentID: 'JC15156',
      dateNtime: '11:00 AM, 21 Feb 23',
      phoneNumber: 9862660200,
      amount: 1500,
      type: 'Withdrawal',
      acc: 9862660200,
      status: 'Failed',
    }, {
      transaction: '#UL13-072 ',
      agentID: 'JC15156',
      dateNtime: '11:00 AM, 21 Feb 23',
      phoneNumber: 9862660200,
      amount: 1500,
      type: 'Topup',
      acc: 9862660200,
      status: 'Success',
    }, {
      transaction: '#UL13-072 ',
      agentID: 'JC15156',
      dateNtime: '11:00 AM, 21 Feb 23',
      phoneNumber: 9862660200,
      amount: 1500,
      type: 'Job Fee',
      acc: 9862660200,
      status: 'Failed',
    }, {
      transaction: '#UL13-072 ',
      agentID: 'JC15156',
      dateNtime: '11:00 AM, 21 Feb 23',
      phoneNumber: 9862660200,
      amount: 1500,
      type: 'Withdrawal',
      acc: 9862660200,
      status: 'Failed',
    }, {
      transaction: '#UL13-072 ',
      agentID: 'JC15156',
      dateNtime: '11:00 AM, 21 Feb 23',
      phoneNumber: 9862660200,
      amount: 1500,
      type: 'Topup',
      acc: 9862660200,
      status: 'Success',
    }, {
      transaction: '#UL13-072 ',
      agentID: 'JC15156',
      dateNtime: '11:00 AM, 21 Feb 23',
      phoneNumber: 9862660200,
      amount: 1500,
      type: 'Job Fee',
      acc: 9862660200,
      status: 'Failed',
    },
  ];

  openDialog() {
    this.dialog.open(AddMoneyToWalletDialogComponent);
  }
}
