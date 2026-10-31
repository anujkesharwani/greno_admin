import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import {
  serviceVariant,
  stageStructure,
  stageStructureUpdated,
  timeLineStructure,
} from "./modals.structure";
import Utils from "src/app/Shared/shared-services/util";
import { BookingService } from "src/app/core/booking.service";
import moment from "moment";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/Shared/dialog/dialog.component";
import { AvailableAgentsComponent } from "./available-agents/available-agents.component";
import { OtpVerificationComponent } from "./otp-verification/otp-verification.component";
import { CancelBookingComponent } from "./cancel-booking/cancel-booking.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { JobImagesComponent } from "./job-images/job-images.component";
import { BookingInvoiceService } from "./invoice.service";
import { HttpClient } from "@angular/common/http";
import { UserNotificationService } from "src/app/common/user-notification.service";
import { AgentsService } from "src/app/agents/agents.service";
import { Observable, Subscription, interval, of } from "rxjs";
import { CustomerService } from "src/app/customers/customer.service";
import { AuthService } from "src/app/auth/auth.service";
import { AddItemsComponent } from "./add-items/add-items.component";

@Component({
  selector: "app-modals",
  templateUrl: "./modals.component.html",
  styleUrls: ["./modals.component.scss"],
})
export class ModalsComponent implements OnInit, OnDestroy {
  bookingStages: any;
  stages: stageStructure[] = [];
  timelineStages: timeLineStructure[] = [];
  timelineStagesPickup: any[] = [];
  timelineStagesDelivery: any[] = [];
  utils = Utils;
  dataUpdated: stageStructureUpdated = {
    id: "",
    name: "",
    title: "",
    colorClass: "",
    isDelivery: false,
    color: "",
    allStagesTime: "",
    progressDeliveryAt: "",
    bookingTime: "",
    serviceDate: "",
    deliveryOtpAt: "",
    slotTime: "",
    jobStartTime: "",
    allotmentPickupAt: "",
    allotmentDeliveryAt: "",
    jobEndTime: "",
    pickupTime: "",
    deliveryTime: "",
    pickupAcceptedAt: "",
    deliveryAcceptedAt: "",
    agentName: "",
    agentContactNo: "",
    stageStatus: false,
    progress: 0,
    button1: "",
    button2: "",
    button3: "",
    jobOTP: "",
    jobAcceptanceCharge: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    userPhoto: "",
    agentPhoto: "",
    billing: {
      discount: "",
      grandTotal: "",
      tax: "",
      subTotal: "",
      fixedCharges: [],
    },
    variants: [],
    stage: "",
    cancelReason: "",
    cancelReasonText: "",
    payment: {},
    isRefunded: false,
  };
  bookingAssignment: any[] = [];
  agentBookingSlot: any[] = [];

  showOtpmessage: boolean = false;
  agentDetails: any;
  customerDetails: any;
  refreshInterval: Subscription;

  constructor(
    public _bookingService: BookingService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalsComponent>,
    private bookingInvoiceService: BookingInvoiceService,
    private http: HttpClient,
    private userNotificationService: UserNotificationService,
    private agentsService: AgentsService,
    private customerService: CustomerService,
    public AuthService: AuthService
  ) {
    this.bookingStages = Utils.stageMaster;
    this.timelineStagesPickup = Utils.timelineStagesPickup;
    this.timelineStagesDelivery = Utils.timelineStagesDelivery;

    this.refreshInterval = interval(5000)
      .pipe()
      .subscribe(() => {
        this.refreshData();
      });
  }

  async ngOnInit() {
    this.init();
    this.getBookingsAssignment();
    if (this.data.stage === Utils.stageMaster.acceptancePending.key) {
      this.getAgentBookingSlots();
    }
    await this.getAgentDetails();
  }

  ngOnDestroy() {
    this.refreshInterval.unsubscribe();
  }

  paymentModes = {
    pre: "Pre Paid Online",
    post: "Pay After Job",
  };
  get paymentMode() {
    const paylater = this.data.isPaylater;
    if (!paylater) {
      return this.paymentModes.pre;
    }
    return this.paymentModes.post;
  }

  paymentStats = {
    completed: "Completed",
    pending: "Pending",
    failed: "Failed",
    refund: "In Refund",
  };
  get paymentStatus() {
    const isPaid = this.data.isPaid;
    const isRefunded = this.data.isRefunded;
    if (isRefunded) {
      return this.paymentStats.refund;
    }
    if (isPaid) {
      return this.paymentStats.completed;
    } else {
      return this.paymentStats.pending;
    }
  }

