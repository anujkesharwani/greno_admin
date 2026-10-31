import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SettingsService } from './agent-catelogue-setting.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { tr } from '@faker-js/faker';
import { NotificationService } from '../Shared/core/notification.service';
import { ModalComponent } from './add-faq-modal/modal.component';
import { ContactSettings } from './settings.structure';
import { DeleteModalComponent } from './delete-faq-modal/modal.component';
@Component({
  selector: 'app-agent-catalogue',
  templateUrl: './agent-catalogue.component.html',
  styleUrls: ['./agent-catalogue.component.scss'],
})
export class AgentCatalogueComponent implements OnInit {
  alwaysExpand: boolean = true;
  panelOpenState: any;
  isLoading: boolean = true;
  phoneNumbers: any = [];
  whatsAppNumbers: any = [];
  emails: any = [];
  timePeriod: any;
  FAQ: any = [];

  tempEmails: any = [];
  tempPhones: any = [];
  tempWhatsAppNumbers: any = [];

  constructor(
    private settingsService: SettingsService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private alert: NotificationService
  ) {}
  reloadPage() {
    window.location.reload();
  }
  toggleFaQ(toggle: boolean) {
    this.settingsService.toggleFaQ(toggle);
  }

  ngOnInit() {
    this.getAllContacts();
    this.getAllFaQs();
    if (!this.isLoading)
      this.alert.presentSuccessToast('Successfully Updated Contact Details');
  }

  saveTime() {
    if (this.timePeriod < 0) {
      this.alert.presentErrorToast('Please enter a valid time period!');
      return;
    }
    this.settingsService
      .updateContactSettings({
        timePeriod: this.timePeriod,
      } as ContactSettings)
      .then(() => {
        this.alert.presentSuccessToast('Time period updated!');
      });
  }

  changeQuestionStatus(id: any, status: boolean) {
    this.settingsService.changeQuestionStatus(id, status);
    this.alert.presentToast('update View');
  }

  updateTime() {
    this.settingsService.updateTimePeriod(this.timePeriod);
    this.alert.presentSuccessToast('Successfully Updated Time Period');
  }

  onChange(event: any, index: number, arrayName: string) {
    switch (arrayName) {
      case 'emails':
        this.tempEmails[index] = event;
        break;
      case 'phoneNumbers':
        this.tempPhones[index] = event;
        break;
      case 'whatsAppNumbers':
        this.tempWhatsAppNumbers[index] = event;
        break;
      case 'timePeriod':
        this.timePeriod = event.target.value;
    }
  }

  // Contact Functions  //

  // 1. Get all contacts
  getAllContacts() {
    this.settingsService.getAllContacts().subscribe((data: any) => {
      this.emails = data.emails;
      this.phoneNumbers = data.phones;
      this.whatsAppNumbers = data.whatsAppNumbers;
      this.timePeriod = data.timePeriod;
      this.tempEmails = [...this.emails];
      this.tempPhones = [...this.phoneNumbers];
      this.tempWhatsAppNumbers = [...this.whatsAppNumbers];

      this.cdr.detectChanges();
    });
  }

  // 2. Update Contact
  updateContact() {
    for (const mobileNumber of this.tempPhones) {
      if (
        !mobileNumber.match(
          /^(\+91\s?)?[1-9][0-9]{4}-[0-9]{5}$/
        )
      ) {
        this.alert.presentErrorToast('Please enter valid mobile numbers!');
        return;
      }
    }
    for (const whatsappNumber of this.tempWhatsAppNumbers) {
      if (
        !whatsappNumber.match(
          /^(\+91\s?)?[1-9][0-9]{4}-[0-9]{5}$/
        )
      ) {
        this.alert.presentErrorToast('Please enter valid WhatsApp numbers!');
        return;
      }
    }
    for (const email of this.tempEmails) {
      if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        this.alert.presentErrorToast('Please enter valid emails!');
        return;
      }
    }
    const contactData = {
      emails: this.tempEmails,
      phones: this.tempPhones,
      whatsAppNumbers: this.tempWhatsAppNumbers,
      timePeriod: this.timePeriod,
    };
    this.settingsService.addContact(contactData);
    if (!this.isLoading)
      this.alert.presentSuccessToast('Successfully Updated Contact Details');
    this.getAllContacts();
  }

  // FAQ Functions  //

  // 1. Get all FAQs
  async getAllFaQs() {
    try {
      const faqs = await this.settingsService.getAllFaQs();
      this.FAQ = faqs;
      this.settingsService.getToggleFaQ().subscribe((data: any) => {
        this.panelOpenState = data.showFaQ;
      });
      this.isLoading = false;
    } catch (error) {
      console.error('Error retrieving FAQs:', error);
    }
  }

  // 2. Add a new FAQ
  addFaQ() {
    const dialogRef = this.dialog.open(ModalComponent);
    this.handleAfter(dialogRef);
  }

  // 3. Update an existing FAQ
  editFaQ(faq: any) {
    const dialogRef = this.dialog.open(ModalComponent, { data: faq });
    this.handleAfter(dialogRef);
  }

  // 4. Delete an existing FAQ
  deleteFaQ(id: any) {
    this.alwaysExpand = true;
    const dialogRef = this.dialog.open(DeleteModalComponent, { data: id });
    this.handleAfter(dialogRef);
  }

  handleAfter(dialogRef: any) {
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result != 'Closed') {
        this.getAllFaQs();
      }
    });
  }
}
