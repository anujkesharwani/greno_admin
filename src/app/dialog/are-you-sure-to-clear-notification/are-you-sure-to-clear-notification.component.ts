import { Component,ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-are-you-sure-to-clear-notification',
  templateUrl: './are-you-sure-to-clear-notification.component.html',
  styleUrls: ['./are-you-sure-to-clear-notification.component.scss']
})
export class AreYouSureToClearNotificationComponent {
  constructor(
    public dialogRef:MatDialogRef<AreYouSureToClearNotificationComponent>
  ){}

  closeDialog(){
    this.dialogRef.close();
  }
}
