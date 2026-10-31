import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from "@angular/core";
import { agentStruture, bookings, tabs } from "./bookings.structure";
import { agentColor, agents, expandableTabs } from "./bookings.data";
import { BookingService } from "src/app/core/booking.service";
import { Booking } from "src/app/core/booking.structure";
import { FormControl, FormGroup } from "@angular/forms";
import { AvailableAgentsService } from "./available-agents.service";
import Utils from "src/app/Shared/shared-services/util";
import { MatDialog } from "@angular/material/dialog";
import { ModalsComponent } from "../modals/modals.component";
import moment from "moment";
import { AgentsService } from "src/app/agents/agents.service";
import { CustomerService } from "src/app/customers/customer.service";
import { AuthService } from "src/app/auth/auth.service";
import { DataProviderService } from "src/app/core/data-provider.service";

@Component({
  selector: "app-expandable-cards",
  templateUrl: "./expandable-cards.component.html",
  styleUrls: ["./expandable-cards.component.scss"],
})
export class ExpandableCardsComponent implements OnInit, OnDestroy {
  tabs: tabs[] = [...expandableTabs]; // Hard Coded
  agents: agentStruture[] = []; // Fetched from DB
  bookings: any[] = []; // Fetched from DB
  pendingCount: number[] = [0, 0, 0];
  completedCount: number = 0;
  inProgressCount: number = 0;
  cancelledCount: number = 0;
  expiredCount: number = 0;
  @Output() selectedBookingFilter = new EventEmitter<any>();
  availableAgents: any[] | undefined;
  utils = Utils;
  userPermissions: any;

  stages: any = {
    started: "Pending",
    unassigned: "Pending",
    assigned: "Pending",
    completed: "Completed",
    inProgress: "In-Progress",
    cancelled: "Cancelled",
  };

  constructor(
    private bookingService: BookingService,
    private availableAgentsService: AvailableAgentsService,
    private dialog: MatDialog,
    public dataProvider: DataProviderService,
    private agentsService: AgentsService,
    private customerService: CustomerService,
    public AuthService: AuthService
  ) {
    this.bookingService.refreshCounts.subscribe((data) => {
      this.bookings = [];
      if (data) {
        this.bookings = [];
        this.allBookings(this.bookingService.selectedDate.value);
      }
    });
  }

  ngOnInit(): void {
    this.bookings = [];

    // this.allBookings();
    this.bookingService.selectedDate.subscribe((data) => {
      this.bookings = [];
      if (data) {
        this.bookings = [];
        this.allBookings(data);
      }
    });
    this.getAvailableAgents();
  }

  ngOnDestroy(): void {
    // this.bookingService.refreshCounts.unsubscribe();
  }

  getUserPermissions() {
    this.AuthService.getUserPermissions().then((res) => {
      this.userPermissions = res;
    });
  }

  async getAvailableAgents() {
    const today = moment().format("YYYY-MM-DD");
    await this.availableAgentsService
      .getAvailableAgents(today)
      .then((data: any) => {
        this.tabs[0].allBookings = [];
        this.tabs[0].filteredBookings = [];
        data?.map((item: any) => {
          const obj = { ...item, color: agentColor[item.present] };
          this.tabs[0].allBookings.push(obj);
          this.tabs[0].filteredBookings.push(obj);
        });
      });
  }

  getAgentCount(status: string) {
    return this.tabs[0].allBookings.filter((item) => item["present"] === status)
      .length;
  }

