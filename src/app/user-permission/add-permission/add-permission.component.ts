import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Dialog } from "@angular/cdk/dialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UserPermissionService } from "../service/user-permission.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-add-permission",
  templateUrl: "./add-permission.component.html",
  styleUrls: ["./add-permission.component.scss"],
})
export class AddPermissionComponent {
  constructor(
    private dialog: Dialog,
    private UserPermissionService: UserPermissionService,
    private AuthService:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  isDashboard = false;
  isBookingsCardVariables = false;
  isBookingsStages = false;
  isAgentsPage = false;
  isCustomersPage = false;
  isServicesPage = false;
  isReportsPage = false;
  isSettingsPage = false;

  roleForm: FormGroup = new FormGroup({
    roleName: new FormControl("", [Validators.required]),
    roleId: new FormControl(),
    active: new FormControl(true),
    dashboard: new FormControl(false),
    totalSales: new FormControl(false),
    bookingsSummary: new FormControl(false),
    allGraphs: new FormControl(false),

    bookingsCardVariables: new FormControl(false),
    phoneNumberAddress: new FormControl("hide"),
    jobAcceptance: new FormControl(false),
    otp: new FormControl(false),
    progressBar: new FormControl(false),
    allotReallot: new FormControl(false),
    bookingActions: new FormControl(false),

    bookingsStages: new FormControl(false),
    availableAgents: new FormControl(false),
    pending: new FormControl(false),
    inProgress: new FormControl(false),
    completed: new FormControl(false),
    cancelled: new FormControl(false),

    agentsPage: new FormControl(false),
    viewSummary: new FormControl(false),
    enableDisableAgent: new FormControl(false),
    addDeleteAgent: new FormControl(false),

    customersPage: new FormControl(false),
    viewSummaryCustomerPage: new FormControl(false),
    enableDisableCustomer: new FormControl(false),
    addDeleteCustomer: new FormControl(false),

    servicesPage: new FormControl(false),
    areaWiseCatalogue: new FormControl("can_view"),
    serviceCatalogues: new FormControl("can_view"),
    slotManagement: new FormControl("can_view"),

    reportsPage: new FormControl(false),
    daySummaryReport:new FormControl(false),
    allBookingsReport : new FormControl(false),
    deliveryCompletedBookingReport : new FormControl(false),
    pickupCompletedBookingReport : new FormControl(false),
    cancelledBooking : new FormControl(false),
    washInProgressBookingReport: new FormControl(false),
    prepaidBookingReport: new FormControl(false),
    paylaterBookingReport: new FormControl(false),
    discountBookingReport: new FormControl(false),
    slotWiseSummaryReport: new FormControl(false),
    customerWiseSummaryReport: new FormControl(false),
    areaWiseSummaryReport: new FormControl(false),
    agentWiseSummaryReport: new FormControl(false),
    serviceWiseSummaryReport: new FormControl(false),
    itemWiseSummaryReport: new FormControl(false),

    settingsPage: new FormControl(false),
    userPermissions: new FormControl(false),
    customerAppSettings: new FormControl(false),
    agentAppSettings: new FormControl(false),
  });

  ngOnInit() {
    if (this.data) {
      this.roleForm.setValue(this.data.roleDetail);
      this.roleForm.patchValue({
        roleId: this.data.id,
      });
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  togglePermissions(section: string) {
    switch (section) {
      case "Dashboard":
        this.isDashboard = !this.isDashboard;
        break;
      case "BookingsCardVariables":
        this.isBookingsCardVariables = !this.isBookingsCardVariables;
        break;
      case "BookingsStages":
        this.isBookingsStages = !this.isBookingsStages;
        break;
      case "AgentsPage":
        this.isAgentsPage = !this.isAgentsPage;
        break;
      case "CustomersPage":
        this.isCustomersPage = !this.isCustomersPage;
        break;
      case "ServicesPage":
        this.isServicesPage = !this.isServicesPage;
        break;
      case "ReportsPage":
        this.isReportsPage = !this.isReportsPage;
        break;
      case "SettingsPage":
        this.isSettingsPage = !this.isSettingsPage;
        break;
      default:
        console.warn(`Unknown section: ${section}`);
    }
  }

   async onSubmit() {
    if (this.roleForm.valid) {
      await this.UserPermissionService.addRole(this.roleForm.value);
      this.AuthService.getUserPermissions().then(() => {
        window.location.reload();
      });
      this.roleForm.reset();
      this.closeDialog();
    } else {
    }
  }

}
