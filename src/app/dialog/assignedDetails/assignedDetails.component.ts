// Import necessary modules and components
import { Component, EventEmitter, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-assigned-details',
  templateUrl: './assignedDetails.component.html',
  styleUrls: ['./assignedDetails.component.scss']
})
export class AssignedDetailsComponent {
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
  constructor (public dialogRef: MatDialog) {}

  // Function to close the booking details dialog
  closeAssignedDetailsDialog (): void {
    const dialogRef = this.dialogRef.closeAll()
  }
}