  //Fixed duplication with this new function
  async allBookings(date: string): Promise<void> {
    await this.bookingService.getBookings(date).then(async (res) => {
      this.bookings = [];
      this.bookings.length = 0;
      const newBookings = res.docs.map(async (booking) => {
        const bdata = booking.data();
        let adtls = {},
          cdtls = {};
        if (bdata["assignedAgent"]) {
          adtls = await this.getAgentDetails(bdata["assignedAgent"]);
        }
        if (bdata["currentUser"]) {
          cdtls = await this.getUserDetails(bdata["currentUser"].userId);
        }
        if (
          moment(new Date(date)).format("YYYY-MM-DD") ===
          moment(new Date(bdata["timeSlot"]?.date.seconds * 1000)).format(
            "YYYY-MM-DD"
          )
        ) {
          return {
            id: booking.id,
            ...booking.data(),
            agent: adtls,
            customer: cdtls,
          };
        } else {
          return null; // Ensure every code path returns a value
        }
      });

      const resolvedBookings = await Promise.all(newBookings);
      this.bookings = resolvedBookings.filter((item): any => item !== null);
      this.bookings = this.bookings.filter((item): any => {
        return (
          item.address?.cityId === this.dataProvider.cityId ||
          this.dataProvider.cityId === "all"
        );
      });
    });

    this.pendingCount = [0, 0, 0];
    this.completedCount = 0;
    this.inProgressCount = 0;
    this.cancelledCount = 0;
    this.expiredCount = 0;
    this.tabs.forEach((tab: any) => {
      if (tab.title != Utils.stageMaster.availableAgents.text) {
        tab.allBookings = [];
        tab.filteredBookings = [];
      }
    });

    this.bookings.map((booking) => {
      booking.tabTitle = this.stages[booking?.stage];
      if (booking.billing) {
        booking.billing.grandTotal = Math.round(booking.billing?.grandTotal);
      }
      if (booking.stage === Utils.stageMaster.allotmentPending.key) {
        this.pendingCount[0] = this.pendingCount[0] + 1;
      } else if (
        booking.stage === Utils.stageMaster.otpVerificationPending.key ||
        booking.stage === Utils.stageMaster.jobAccepted.key
      ) {
        this.pendingCount[1] = this.pendingCount[1] + 1;
      } else if (booking.stage === Utils.stageMaster.acceptancePending.key) {
        this.pendingCount[2] = this.pendingCount[2] + 1;
      } else if (booking.stage === Utils.stageMaster.completed.key) {
        this.completedCount = this.completedCount + 1;
      } else if (
        booking.stage === Utils.stageMaster.washInProgress.key ||
        booking.stage === Utils.stageMaster.paymentPending.key ||
        booking.stage === Utils.stageMaster.paymentCompleted.key ||
        booking.stage === Utils.stageMaster.jobStarted.key
      ) {
        this.inProgressCount = this.inProgressCount + 1;
      } else if (booking.stage === Utils.stageMaster.discarded.key) {
        this.cancelledCount = this.cancelledCount + 1;
      } else if (booking.stage === Utils.stageMaster.expired.key) {
        this.expiredCount = this.expiredCount + 1;
      }

      this.tabs.forEach((tab: any) => {
        if (tab.title === "Completed") {
          // Only add the booking to the completed tab
          if (booking.stage === Utils.stageMaster.completed.key) {
            tab.allBookings.push(booking);
            tab.filteredBookings.push(booking);
          }
        } else if (
          tab.title != Utils.stageMaster.availableAgents.text &&
          tab.filterKeys.includes(booking.stage)
        ) {
          tab.allBookings.push(booking);
          tab.filteredBookings.push(booking);
        }
      });
    });
  }

  searchBookings(e: any, title: string): void {
    const searchValue = e.target.value;
    this.tabs.forEach((tab) => {
      if (tab.title === title) {
        if (!searchValue) {
          tab.filteredBookings = tab.allBookings;
          return;
        }
        tab.filteredBookings = tab.allBookings.filter(
          (booking) =>
            (booking?.id &&
              booking?.id.toLowerCase().includes(searchValue.toLowerCase())) ||
            (booking?.mainCategory?.name &&
              booking?.mainCategory?.name
                .toLowerCase()
                .includes(searchValue.toLowerCase())) ||
            (booking?.name &&
              booking?.name
                .toLowerCase()
                .includes(searchValue.toLowerCase())) ||
            (booking?.phoneNumber &&
              booking?.phoneNumber
                .toLowerCase()
                .includes(searchValue.toLowerCase()))
        );
      }
    });
  }

  applyFilterOnDashboard(index: number) {
    this.tabs[index].isFilterSliderActive =
      !this.tabs[index].isFilterSliderActive;
    const activeFilterTabs: any[] = [];
    this.tabs.map((item) => {
      item.isFilterSliderActive && activeFilterTabs.push(item.filterKeys);
    });
    this.selectedBookingFilter.emit(activeFilterTabs.flat());
  }

  onClickBooking(booking: any) {
    this.dialog
      .open(ModalsComponent, {
        disableClose: true,
        data: { ...booking },
        autoFocus: false,
      })
      .afterClosed()
      .subscribe(async (data) => {
        this.bookingService.refreshCounts.next(true);
      });
  }

  async getAgentDetails(agentId: string) {
    if (!agentId) {
      return "";
    }
    let agentData: any = {};
    await (
      await this.agentsService.getAgentById(agentId)
    ).docs.map((data) => {
      agentData = data.data();
      return data.data();
    });
    return agentData;
  }

  async getUserDetails(customerId: string) {
    if (!customerId) {
      return "";
    }
    let customerData: any = {};
    await (
      await this.customerService.getCustomerById(customerId)
    ).docs.map((data) => {
      customerData = data.data();
      return data.data();
    });
    return customerData;
  }
}
