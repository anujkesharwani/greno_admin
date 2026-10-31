import { Component, OnInit, Inject } from "@angular/core";
import { agentStruture } from "../modals.structure";
import { AvailableAgentsService } from "../../expandable-cards/available-agents.service";
import { agentColor } from "../../expandable-cards/bookings.data";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/Shared/dialog/dialog.component";
import { BookingService } from "src/app/core/booking.service";
import Utils from "src/app/Shared/shared-services/util";
import moment from "moment";
import { UserNotificationService } from "src/app/common/user-notification.service";

@Component({
  selector: "app-available-agents",
  templateUrl: "./available-agents.component.html",
  styleUrls: ["./available-agents.component.scss"],
})
export class AvailableAgentsComponent implements OnInit {
  agents: agentStruture[] = [];
  filteredAgents: agentStruture[] = [];

  constructor(
    private availableAgentsService: AvailableAgentsService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AvailableAgentsComponent>,
    private bookingService: BookingService,
    private userNotificationService: UserNotificationService
  ) {}

  ngOnInit(): void {
    this.getAvailableAgents().then(() => {
    });
  }

  getAvailableAgents() {
    const bookingDate = moment(
      new Date(this.data.timeSlot.date.seconds * 1000)
    ).format("YYYY-MM-DD");

    // Return the promise returned by availableAgentsService.getAvailableAgents()
    return this.availableAgentsService
      .getAvailableAgents(bookingDate)
      .then((data: any) => {
        this.agents = [];
        data?.map((agent: any) => {
          const obj = {
            ...agent,
            color: agentColor[agent.present],
            contactNumber: agent.phoneNumber,
            status: agent.present,
          };
          if (
            agent.selectedJobSubCategories &&
            agent.working &&
            agent.perDayJobs &&
            agent.perDayJobs > 0
          ) {
            const agentSlot = agent.slots.filter((slot: any) => {
              return slot.id === bookingDate;
            });
            if (
              agentSlot &&
              agentSlot.length &&
              agentSlot[0].bookings &&
              agentSlot[0].bookings.length < agent.perDayJobs
            ) {
              this.agents.push(obj);
              this.filteredAgents.push(obj);
            }
          }
          return data;
        });
        this.filteredAgents = this.filteredAgents.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id)
        );
      });
  }

  searchAgents(e: any): void {
    const searchValue = e.target.value;
    if (!searchValue) {
      this.filteredAgents = this.agents;
      return;
    }
    this.filteredAgents = this.agents.filter(
      (agent) =>
        (agent?.name &&
          agent?.name.toLowerCase().includes(searchValue.toLowerCase())) ||
        (agent?.contactNumber &&
          agent?.contactNumber
            .toLowerCase()
            .includes(searchValue.toLowerCase()))
    );
  }

  getAgentCount(status: string) {
    return this.agents.filter((item) => item["status"] === status).length;
  }

  async allotBooking(agentId: string) {
    this.dialog
      .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
      .afterClosed()
      .subscribe(async (data) => {
        if (data) {
          await this.bookingService.updateBooking(
            this.data.currentUser.userId,
            this.data.id,
            Utils.stageMaster.acceptancePending.key,
            this.data.isDelivery,
            agentId
          );
          (
            await this.bookingService.getBookingAssignments(
              this.data.currentUser.userId,
              this.data.id
            )
          ).docs.map(async (item: any) => {
            const data = item.data();
            if (!data.actionPerformed) {
              await this.bookingService.deleteBookingAssignments(
                this.data.currentUser.userId,
                this.data.id,
                item.id
              );
            }
          });
          await this.bookingService.addBookingAssignments(
            this.data.currentUser.userId,
            this.data.id,
            {
              accepted: false,
              actionPerformed: false,
              agentId,
              bookingID: this.data.id,
              customerId: this.data.currentUser.userId,
              date: new Date(),
            }
          );
          await this.userNotificationService.addAgentNotification(
            agentId,
            this.userNotificationService.message.bookingAllotted
          );
          this.dialogRef.close({ res: true });
        }
      });
  }
}