  async init() {
    const bookingVariants: any[] = [];
    this.data.services.forEach((item: any) => {
      bookingVariants.push(item);
      // item.variants.forEach((element: any) => {
      //   bookingVariants.push({...element, name: item.name});
      // });
    });
    await this.getUserDetails();
    this.getAgentDetails().then((data) => {
      this.dataUpdated = {
        id: this.data.id,
        isDelivery: this.data.isDelivery,
        name: this.bookingStages[this.data.stage]["text"],
        title: this.data.stage,
        color: this.bookingStages[this.data.stage]["textColor"],
        colorClass: this.bookingStages[this.data.stage]["color"],
        allStagesTime: this.data.billing.totalJobTime,
        bookingTime: moment(this.data.createdAt.toDate()).format("DD MMM YYYY"),
        serviceDate: moment(
          new Date(this.data.timeSlot.date.seconds * 1000)
        ).format("DD MMM YYYY"),
        slotTime: moment(
          new Date(this.data.timeSlot.time.startTime.seconds * 1000)
        ).format("HH:mm a"),
        jobStartTime: this.data.otpAt
          ? moment(new Date(this.data.otpAt.seconds * 1000)).format("HH:mm a")
          : "",
        jobEndTime: this.data.completedAt
          ? moment(new Date(this.data.completedAt.seconds * 1000)).format(
              "HH:mm a"
            )
          : "",
        pickupTime: this.data.pickupTime
          ? moment(new Date(this.data.pickupTime.seconds * 1000)).format(
              "HH:mm a"
            )
          : "",
        deliveryTime: this.data.deliveryTime
          ? moment(new Date(this.data.deliveryTime.seconds * 1000)).format(
              "HH:mm a"
            )
          : "",
        pickupAcceptedAt: this.data.pickupAcceptedAt
          ? moment(new Date(this.data.pickupAcceptedAt.seconds * 1000)).format(
              "HH:mm a"
            )
          : "",
        deliveryAcceptedAt: this.data.deliveryAcceptedAt
          ? moment(
              new Date(this.data.deliveryAcceptedAt.seconds * 1000)
            ).format("HH:mm a")
          : "",
        allotmentPickupAt: this.data.allotmentPickupAt
          ? moment(new Date(this.data.allotmentPickupAt.seconds * 1000)).format(
              "HH:mm a"
            )
          : "",
        allotmentDeliveryAt: this.data.allotmentDeliveryAt
          ? moment(
              new Date(this.data.allotmentDeliveryAt.seconds * 1000)
            ).format("HH:mm a")
          : "",
        deliveryOtpAt: this.data.deliveryOtpAt
          ? moment(new Date(this.data.deliveryOtpAt.seconds * 1000)).format(
              "HH:mm a"
            )
          : "",
        progressDeliveryAt: this.data.progressDeliveryAt
          ? moment(
              new Date(this.data.progressDeliveryAt.seconds * 1000)
            ).format("HH:mm a")
          : "",
        agentName: this.agentDetails?.name || "",
        agentContactNo: this.agentDetails?.phoneNumber || "",
        agentPhoto: this.agentDetails?.photoUrl || "",
        stageStatus: false,
        stage: this.data.stage,
        progress: 0,
        button1: "Download booking",
        button2: "Cancel booking",
        button3: "Complete booking",
        jobOTP: this.data.jobOtp,
        jobAcceptanceCharge: this.data.billing.totalJobAcceptanceCharge,
        customerName: this.customerDetails?.name,
        customerPhone: this.data.currentUser.phoneNumber,
        customerAddress:
          this.data.address.addressLine1 +
          " " +
          this.data.address.formatted_address,
        userPhoto: this.customerDetails?.photoUrl || "",
        billing: {
          discount: this.data.billing.discount,
          grandTotal: this.data.billing.grandTotal,
          tax: this.data.billing.tax,
          subTotal: this.data.billing.subTotal,
          fixedCharges: this.data.billing.fixedCharges,
        },
        variants: bookingVariants,
        cancelReason: this.data.cancelReason,
        cancelReasonText: this.data.cancelReasonText,
        payment: this.data.payment,
        isRefunded: this.data.isRefunded,
      };
      console.log(this.dataUpdated);
    });
    if (
      this.data.stage == this.bookingStages.expired.key ||
      this.data.stage == this.bookingStages.discarded.key
    ) {
      for (let j = 0; j < this.timelineStagesPickup.length; j++) {
        this.timelineStagesPickup[j].status = false;
      }
      for (let j = 0; j < this.timelineStagesDelivery.length; j++) {
        this.timelineStagesDelivery[j].status = false;
      }
    } else {
      let activeTimelineIndexPickup = this.timelineStagesPickup.findIndex(
        (item) => item.key == this.data.stage
      );
      let activeTimelineIndexDelivery = this.timelineStagesDelivery.findIndex(
        (item) => item.key == this.data.stage
      );

      // if (
      //   this.data.stage === "allotmentPending" &&
      //   this.data.isDelivery == false
      // )
      if (this.data.isDelivery)
        activeTimelineIndexPickup = this.timelineStagesPickup.length;
      else activeTimelineIndexDelivery = -1;

      for (let j = 0; j < this.timelineStagesPickup.length; j++) {
        this.timelineStagesPickup[j].status =
          j < activeTimelineIndexPickup ? true : false;
        if (
          this.data.stage === Utils.stageMaster.inProgress.key ||
          this.data.stage === Utils.stageMaster.completed.key
        ) {
          this.timelineStagesPickup[j].status =
            j <= activeTimelineIndexPickup ? true : false;
        }
      }
      for (let j = 0; j < this.timelineStagesDelivery.length; j++) {
        this.timelineStagesDelivery[j].status =
          j < activeTimelineIndexDelivery ? true : false;
        if (
          this.data.stage === Utils.stageMaster.inProgress.key ||
          this.data.stage === Utils.stageMaster.completed.key
        ) {
          this.timelineStagesDelivery[j].status =
            j <= activeTimelineIndexDelivery ? true : false;
        }
      }
    }
    this.timelineStagesPickup = this.timelineStagesPickup.map((item) => {
      item.date = "---";
      item.time = "---";
      if (item.dateKey && this.data[item.dateKey]) {
        item.date = Utils.formatDate(this.data[item.dateKey].seconds, "DD MMM");
        item.time = Utils.formatDate(
          this.data[item.dateKey].seconds,
          "hh:mm A"
        );
      }
      return item;
    });
    this.timelineStagesDelivery = this.timelineStagesDelivery.map((item) => {
      item.date = "---";
      item.time = "---";
      if (item.dateKey && this.data[item.dateKey]) {
        item.date = Utils.formatDate(this.data[item.dateKey].seconds, "DD MMM");
        item.time = Utils.formatDate(
          this.data[item.dateKey].seconds,
          "hh:mm A"
        );
      }
      return item;
    });
  }

