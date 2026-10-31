import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';


import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
// import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { MatCardModule } from '@angular/material/card';
import { ReportTableComponent } from './report/report-table/report-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LedgerComponent } from './ledger/ledger.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AgentComponent } from './agent/agent.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TimeSlotComponent } from './agent/time-slot/time-slot.component';
import { AgentJobsComponent } from './agent/agent-jobs/agent-jobs.component';
import { PaymentSettlementComponent } from './agent/payment-settlement/payment-settlement.component';
import { UnapprovedAgentComponent } from './agent/unapproved-agent/unapproved-agent.component';
import { AdminHeaderComponent } from './Shared/admin-header/admin-header.component';
import { AdminSideNavComponent } from './Shared/admin-side-nav/admin-side-nav.component';
import { AdminFooterComponent } from './Shared/admin-footer/admin-footer.component';
import { WalletComponent } from './wallet/wallet.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddAddressDialogComponent } from './dialog/add-address-dialog/add-address-dialog.component';
import { AddNewCategoryDialogComponent } from './dialog/add-new-category-dialog/add-new-category-dialog.component';
import { EditAddressDialogComponent } from './dialog/edit-address-dialog/edit-address-dialog.component';
import { AddMoneyToWalletDialogComponent } from './dialog/add-money-to-wallet-dialog/add-money-to-wallet-dialog.component';
import { AreYouSureToClearNotificationComponent } from './dialog/are-you-sure-to-clear-notification/are-you-sure-to-clear-notification.component';
import { AssignAgentComponent } from './dialog/assign-agent/assign-agent.component';
import { BookingWillBeCanceledComponent } from './dialog/booking-will-be-canceled/booking-will-be-canceled.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { DiscountComponent } from './discount/discount.component';
import { MatMenuModule } from '@angular/material/menu';
import { ServiceComponent } from './service/service.component';
import { SApplianceRepairComponent } from './service/s-appliance-repair/s-appliance-repair.component';
import { SBathroomCleaningComponent } from './service/s-bathroom-cleaning/s-bathroom-cleaning.component';
import { SKitchenCleaningComponent } from './service/s-kitchen-cleaning/s-kitchen-cleaning.component';
import { SFullHomeCleaningComponent } from './service/s-full-home-cleaning/s-full-home-cleaning.component';
import { SSofaCarpetCleaningComponent } from './service/s-sofa-carpet-cleaning/s-sofa-carpet-cleaning.component';
import { SWaterTankCleaningComponent } from './service/s-water-tank-cleaning/s-water-tank-cleaning.component';
import { ServiceManagementComponent } from './service/s-appliance-repair/service-management/service-management.component';
import { LocationManagementComponent } from './service/s-appliance-repair/location-management/location-management.component';
import { TimeSlotManagementComponent } from './service/s-appliance-repair/time-slot-management/time-slot-management.component';
import { DayTimeManagementComponent } from './service/s-appliance-repair/day-time-management/day-time-management.component';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSalesComponent } from './dashboard/dashboard-sales/dashboard-sales.component';
import { DashboardOrdersComponent } from './dashboard/dashboard-orders/dashboard-orders.component';
import { DashboardRecentBookingsComponent } from './dashboard/dashboard-recent-bookings/dashboard-recent-bookings.component';
import { DashboardBookingPerformanceComponent } from './dashboard/dashboard-booking-performance/dashboard-booking-performance.component';
import { AddCategoryComponent } from './service/add-category/add-category.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditAttendance1Component } from './dialog/edit-attendance1/edit-attendance1.component';
import { EditAttendance2Component } from './dialog/edit-attendance2/edit-attendance2.component';
import { AddNewServiceDialogComponent } from './dialog/add-new-service-dialog/add-new-service-dialog.component';
import { EditServiceDialogComponent } from './dialog/edit-service-dialog/edit-service-dialog.component';
import { DebitDetialsDialogComponent } from './dialog/debit-detials-dialog/debit-detials-dialog.component';
import { CreditDetialsDialogComponent } from './dialog/credit-detials-dialog/credit-detials-dialog.component';
import { TransactionDetailsComponent } from './wallet/transaction-details/transaction-details.component';
import { GeneralComponent } from './settings/general/general.component';
import { DateTimeComponent } from './settings/date-time/date-time.component';
import { PoliciesComponent } from './settings/policies/policies.component';
import { PolicyDialogComponent } from './dialog/policy-dialog/policy-dialog.component';
import { ContentManagementComponent } from './settings/content-management/content-management.component';
import { GeneralSettingsComponent } from './settings/general/general-settings/general-settings.component';
import { EmailAndNotificationSettingsComponent } from './settings/general/email-and-notification-settings/email-and-notification-settings.component';
import { SystemLogsAndAuditingComponent } from './settings/general/system-logs-and-auditing/system-logs-and-auditing.component';
import { BackupAndRestoreComponent } from './settings/general/backup-and-restore/backup-and-restore.component';
import { SecuritySettingsComponent } from './settings/general/security-settings/security-settings.component';
import { DiscountsComponent } from './discount/discounts/discounts.component';
import { ApplianceRepairDiscountsComponent } from './discount/discounts/appliance-repair-discounts/appliance-repair-discounts.component';
import { BathroomCleaningDiscountsComponent } from './discount/discounts/bathroom-cleaning-discounts/bathroom-cleaning-discounts.component';
import { KitchenCleaningDiscountsComponent } from './discount/discounts/kitchen-cleaning-discounts/kitchen-cleaning-discounts.component';
import { FullHomeCleaningDiscountsComponent } from './discount/discounts/full-home-cleaning-discounts/full-home-cleaning-discounts.component';
import { SofaCarpetCleaningDiscountsComponent } from './discount/discounts/sofa-carpet-cleaning-discounts/sofa-carpet-cleaning-discounts.component';
import { WaterTankCleaningDiscountsComponent } from './discount/discounts/water-tank-cleaning-discounts/water-tank-cleaning-discounts.component';
import { NotificationComponent } from './notification/notification.component';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NotAdminComponent } from './auth/not-admin/not-admin.component';
import { SearchComponent } from './search/search.component';
import { AssignedDetailsComponent } from './dialog/assignedDetails/assignedDetails.component';
import { CompletedDetailsComponent } from './dialog/completed-details/completed-details.component';
import { PendingDetailsComponent } from './dialog/pending-details/pending-details.component';
import { SimplePendingDetailComponent } from './dialog/simple-pending-detail/simple-pending-detail.component';
import { LedgerConfirmationDialogComponent } from './dialog/ledger-confirmation-dialog/ledger-confirmation-dialog.component';
import { AgentCompletedDetailsComponent } from './dialog/agent-completed-details/agent-completed-details.component';
import { JobProofDetailsComponent } from './dialog/job-proof-details/job-proof-details.component';
import { NotCompletedDetailsComponent } from './dialog/not-completed-details/not-completed-details.component';
import { CustomersComponent } from './user/customers/customers.component';
import { NotificationConfirmationDialogComponent } from './dialog/notification-confirmation-dialog/notification-confirmation-dialog.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { ManagerUiComponent } from './Shared/core/storage/manager-ui/manager-ui.component';
import { AddServiceComponent } from './service/add-service/add-service.component';
import { AddNewBannerDialogComponent } from './settings/content-management/add-new-banner-dialog/add-new-banner-dialog.component';
import { EditBannerDialogComponent } from './settings/content-management/edit-banner-dialog/edit-banner-dialog.component';
import { NotificationService } from './Shared/core/notification.service';
import { StorageService } from './Shared/core/storage/storage.service';
import { CategoryService } from './service/category.service';
import {
  UserTrackingService,
  ScreenTrackingService,
  getAnalytics,
  provideAnalytics,
} from '@angular/fire/analytics';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaxesComponent } from './service/taxes/taxes.component';
import { AddComponent } from './service/taxes/add/add.component';
import { CouponsComponent } from './service/coupons/coupons.component';
import { CouponsModule } from './service/coupons/coupons.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { DialogModule } from '@angular/cdk/dialog';
import { ConfirmationDialogComponent } from './Shared/dialog/dialog.component';
import { ConfirmationDialogService } from './Shared/shared-services/modal-service.service';
import { EditTaxComponent } from './service/taxes/edit/edit-tax/edit-tax.component';
import { StatisticsComponent } from './dashboard/statistics/statistics.component';
import { BookingsPerDayComponent } from './dashboard/charts/bookings-per-day/bookings-per-day.component';
import { SlotWiseBookingsComponent } from './dashboard/charts/slot-wise-bookings/slot-wise-bookings.component';
import { AgentWiseBookingsComponent } from './dashboard/charts/agent-wise-bookings/agent-wise-bookings.component';
import { ServiceWiseBookingsComponent } from './dashboard/charts/service-wise-bookings/service-wise-bookings.component';
import { CompletedVsRejectedBookingsComponent } from './dashboard/charts/completed-vs-rejected-bookings/completed-vs-rejected-bookings.component';
import { AppComponent } from './app.component';
import { ChartContainerComponent } from './dashboard/charts/chart-container/chart-container.component';
import { ServiceMainComponent } from './service-main/service-main.component';
import { AreaWiseCatalogueComponent } from './area-wise-catalogue/area-wise-catalogue.component';
import { ServiceCataloguesComponent } from './service-catalogues/service-catalogues.component';
import { TimeSlotsComponent } from './time-slots/time-slots.component';
import { HttpClientModule } from '@angular/common/http';
import { AddAreaComponent } from './area-wise-catalogue/modal/add-area/add-area.component';
import { SettingsMainComponent } from './settings-main/settings-main.component';
import { UsersPermissionCatalogueComponent } from './users-permission-catalogue/users-permission-catalogue.component';
import { AdminCatalogueComponent } from './admin-catalogue/admin-catalogue.component';
import { AgentCatalogueComponent } from './agent-catalogue/agent-catalogue.component';
import { CustomerCatalogueComponent } from './customer-catalogue/customer-catalogue.component';
import { UserCardComponent } from './user-card/user-card.component';
import { CreateUserModalComponent } from './users-permission-catalogue/create-user-modal/create-user-modal.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './Shared/shared-services/loader.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddCityComponent } from './area-wise-catalogue/modal/add-city/add-city.component';
import { SwitchComponent } from './switch/switch.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { BannerDialogComponent } from './customer-catalogue/banner-dialog/banner-dialog.component';
import { DeleteDialogComponent } from './customer-catalogue/delete-dialog/delete-dialog.component';
import { BannerSectionComponent } from './customer-catalogue/banner-section/banner-section.component';
import { FAQDialogComponent } from './customer-catalogue/faq-dialog/faq-dialog.component';
// import { AllBookingComponent } from './booking/all-booking/all-booking.component';
// import { BookingComponent } from './booking/booking.component';
// import { AssignComponent } from './booking/assign/assign.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BookingChargesComponent } from './customer-catalogue/booking-charges/booking-charges.component';
import { ItemsComponent } from './items/items.component';
import { AddItemComponent } from './items/add-item/add-item.component'; 
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { AddUserComponent } from './user-permission/add-user/add-user.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AddPermissionComponent } from './user-permission/add-permission/add-permission.component';

