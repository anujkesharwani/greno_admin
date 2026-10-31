import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportsRoutingModule } from "./reports-routing.module";
import { ReportsComponent } from "./reports.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialogModule } from "@angular/material/dialog";
import { DayLineChartComponent } from "./day-line-chart/day-line-chart.component";
import { CategoryPieComponent } from "./category-pie/category-pie.component";
import { DaySummaryDialogComponent } from "./day-summary-dialog/day-summary-dialog.component";
import { AllBookingsDialogComponent } from "./all-bookings-dialog/all-bookings-dialog.component";
import { PickupCompletedBookingComponent } from "./pickup-completed-booking/pickup-completed-booking.component";
import { DelivaryCompletedBookingComponent } from "./delivary-completed-booking/delivary-completed-booking.component";
import { CanceledBookingComponent } from "./canceled-booking/canceled-booking.component";
import { WashInProgressComponent } from "./wash-in-progress/wash-in-progress.component";
import { AdminCreatedBookingComponent } from "./admin-created-booking/admin-created-booking.component";
import { CustomerCreatedBookingComponent } from "./customer-created-booking/customer-created-booking.component";
import { PrepaidBookingComponent } from "./prepaid-booking/prepaid-booking.component";
import { PaylaterBookingComponent } from "./paylater-booking/paylater-booking.component";
import { DiscountBookingComponent } from "./discount-booking/discount-booking.component";
import { SlotWiseSummaryComponent } from './slot-wise-summary/slot-wise-summary.component';
import { CustomerWiseSummaryComponent } from './customer-wise-summary/customer-wise-summary.component';
import { AreaWiseSummaryComponent } from './area-wise-summary/area-wise-summary.component';
import { AgentWiseSummaryComponent } from './agent-wise-summary/agent-wise-summary.component';
import { ServiceWiseSummaryComponent } from './service-wise-summary/service-wise-summary.component';
import { ItemWiseSummaryComponent } from './item-wise-summary/item-wise-summary.component';

@NgModule({
  declarations: [
    ReportsComponent,
    DayLineChartComponent,
    CategoryPieComponent,
    DaySummaryDialogComponent,
    AllBookingsDialogComponent,
    PickupCompletedBookingComponent,
    DelivaryCompletedBookingComponent,
    CanceledBookingComponent,
    WashInProgressComponent,
    AdminCreatedBookingComponent,
    CustomerCreatedBookingComponent,
    PrepaidBookingComponent,
    PaylaterBookingComponent,
    DiscountBookingComponent,
    SlotWiseSummaryComponent,
    CustomerWiseSummaryComponent,
    AreaWiseSummaryComponent,
    AgentWiseSummaryComponent,
    ServiceWiseSummaryComponent,
    ItemWiseSummaryComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
  ],
})
export class ReportsModule {}
