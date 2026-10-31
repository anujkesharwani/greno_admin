import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import Utils from "src/app/Shared/shared-services/util";
import { UserNotificationService } from "src/app/common/user-notification.service";
import { BookingService } from "src/app/core/booking.service";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InvoiceComponent>,
    private bookingService: BookingService,
    private userNotificationService: UserNotificationService
  ) {
    const bookingVariants: any[] = [];
    this.data.services.forEach((item: any) => {
      item.selectedItems.forEach((element: any) => {
        bookingVariants.push(element);
      });
    });
    this.data["variants"] = bookingVariants;
  }

  markAsDone() {
    this.bookingService.updateBooking(
      this.data.currentUser.userId,
      this.data.id,
      Utils.stageMaster.completed.key,
      this.data.isDelivery
    );
    this.userNotificationService.addAgentNotification(
      this.data.currentUser.userId,
      this.userNotificationService.message.bookingCompleted
    );
    this.dialogRef.close({ res: true });
  }
}
