import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsService } from '../agent-catelogue-setting.service';
import { NotificationService } from 'src/app/Shared/core/notification.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class DeleteModalComponent {
  deleteId: any = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public id: any,
    private settingsService: SettingsService,
    private dialogRef: MatDialogRef<DeleteModalComponent>,
    private alert: NotificationService,
  ) {
    if (id) {
      this.deleteId=id
     }
  }

  deleteQuestion() {
    this.settingsService.deleteQuestion(this.deleteId)
    this.alert.presentSuccessToast('FAQ Added Successfully');
    this.closeModal("Deleted");
  }
  closeModal(type:string="Closed") {
    this.dialogRef.close(type);
  }
}