  async getAgentDetails() {
    if (!this.data.assignedAgent) {
      return of();
    }
    return await this.agentsService
      .getAgentById(this.data.assignedAgent)
      .then((data) => {
        data.docs.map((agent) => {
          this.agentDetails = agent.data();
        });
      });
  }

  async getUserDetails() {
    if (!this.data.currentUser) {
      return of();
    }
    return await this.customerService
      .getCustomerById(this.data.currentUser.userId)
      .then((data) => {
        data.docs.map((customer) => {
          this.customerDetails = customer.data();
        });
      });
  }

  getBookingsAssignment() {
    try {
      this._bookingService
        .getBookingsAssignment(this.data.currentUser.userId, this.data.id)
        .then((assignments) => {
          assignments.docs.map((assignment: any) => {
            if (
              !assignment.data().actionPerformed &&
              assignment.data().agentId === this.data.assignedAgent
            ) {
              this.bookingAssignment.push({
                ...assignment.data(),
                id: assignment.id,
              });
            }
          });
        });
    } catch (e) {}
  }

  getAgentBookingSlots() {
    this._bookingService
      .getAgentBookingSlots(
        this.data.assignedAgent,
        moment(
          new Date(this.data.timeSlot.time.startTime.seconds * 1000)
        ).format("YYYY-MM-DD")
      )
      .then((slots) => {
        slots.docs.map((slot: any) => {
          this.agentBookingSlot.push({ ...slot.data(), id: slot.id });
        });
      });
  }

