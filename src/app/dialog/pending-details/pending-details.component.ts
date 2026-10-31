import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingWillBeCanceledComponent } from '../booking-will-be-canceled/booking-will-be-canceled.component';
import { AssignAgentComponent } from '../assign-agent/assign-agent.component';

@Component({
  selector: 'app-pending-details',
  templateUrl: './pending-details.component.html',
  styleUrls: ['./pending-details.component.scss']
})
export class PendingDetailsComponent {
  // Array of service details
  services = [
    {
      serviceType: 'AC Installation',
      serviceInfo: '1 Ton-1.5 Ton x2',
      amount: '1500',
      serviceDuration: '2 hr 20 mins',
      serviceImage: './assets/icon/bookingDetails/AC.svg',
      agentDetails: {
        agentName: 'Viraj Patel',
        agentContact: 9585654648,
        agentEmail: 'Virajpatel@gmail.com',
        agentImage: './assets/icon/bookingDetails/agentImage.jpeg'
      }
    },
    {
      serviceType: 'AC Installation',
      serviceInfo: '1 Ton-1.5 Ton x4',
      amount: '3000',
      serviceDuration: '2 hr 20 mins',
      serviceImage: './assets/icon/bookingDetails/AC.svg',
      agentDetails: {
        agentName: 'Viraj Patel',
        agentContact: 9585654648,
        agentEmail: 'Virajpatel@gmail.com',
        agentImage: './assets/icon/bookingDetails/agentImage.jpeg'
      }
    },
    {
      serviceType: 'AC Installation',
      serviceInfo: '1 Ton-1.5 Ton x2',
      amount: '1500',
      serviceDuration: '2 hr 20 mins',
      serviceImage: './assets/icon/bookingDetails/AC.svg',
      agentDetails: {
        agentName: 'Viraj Patel',
        agentContact: 9585654648,
        agentEmail: 'Virajpatel@gmail.com',
        agentImage: './assets/icon/bookingDetails/agentImage.jpeg'
      }
    }
  ]

  // Constructor to initialize the component
  constructor(
    public dialogRef: MatDialog,
    private dialog: MatDialog
  ) { }

  // Function to close the booking details dialog
  closeDialog(): void {
    const dialogRef = this.dialogRef.closeAll()
  }

  openCancelDialog() {
    const dialogRef = this.dialog.open(BookingWillBeCanceledComponent);
  }

  openAssignDialog() {
    const dialogRef = this.dialog.open(AssignAgentComponent);
  }
}
