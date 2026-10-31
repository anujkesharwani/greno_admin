import { Component } from '@angular/core';

interface Data {
  time: string,
  id: string,
  amount: number,
  sender: string,
  reason: string
}

@Component({
  selector: 'app-debit-detials-dialog',
  templateUrl: './debit-detials-dialog.component.html',
  styleUrls: ['./debit-detials-dialog.component.scss']
})
export class DebitDetialsDialogComponent {

  data: Data = {
    time: '13 March 2023, 12:13 PM',
    id: '#ITC4520',
    amount: 12000,
    sender: 'Ram Charan Dash',
    reason: 'Interest paid for January'
  }
}
