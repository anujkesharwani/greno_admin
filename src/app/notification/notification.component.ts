import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationConfirmationDialogComponent } from '../dialog/notification-confirmation-dialog/notification-confirmation-dialog.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  data = [
    {
      h1: 'New Booking Request Received',
      h2: 'Hi, Booking request #JC3215-90 for Date: 08 April 2023 has been received.',
      day: 'Today',
      time: '12:46',
      new: true
    },
    {
      h1: 'New Booking Request Received',
      h2: 'Hi, Booking request #JC3215-90 for Date: 08 April 2023 has been received.',
      day: 'Today',
      time: '12:46',
      new: false
    },
    {
      h1: 'New Booking Request Received',
      h2: 'Hi, Booking request #JC3215-90 for Date: 08 April 2023 has been received.',
      day: 'Today',
      time: '12:46',
      new: false
    },
    {
      h1: 'New Booking Request Received',
      h2: 'Hi, Booking request #JC3215-90 for Date: 08 April 2023 has been received.',
      day: 'Today',
      time: '12:46',
      new: false
    },
    {
      h1: 'New Booking Request Received',
      h2: 'Hi, Booking request #JC3215-90 for Date: 08 April 2023 has been received.',
      day: 'Today',
      time: '12:46',
      new: false
    },
    {
      h1: 'New Booking Request Received',
      h2: 'Hi, Booking request #JC3215-90 for Date: 08 April 2023 has been received.',
      day: 'Today',
      time: '12:46',
      new: false
    },
  ];

  constructor(
    private dialog: MatDialog
  ) { }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(NotificationConfirmationDialogComponent);
  }
}
