import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-money-to-wallet-dialog',
  templateUrl: './add-money-to-wallet-dialog.component.html',
  styleUrls: ['./add-money-to-wallet-dialog.component.scss']
})
export class AddMoneyToWalletDialogComponent {

  constructor(
    public dailogRef:MatDialogRef<AddMoneyToWalletDialogComponent>,
  ){}

  closeDialog(){
    this.dailogRef.close();
  }
}
