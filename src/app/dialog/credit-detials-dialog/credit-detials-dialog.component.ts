import { Component } from '@angular/core';


interface Data {
  time: string,
  id: string,
  amount: number,
  sender: string,
  reason: string
}

@Component({
  selector: 'app-credit-detials-dialog',
  templateUrl: './credit-detials-dialog.component.html',
  styleUrls: ['./credit-detials-dialog.component.scss']
})
export class CreditDetialsDialogComponent {
  data: Data = {
    time: '13 March 2023, 12:13 PM',
    id: '#ITC4520',
    amount: 12000,
    sender: 'Ram Charan Dash',
    reason: 'Interest paid for January'
  }
}
