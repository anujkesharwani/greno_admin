import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsComponent } from './bookings.component';
import { MatMenuModule } from '@angular/material/menu';
import { BookingCardComponent } from './booking-card/booking-card.component';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { SelectAgentComponent } from './select-agent/select-agent.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalsComponent } from './modals/modals.component';
import { OtpVerificationComponent } from './modals/otp-verification/otp-verification.component';
import { AvailableAgentsComponent } from './modals/available-agents/available-agents.component';
import { InvoiceComponent } from './modals/invoice/invoice.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { JobImagesComponent } from './modals/job-images/job-images.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpandableCardsComponent } from './expandable-cards/expandable-cards.component';
import { CreateBookingComponent } from './modals/create-booking/create-booking.component';
import { AddAddressComponent } from './modals/create-booking/add-address/add-address.component';
import { CreateCustomerComponent } from './modals/create-booking/create-customer/create-customer.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { CancelBookingComponent } from './modals/cancel-booking/cancel-booking.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NoBookingComponent } from './modals/no-booking/no-booking.component';
import { HttpClientModule } from '@angular/common/http';
import { AddItemsComponent } from './modals/add-items/add-items.component';

@NgModule({
  declarations: [
    BookingsComponent,
    BookingCardComponent,
    SelectAgentComponent,
    ModalsComponent,
    OtpVerificationComponent,
    AvailableAgentsComponent,
    InvoiceComponent,
    JobImagesComponent,
    ExpandableCardsComponent,
    CreateBookingComponent,
    AddAddressComponent,
    CreateCustomerComponent,
    CancelBookingComponent,
    NoBookingComponent,
    AddItemsComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    MatMenuModule,
    MatButtonModule,
    DragDropModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDialogModule,
    DialogModule,
    NgSelectModule,
    HttpClientModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class BookingsModule {}
