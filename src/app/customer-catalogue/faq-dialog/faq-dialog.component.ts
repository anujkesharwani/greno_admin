import { Component, Inject } from '@angular/core';
import { FAQ } from '../faq.structure';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/Shared/core/notification.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-faq-dialog',
  templateUrl: './faq-dialog.component.html',
  styleUrls: ['./faq-dialog.component.scss'],
})
export class FAQDialogComponent {
  faq: FAQ | undefined;
  editMode: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<FAQDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertify: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.faq) {
      this.faq = { ...this.data.faq };
      this.editMode = true;
    } else {
      this.faq = {
        show: true,
      } as FAQ;
      this.editMode = false;
    }
  }

  save(): void {
    if (!this.faq!.question) {
      this.alertify.presentErrorToast('Please enter a question');
      return;
    }
    if (!this.faq!.answer) {
      this.alertify.presentErrorToast('Please enter a answer');
      return;
    }
    this.faq!.createdAt = Timestamp.now();
    this.dialogRef.close(this.faq);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