@NgModule({
  declarations: [
    LoaderComponent,
    AppComponent,
    // HomeComponent,
    // DashboardComponent,

    SpinnerComponent,
    SwitchComponent,
    ReportComponent,
    ReportTableComponent,
    LedgerComponent,
    AgentComponent,
    TimeSlotComponent,
    AgentJobsComponent,
    PaymentSettlementComponent,
    UnapprovedAgentComponent,
    AdminHeaderComponent,
    AdminSideNavComponent,
    AdminFooterComponent,
    WalletComponent,
    AddAddressDialogComponent,
    AddNewCategoryDialogComponent,
    EditAddressDialogComponent,
    AddMoneyToWalletDialogComponent,
    AreYouSureToClearNotificationComponent,
    AssignAgentComponent,
    BookingWillBeCanceledComponent,
    SettingsComponent,
    UserComponent,
    DiscountComponent,
    ServiceComponent,
    SApplianceRepairComponent,
    SBathroomCleaningComponent,
    SKitchenCleaningComponent,
    SFullHomeCleaningComponent,
    SSofaCarpetCleaningComponent,
    SWaterTankCleaningComponent,
    ServiceManagementComponent,
    LocationManagementComponent,
    TimeSlotManagementComponent,
    DayTimeManagementComponent,
    DashboardComponent,
    DashboardSalesComponent,
    DashboardOrdersComponent,
    DashboardRecentBookingsComponent,
    DashboardBookingPerformanceComponent,
    AddCategoryComponent,
    ManagerUiComponent,
    AddServiceComponent,
    EditAttendance1Component,
    EditAttendance2Component,
    AddNewServiceDialogComponent,
    EditServiceDialogComponent,
    DebitDetialsDialogComponent,
    CreditDetialsDialogComponent,
    TransactionDetailsComponent,
    GeneralComponent,
    DateTimeComponent,
    PoliciesComponent,
    PolicyDialogComponent,
    ContentManagementComponent,
    GeneralSettingsComponent,
    EmailAndNotificationSettingsComponent,
    SystemLogsAndAuditingComponent,
    BackupAndRestoreComponent,
    SecuritySettingsComponent,
    DiscountsComponent,
    ApplianceRepairDiscountsComponent,
    BathroomCleaningDiscountsComponent,
    KitchenCleaningDiscountsComponent,
    FullHomeCleaningDiscountsComponent,
    SofaCarpetCleaningDiscountsComponent,
    WaterTankCleaningDiscountsComponent,
    NotificationComponent,
    LoginComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    NotAdminComponent,
    SearchComponent,
    AssignedDetailsComponent,
    CompletedDetailsComponent,
    PendingDetailsComponent,
    SimplePendingDetailComponent,
    LedgerConfirmationDialogComponent,
    AgentCompletedDetailsComponent,
    JobProofDetailsComponent,
    NotCompletedDetailsComponent,
    CustomersComponent,
    NotificationConfirmationDialogComponent,
    AddNewBannerDialogComponent,
    EditBannerDialogComponent,
    TaxesComponent,
    AddComponent,
    ConfirmationDialogComponent,
    EditTaxComponent,
    StatisticsComponent,
    BookingsPerDayComponent,
    SlotWiseBookingsComponent,
    AgentWiseBookingsComponent,
    ServiceWiseBookingsComponent,
    CompletedVsRejectedBookingsComponent,
    ChartContainerComponent,
    ServiceMainComponent,
    AreaWiseCatalogueComponent,
    ServiceCataloguesComponent,
    TimeSlotsComponent,
    AddAreaComponent,
    AddCityComponent,
    SettingsMainComponent,
    UsersPermissionCatalogueComponent,
    AdminCatalogueComponent,
    AgentCatalogueComponent,
    CustomerCatalogueComponent,
    UserCardComponent,
    CreateUserModalComponent,
    LoaderComponent,
    SwitchComponent,
    BannerDialogComponent,
    DeleteDialogComponent,
    BannerSectionComponent,
    FAQDialogComponent,
    BookingChargesComponent,
    ItemsComponent,
    AddItemComponent,
    UserPermissionComponent,
    AddUserComponent,
    AddPermissionComponent,
  ],
  imports: [
    MatGridListModule,
    GoogleMapsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatInputModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    CouponsModule,
    MatRadioModule,
    DialogModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    HttpClientModule,
    NgSelectModule,
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    providePerformance(() => getPerformance()),
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    NotificationService,
    StorageService,
    CategoryService,
    ConfirmationDialogService,
    LoaderService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
