import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Timestamp } from 'rxjs';
import { DebitDetialsDialogComponent } from '../dialog/debit-detials-dialog/debit-detials-dialog.component';
import { CreditDetialsDialogComponent } from '../dialog/credit-detials-dialog/credit-detials-dialog.component';
import { AreYouSureToClearNotificationComponent } from '../dialog/are-you-sure-to-clear-notification/are-you-sure-to-clear-notification.component';
import { LedgerConfirmationDialogComponent } from '../dialog/ledger-confirmation-dialog/ledger-confirmation-dialog.component';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent {

  constructor(
    private dialog: MatDialog
  ) { }

  data: number[] = [1, 2, 3, 4];
  row: number[] = [1, 2];

  ledgers: Ledger[] = [

  ];
  todayLedger: Ledger = {
    date: new Date(),
    description: 'Test',
    totalDebit: 0,
    totalCredit: 0,
    creditLedger: [

    ],
    debitLedger: [

    ],
  };
  ledgerDate: string = "";
  displayedColumns: string[] = [
    'transactionId',
    'time',
    'to',
    'narration',
    'amount',
  ];
  dataSource: any[] = [];
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  // constructor(private dialog: Dialog,) { }
  // ngOnInit(): void {
  // }

  formateDate(date: Date) {
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return [date.getDate(), months[date.getMonth()], date.getFullYear()].join(' ');
  }

  openDebitDetailsDialog() {
    const dialogRef = this.dialog.open(DebitDetialsDialogComponent);
  }

  openCreditDetailsDialog() {
    const dialogRef = this.dialog.open(CreditDetialsDialogComponent);
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(LedgerConfirmationDialogComponent);
  }

  openAddDebitTransactionDialog(){
    // const dialog = this.dialog.open()
  }
}


interface Ledger {
  date: Date;
  description: string;
  totalDebit: number;
  totalCredit: number;
  creditLedger: LedgerTransaction[];
  debitLedger: LedgerTransaction[];
}
interface LedgerTransaction {
  transactionId: string;
  time: Date;
  to: string;
  narration: string;
  from: string;
  amount: number;
}

