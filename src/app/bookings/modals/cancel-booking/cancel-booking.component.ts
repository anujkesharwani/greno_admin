import { Component, OnInit, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Utils from "src/app/Shared/shared-services/util";
import { UserNotificationService } from "src/app/common/user-notification.service";
import { BookingService } from "src/app/core/booking.service";

@Component({
  selector: "app-cancel-booking",
  templateUrl: "./cancel-booking.component.html",
  styleUrls: ["./cancel-booking.component.scss"],
})
export class CancelBookingComponent implements OnInit {
  inputForm = this.fb.group({
    cancelReason: ["", Validators.required],
    cancelReasonText: [""],
  });

  reasons = ["Customer Not Reachable", "Wrong Address", "Emergency", "Other"];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CancelBookingComponent>,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private userNotificationService: UserNotificationService
  ) {}

  ngOnInit() {}

  cancelSubmit() {
    this.bookingService.updateBooking(
      this.data.currentUser.userId,
      this.data.id,
      Utils.stageMaster.discarded.key,
      this.data.isDelivery,
      undefined,
      this.inputForm.value
    );
    this.userNotificationService.addUserNotification(
      this.data.currentUser.userId,
      this.userNotificationService.message.bookingRejected
    );
    this.dialogRef.close({ res: true });
  }
}
