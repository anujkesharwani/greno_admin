import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsService } from '../agent-catelogue-setting.service';
import { NotificationService } from 'src/app/Shared/core/notification.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls:[ './modal.component.scss'],

})
export class ModalComponent {
  question: string = '';
  answer: string = '';
  showQuestion: boolean = true;
  type: string = 'Add'||'Edit';
  updateId: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public faq: any,
    private settingsService: SettingsService,
    private dialogRef: MatDialogRef<ModalComponent>,
    private alert: NotificationService
  ) {
    if (faq) {
      this.type = 'Edit';
      this.updateId = faq.id;
      this.question = faq.question;
      this.answer = faq.answer;
      this.showQuestion = faq.showQuestion;
    }
  }





  saveQuestion() {
    const questionData = {
      question: this.question,
      answer: this.answer,
     showQuestion: this.showQuestion
    };
    switch(this.type){
      case 'Add':
        this.settingsService.addQuestion(questionData);
        break;
      case 'Edit':
         this.settingsService.updateQuestion(this.updateId,questionData);
        break;
    }
    this.alert.presentSuccessToast('FAQ Added Successfully');
    this.closeModal("EditUpdate");
  }

  change(event:any,name:string){
    switch(name){
      case 'question':
        this.question = event.target.value;
        break;
      case 'answer':
        this.answer = event.target.value;
        break;
    }
  }

  closeModal(type:string="Closed") {
    this.dialogRef.close(type);
  }
}
