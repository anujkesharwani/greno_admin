import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/Shared/core/notification.service';
import { CustomerSettingsService } from '../customer-settings-service.service';

@Component({
  selector: 'app-booking-charges',
  templateUrl: './booking-charges.component.html',
  styleUrls: ['./booking-charges.component.scss']
})
export class BookingChargesComponent {

  chargeAddForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    active: [false],
    id: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private customerSettingsService: CustomerSettingsService
  ){
    this.data && this.chargeAddForm.patchValue(this.data);
  }

  ngOnInit():void {

  }

  addCharge(){
    if (this.data) {
      this.customerSettingsService.updateCharges(this.chargeAddForm.value).then((response: any) => {
        this.notificationService.presentSuccessToast(
          'Charge updated successfully'
        );
        this.closeDialog();
      });
    } else {
      this.customerSettingsService.addCharges(this.chargeAddForm.value).then((response: any) => {
        this.notificationService.presentSuccessToast(
          'Charge added successfully'
        );
        this.closeDialog();
      });
    }
  }

  closeDialog(){
    this.dialog.closeAll();
  }

}
