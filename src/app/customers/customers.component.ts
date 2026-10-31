import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { CustomerInfo } from "./customer.structure";
import { CustomerService } from "./customer.service";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Dialog } from "@angular/cdk/dialog";
import { HistoryDialogComponent } from "./history-dialog/history-dialog.component";
import moment from "moment";
import { AuthService } from "../auth/auth.service";
import { DataProviderService } from "../core/data-provider.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../Shared/dialog/dialog.component";
@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"],
})
export class CustomersComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private dialog: Dialog,
    public AuthService: AuthService,
    public dataProvider: DataProviderService,
    private MatDialog: MatDialog
  ) {}
  customers: CustomerInfo[] = [];
  filteredCustomers: CustomerInfo[] = [];
  allCustomers: any[];
  selectedCustomer: any;
  preCityId: any = "all";
  allowedCities: any[] = [];
  @ViewChild("customerDetail") customerDetail: TemplateRef<any> | undefined;

  ngOnInit(): void {
    this.getCustomers();
    // this.filterCustomer()
  }

  async getCustomers() {
    try {
      const allowedCities = await this.AuthService.getAllowedCities();
      
      this.allowedCities = allowedCities.map((city:any) => city.cityId);
  
      const customers = await this.customerService.getCustomers();
  
      const validCustomers = customers.filter(customer => 
        customer.cityId.some(cid => this.allowedCities.includes(cid))
      );

      validCustomers.sort((a, b) => a.accountNumber - b.accountNumber);

  
      this.customers = validCustomers;
      this.allCustomers = validCustomers;
      this.filteredCustomers = validCustomers;
  
    } catch (error) {
      console.error('Error fetching customers or allowed cities', error);
    }
  }
  

  ngDoCheck() {
    this.filterCustomer();
  }

  async filterCustomer() {
    if (this.dataProvider.cityId != this.preCityId) {
      let currCustomers: CustomerInfo[] = [];
      this.preCityId = this.dataProvider.cityId;
      await this.getCustomers().then(() => {
        this.allCustomers.map((customer: any) => {
          for (let cid of customer.cityId) {
            if (
              cid == this.dataProvider.cityId ||
              this.dataProvider.cityId == "all"
            ) {
              currCustomers.push(customer);
              break;
            }
          }
        });
      });
      this.customers = currCustomers;
      this.filteredCustomers = this.customers;
    }
  }

  async deleteCustomer(roleId: any) {
    this.MatDialog.open(ConfirmationDialogComponent, {
      data: { message: "Are you sure?" },
    })
      .afterClosed()

      .subscribe(async (result: any) => {
        if (result) {
          await this.customerService.deleteCustomer(roleId).then(() => {
            this.filterCustomer();
          });
        } else {
        }
      });
  }

  getAvgBill(customer: CustomerInfo) {
    const amt = customer.totalBillsAmount / customer.totalCompletedBooking;
    return isNaN(amt) ? 0 : amt.toFixed(2);
  }

  get todaysCustomers() {
    const today = moment(new Date()).format("YYYY-MM-DD");
    return this.customers.filter((customer) => {
      if (customer.registerDate) {
        if (
          moment(new Date(customer.registerDate.seconds * 1000)).format(
            "YYYY-MM-DD"
          ) === today
        ) {
          return customer;
        }
      }
      return null;
    }).length;
  }

  get activeCustomers() {
    return this.customers.filter((customer) => customer.active === true).length;
  }

  get avgBill() {
    const totalCompletedBookings = this.customers.reduce(
      (acc, customer) => acc + customer.totalCompletedBooking,
      0
    );
    const fee = this.totalSales / totalCompletedBookings;
    return isNaN(fee) ? 0 : fee.toFixed(2);
  }

  get todaysAvgBill() {
    const totalCompletedBookings = this.customers.reduce(
      (acc, customer) => acc + customer.totalCompletedBookingToday,
      0
    );
    const fee = this.todaysTotalSales / totalCompletedBookings;
    return isNaN(fee) ? 0 : fee.toFixed(2);
  }

  get totalSales() {
    const sales = this.customers.reduce(
      (acc, customer) => acc + customer.totalBillsAmount,
      0
    );
    return sales;
  }

  get todaysTotalSales() {
    const sales = this.customers.reduce(
      (acc, customer) => acc + customer.totalBillsAmountToday,
      0
    );
    return sales;
  }

  async changeCustomerStatus(customerId: string, status: boolean) {
    await this.customerService.updCustomerStatus(customerId, status);
    this.getCustomers();
  }

  filterCustomers($event: any) {
    let val = $event.target.value;
    if (!val) {
      this.filteredCustomers = this.customers;
      return;
    }
    val = val.toLowerCase();
    this.filteredCustomers = this.customers.filter((customer) => {
      if (
        customer.name.toLowerCase().indexOf(val) > -1 ||
        customer.phone.toLowerCase().indexOf(val) > -1
      ) {
        return customer;
      }
      return null;
    });
  }

  openDetails(customer: any) {
    this.selectedCustomer = customer;
    this.customerDetail &&
      this.dialog.open(this.customerDetail, {
        width: "500px",
        height: "250px",
      });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
