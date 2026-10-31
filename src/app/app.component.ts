import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { DataProviderService } from "./core/data-provider.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "./Shared/dialog/dialog.component";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AreaWiseCatalogueService } from "./area-wise-catalogue/area-wise-catalogue.service";
import { BookingService } from "./core/booking.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "grenolaundryAdmin";
  constructor(
    private router: Router,
    public auth: AuthService,
    public dataProvider: DataProviderService,
    private matdialog: MatDialog,
    public bookingService: BookingService,
    private AreaWiseCatalogueService: AreaWiseCatalogueService,
    private AuthService: AuthService
  ) {
    this.getUserPermissions();
    this.getAllAreas();
    if (this.allCities.length > 1) this.dataProvider.cityId = "all";
  }

  userPermissions: any;
  allowedAreas: any;
  allowedCities: any[] = [];
  allCities: any[] = [];
  allAreas: any[] = [];
  selectedCity: string = "all";
  labels: any[] = [];

  getAllAreas() {
    this.AuthService.getAllowedAreas().then((res) => {
      this.allowedAreas = res;
    });
    this.AuthService.getAllowedCities().then((res) => {
      this.allowedCities = res;
      this.allowedCities.map((city) => {
        this.AreaWiseCatalogueService.getCityDetails(
          "7ulmd2ySQc2LyrXHomPt",
          city.cityId
        ).then((cityData) => {
          if (cityData.exists()) {
            this.allCities.push({ ...cityData.data(), id: cityData.id });
            this.selectedCity = cityData.id;
            this.dataProvider.cityId = cityData.id;
          }
        });
      });
    });
  }

  setCity(e: any) {
    this.dataProvider.cityId = e;
    this.bookingService.refreshCounts.next(this.dataProvider.cityId);
  }

  async getUserPermissions() {
    await this.AuthService.getUserPermissions().then((res) => {
      this.userPermissions = res;
      this.labels = [
        {
          icon: "dashboard",
          name: "Dashboard",
          link: "/dashboard",
          active: this.userPermissions["dashboard"],
        },
        {
          icon: "date_range",
          name: "Bookings",
          link: "/bookings",
          active: this.userPermissions["bookingsCardVariables"],
        },
        {
          icon: "person_outline",
          name: "Customers",
          link: "/customers",
          active: this.userPermissions["customersPage"],
        },
        {
          icon: "person_outline",
          name: "Agent",
          link: "/agents",
          active: this.userPermissions["agentsPage"],
        },
        {
          icon: "build",
          name: "Service",
          link: "/service",
          active: this.userPermissions["servicesPage"],
        },
        {
          icon: "assignment",
          name: "Reports",
          link: "/reports",
          active: this.userPermissions["reportsPage"],
        },
        {
          icon: "settings",
          name: "Settings",
          link: "/settings",
          active: this.userPermissions["settingsPage"],
        },
      ];
    });
  }

  isSidebarVisible() {
    // Hide the sidebar when the route is 'login'
    return (
      this.router.url !== "/login" &&
      this.router.url !== "/forgot-password" &&
      this.router.url !== "/change-password" &&
      this.router.url !== "/not-admin" &&
      this.router.url !== "/privacy-policy" &&
      this.router.url !== "/terms-and-conditions"
    );
  }

  signOut = () => {
    this.matdialog
      .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
      .afterClosed()
      .subscribe(async (data) => {
        if (data) {
          this.auth.signout();
        }
      });
  };
}
