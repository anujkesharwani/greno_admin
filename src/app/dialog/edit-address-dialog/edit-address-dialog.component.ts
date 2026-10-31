import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-address-dialog',
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./edit-address-dialog.component.scss']
})
export class EditAddressDialogComponent {
  data:string[]=[
    'House/Flat/Block/Building',
    'Street, Society or Landmark',
    'Pincode'
  ]

  constructor(
    public dailogRef:MatDialogRef<EditAddressDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data:DialogData
  ){}

  closeDialog(){
    this.dailogRef.close();
  }
}
