import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportComponent } from "./report/report.component";
import { ReportTableComponent } from "./report/report-table/report-table.component";
import { LedgerComponent } from "./ledger/ledger.component";
import { AgentComponent } from "./agent/agent.component";
import { TimeSlotComponent } from "./agent/time-slot/time-slot.component";
import { AgentJobsComponent } from "./agent/agent-jobs/agent-jobs.component";
import { PaymentSettlementComponent } from "./agent/payment-settlement/payment-settlement.component";
import { UnapprovedAgentComponent } from "./agent/unapproved-agent/unapproved-agent.component";
import { WalletComponent } from "./wallet/wallet.component";
import { DialogComponent } from "./dialog/dialog.component";
import { SettingsComponent } from "./settings/settings.component";
import { UserComponent } from "./user/user.component";
import { DiscountComponent } from "./discount/discount.component";
import { ServiceComponent } from "./service/service.component";
import { SApplianceRepairComponent } from "./service/s-appliance-repair/s-appliance-repair.component";
import { SBathroomCleaningComponent } from "./service/s-bathroom-cleaning/s-bathroom-cleaning.component";
import { SKitchenCleaningComponent } from "./service/s-kitchen-cleaning/s-kitchen-cleaning.component";
import { SFullHomeCleaningComponent } from "./service/s-full-home-cleaning/s-full-home-cleaning.component";
import { SSofaCarpetCleaningComponent } from "./service/s-sofa-carpet-cleaning/s-sofa-carpet-cleaning.component";
import { SWaterTankCleaningComponent } from "./service/s-water-tank-cleaning/s-water-tank-cleaning.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TransactionDetailsComponent } from "./wallet/transaction-details/transaction-details.component";
import { GeneralComponent } from "./settings/general/general.component";
import { ContentManagementComponent } from "./settings/content-management/content-management.component";
import { DateTimeComponent } from "./settings/date-time/date-time.component";
import { PoliciesComponent } from "./settings/policies/policies.component";
import { GeneralSettingsComponent } from "./settings/general/general-settings/general-settings.component";
import { EmailAndNotificationSettingsComponent } from "./settings/general/email-and-notification-settings/email-and-notification-settings.component";
import { SystemLogsAndAuditingComponent } from "./settings/general/system-logs-and-auditing/system-logs-and-auditing.component";
import { BackupAndRestoreComponent } from "./settings/general/backup-and-restore/backup-and-restore.component";
import { SecuritySettingsComponent } from "./settings/general/security-settings/security-settings.component";
import { NotificationComponent } from "./notification/notification.component";
import { LoginComponent } from "./auth/login/login.component";
import { ForgotPasswordComponent } from "./auth/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "./auth/change-password/change-password.component";
import { NotAdminComponent } from "./auth/not-admin/not-admin.component";
import { SearchComponent } from "./search/search.component";
import { CustomersComponent } from "./user/customers/customers.component";
import { AuthGuard } from "./auth/auth.guard";
import { LoggedInAuthGuard } from "./auth/loggedin.guard";
import { ServiceMainComponent } from "./service-main/service-main.component";
import { SettingsMainComponent } from "./settings-main/settings-main.component";
// import { BookingComponent } from './booking/booking.component';
// import { AllBookingComponent } from './booking/all-booking/all-booking.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },

  {
    path: "service",
    component: ServiceMainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: SApplianceRepairComponent },
      { path: "bathroom-cleaning", component: SBathroomCleaningComponent },
      { path: "kitchen-cleaning", component: SKitchenCleaningComponent },
      { path: "full-home-cleaning", component: SFullHomeCleaningComponent },
      { path: "sofa-carpet-cleaning", component: SSofaCarpetCleaningComponent },
      { path: "water-tank-cleaning", component: SWaterTankCleaningComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "settings",
    component: SettingsMainComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'notification',
  //   component: NotificationComponent
  // },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoggedInAuthGuard],
  },
  // {
  //   path: 'forgot-password',
  //   component: ForgotPasswordComponent
  // },
  // {
  //   path: 'change-password',
  //   component: ChangePasswordComponent
  // },
  // {
  //   path: 'not-admin',
  //   component: NotAdminComponent
  // },
  // {
  //   path: 'search',
  //   component: SearchComponent
  // },
  {
    path: "customers",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./customers/customers.module").then((m) => m.CustomersModule),
  },
  {
    path: "agents",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./agents/agents.module").then((m) => m.AgentsModule),
  },
  // {
  //   path: 'dashboard',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./bookings/bookings.module').then((m) => m.BookingsModule),
  // },
  {
    path: "bookings",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./bookings/bookings.module").then((m) => m.BookingsModule),
  },
  {
    path: "services",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./services/services.module").then((m) => m.ServicesModule),
  },
  {
    path: "reports",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./reports/reports.module").then((m) => m.ReportsModule),
  },
  {
    path: "privacy-policy",
    loadChildren: () =>
      import("./privacy-policy/privacy-policy.module").then(
        (m) => m.PrivacyPolicyModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
