import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-service-dialog',
  templateUrl: './add-new-service-dialog.component.html',
  styleUrls: ['./add-new-service-dialog.component.scss']
})
export class AddNewServiceDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<AddNewServiceDialogComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
