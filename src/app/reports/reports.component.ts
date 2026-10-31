import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatDatepicker } from "@angular/material/datepicker";
import { DaySummaryDialogComponent } from "./day-summary-dialog/day-summary-dialog.component";
import { AllBookingsDialogComponent } from "./all-bookings-dialog/all-bookings-dialog.component";
import { DelivaryCompletedBookingComponent } from "./delivary-completed-booking/delivary-completed-booking.component";
import { PickupCompletedBookingComponent } from "./pickup-completed-booking/pickup-completed-booking.component";
import { CanceledBookingComponent } from "./canceled-booking/canceled-booking.component";
import { WashInProgressComponent } from "./wash-in-progress/wash-in-progress.component";
import { AdminCreatedBookingComponent } from "./admin-created-booking/admin-created-booking.component";
import { CustomerCreatedBookingComponent } from "./customer-created-booking/customer-created-booking.component";
import { PrepaidBookingComponent } from "./prepaid-booking/prepaid-booking.component";
import { PaylaterBookingComponent } from "./paylater-booking/paylater-booking.component";
import { DiscountBookingComponent } from "./discount-booking/discount-booking.component";
import { ReportsService } from "./reports.service";
import { SlotWiseSummaryComponent } from "./slot-wise-summary/slot-wise-summary.component";
import { CustomerWiseSummaryComponent } from "./customer-wise-summary/customer-wise-summary.component";
import { AreaWiseSummaryComponent } from "./area-wise-summary/area-wise-summary.component";
import { AgentWiseSummaryComponent } from "./agent-wise-summary/agent-wise-summary.component";
import { ServiceWiseSummaryComponent } from "./service-wise-summary/service-wise-summary.component";
import { ItemWiseSummaryComponent } from "./item-wise-summary/item-wise-summary.component";
import { AuthService } from "../auth/auth.service";
@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  refreshedAt: string = "";
  dateSelected: Date = new Date();
  today: Date = new Date();

  private dialogWidth = "90vw";
  private dialogHeight = "95vh";

  @ViewChild("picker") picker: MatDatepicker<Date> | undefined;

  constructor(
    private dialog: MatDialog,
    private ReportService: ReportsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.refreshedAt = "Refreshed at " + new Date().toLocaleTimeString();
    const endDate = this.dateSelected;
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);
    this.dateSelected = new Date();
    //this.ReportService.getWeekSummary(startDate,endDate)
  }

  isDateToday(date: Date): boolean {
    return (
      date.getFullYear() === this.today.getFullYear() &&
      date.getMonth() === this.today.getMonth() &&
      date.getDate() === this.today.getDate()
    );
  }

  resetDate(): void {
    this.dateSelected = new Date();
  }

  openSlotWiseSummary(): void {
    this.dialog.open(SlotWiseSummaryComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openAgentWiseSummary(): void {
    this.dialog.open(AgentWiseSummaryComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }

  openservicewiseSummary(): void {
    this.dialog.open(ServiceWiseSummaryComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }

  openItemWiseSummary(): void {
    this.dialog.open(ItemWiseSummaryComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openDaySummary(): void {
    this.dialog.open(DaySummaryDialogComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }

  openCustomerWiseSummary(): void {
    this.dialog.open(CustomerWiseSummaryComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }

  openAreaWiseSummary(): void {
    this.dialog.open(AreaWiseSummaryComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }

  openAllBookings(): void {
    this.dialog.open(AllBookingsDialogComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openDelivaryCompletedBooking(): void {
    this.dialog.open(DelivaryCompletedBookingComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openPickupCompletedBooking(): void {
    this.dialog.open(PickupCompletedBookingComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openCanceledBooking(): void {
    this.dialog.open(CanceledBookingComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openWashInProgressBooking(): void {
    this.dialog.open(WashInProgressComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openAdminCreatedBooking(): void {
    this.dialog.open(AdminCreatedBookingComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openCustomerCreatedBooking(): void {
    this.dialog.open(CustomerCreatedBookingComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openPrepaidBooking(): void {
    this.dialog.open(PrepaidBookingComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openPaylaterBooking(): void {
    this.dialog.open(PaylaterBookingComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
  openDiscountBooking(): void {
    this.dialog.open(DiscountBookingComponent, {
      minWidth: this.dialogWidth,
      maxHeight: this.dialogHeight,
      data: {
        dateSelected: this.dateSelected,
      },
    });
  }
}
