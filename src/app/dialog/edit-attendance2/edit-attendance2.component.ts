import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-attendance2',
  templateUrl: './edit-attendance2.component.html',
  styleUrls: ['./edit-attendance2.component.scss']
})
export class EditAttendance2Component {

  timings=[
    '08:00 AM - 10:00 AM',
    '010:00 AM - 12:00 PM',
    '012:00 PM - 02:00 PM',
    '012:00 PM - 02:00 PM',
    '012:00 PM - 02:00 PM',
  ];

  constructor(
    private dialogRef: MatDialogRef<EditAttendance2Component>,
  ) { }

  closeDialog(){
    this.dialogRef.close();
  }
}
