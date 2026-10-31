import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditAttendance2Component } from '../edit-attendance2/edit-attendance2.component';

@Component({
  selector: 'app-edit-attendance1',
  templateUrl: './edit-attendance1.component.html',
  styleUrls: ['./edit-attendance1.component.scss']
})
export class EditAttendance1Component {

  tableData = [
    {
      date: '1 jul 2023',
      day: 'Sunday',
      status: 'Present',
      timing: ['yes', 'no', 'no', 'no', 'no']
    }, {
      date: '2 jul 2023',
      day: 'Monday',
      status: 'Absent',
      timing: ['yes', 'yes', 'yes', 'no', 'no']
    }, {
      date: '3 jul 2023',
      day: 'Wednesday',
      status: 'Present',
      timing: ['yes', 'yes', 'no', 'no', 'yes']
    }, {
      date: '1 jul 2023',
      day: 'Sunday',
      status: 'Present',
      timing: ['yes', 'yes', 'yes', 'no', 'no']
    }, {
      date: '1 jul 2023',
      day: 'Sunday',
      status: 'Present',
      timing: ['yes', 'yes', 'no', 'no', 'yes']
    }, {
      date: '1 jul 2023',
      day: 'Sunday',
      status: 'Present',
      timing: ['yes', 'no', 'no', 'no', 'no']
    },
  ];

  constructor(
    private dialogRef: MatDialogRef<EditAttendance1Component>,
    private dialog: MatDialog
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  openDialog() {
    this.dialog.open(EditAttendance2Component);
  }
}
