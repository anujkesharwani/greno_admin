import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-no-booking',
  templateUrl: './no-booking.component.html',
  styleUrls: ['./no-booking.component.scss']
})
export class NoBookingComponent {
  constructor(
    public dialogRef: MatDialogRef<NoBookingComponent>,
  ){

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
