import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-address-dialog',
  templateUrl: './add-address-dialog.component.html',
  styleUrls: ['./add-address-dialog.component.scss']
})
export class AddAddressDialogComponent {

  data:string[]=[
    'House/Flat/Block/Building',
    'Street, Society or Landmark',
    'Pincode'
  ]

  constructor(
    public dailogRef:MatDialogRef<AddAddressDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data:DialogData
  ){}

  closeDialog(){
    this.dailogRef.close();
  }
}
