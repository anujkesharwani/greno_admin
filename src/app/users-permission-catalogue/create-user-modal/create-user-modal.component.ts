import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss'],
})
export class CreateUserModalComponent {
  constructor(public dialogRef: MatDialogRef<CreateUserModalComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