  stageChange(id: any) {
    for (let i = 0; i < this.stages.length; i++) {
      if (id == this.stages[i].name) {
        this.data = {
          name: this.stages[i].name,
          title: this.stages[i].title,
          color: this.stages[i].color,
          allStagesTime: this.stages[i].allStagesTime,
          bookingTime: this.stages[i].bookingTime,
          serviceDate: this.stages[i].serviceDate,
          slotTime: this.stages[i].slotTime,
          jobStartTime: this.stages[i].jobStartTime,
          jobEndTime: this.stages[i].jobEndTime,
          agentName: this.stages[i].agentName,
          agentContactNo: this.stages[i].agentContactNo,
          stageStatus: this.stages[i].stageStatus,
          progress: this.stages[i].progress,
          button1: this.stages[i].button1,
          button2: this.stages[i].button2,
          button3: this.stages[i].button3,
        };
        if (
          id == Utils.stageMaster.expired.key ||
          id == Utils.stageMaster.discarded.key
        ) {
          for (let j = 0; j < this.timelineStages.length; j++) {
            this.timelineStages[j].status = false;
          }
        } else
          for (let j = 0; j < this.timelineStages.length; j++) {
            if (j <= i) this.timelineStages[j].status = true;
            else this.timelineStages[j].status = false;
          }
        break;
      }
    }
  }

  copyToClipboard(dataToCopy: string) {
    navigator.clipboard.writeText(dataToCopy);
    this.showOTPCopiedMessage();
  }

  showOTPCopiedMessage() {
    this.showOtpmessage = true;
    setTimeout(() => {
      this.showOtpmessage = false;
    }, 1000);
  }

  async refreshData() {
    await this._bookingService
      .getBookingsById(this.data.currentUser.userId, this.data.id)
      .then((bookings) => {
        bookings.docs.map((booking) => {
          this.data = { ...booking.data(), id: booking.id };
          this.init();
        });
      });
  }

  cancelBooking() {
    this.dialog
      .open(CancelBookingComponent, { data: { ...this.data } })
      .afterClosed()
      .subscribe(async (data) => {
        if (data) {
          await this.refreshData();
        }
      });
  }

  async allotBooking() {
    this.dialog
      .open(AvailableAgentsComponent, { data: { ...this.data } })
      .afterClosed()
      .subscribe(async (data) => {
        await this.refreshData();
        this.getAgentBookingSlots();
      });
  }

  async acceptBooking() {
    this.getBookingsAssignment();
    this.dialog
      .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
      .afterClosed()
      .subscribe(async (data) => {
        if (data) {
          await this._bookingService.updateBooking(
            this.data.currentUser.userId,
            this.data.id,
            Utils.stageMaster.jobAccepted.key,
            this.data.isDelivery
          );
          await this._bookingService.updAgentBookingSlots(
            this.data.assignedAgent,
            this.agentBookingSlot[0].id,
            {
              ...this.agentBookingSlot[0],
              bookings: [
                ...this.agentBookingSlot[0].bookings,
                {
                  slotId: this.data.timeSlot.id,
                  bookingId: this.data.id,
                },
              ],
            }
          );
          this.bookingAssignment &&
            this.bookingAssignment.length &&
            (await this._bookingService.updateBookingAssignment(
              this.data.currentUser.userId,
              this.data.id,
              this.bookingAssignment[0].id,
              {
                actionPerformed: true,
                accepted: true,
                acceptanceTime: new Date(),
              }
            ));
          await this.userNotificationService.addUserNotification(
            this.data.currentUser.userId,
            this.userNotificationService.message.bookingAccepted
          );

          console.log(this.data);
          await this.refreshData();
        }
      });
  }

  enterOTP() {
    this.dialog
      .open(OtpVerificationComponent, { data: { ...this.data } })
      .afterClosed()
      .subscribe(async (data) => {
        if (data) {
          this.addItem(false);
          await this.refreshData();
        }
      });
  }

  completeBooking() {
    this.dialog
      .open(InvoiceComponent, { data: { ...this.data } })
      .afterClosed()
      .subscribe(async (data) => {
        await this.refreshData();
      });
  }

  // uploadImages(after: boolean) {
  //   this.dialog
  //     .open(JobImagesComponent, {
  //       disableClose: true,
  //       data: { ...this.data, after },
  //     })
  //     .afterClosed()
  //     .subscribe(async (data) => {
  //       await this.refreshData();
  //     });
  // }

  addItem(after: boolean) {
    this.dialog
      .open(AddItemsComponent, {
        disableClose: true,
        data: { ...this.data, after },
      })
      .afterClosed()
      .subscribe(async (data) => {
        await this.refreshData();
      });
  }

  downloadInvoice() {
    this.bookingInvoiceService.downloadInvoice(this.data);
  }
}
