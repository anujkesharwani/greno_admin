// Import necessary modules
import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-agent-completed-details',
  templateUrl: './agent-completed-details.component.html',
  styleUrls: ['./agent-completed-details.component.scss']
})
export class AgentCompletedDetailsComponent {
  // Array of service details
  services = [
    {
      serviceType: 'AC Installation',
      serviceInfo: '1 Ton-1.5 Ton x2',
      amount: '1500',
      serviceDuration: '2 hr 20 mins',
      serviceImage: 'assets/icon/bookingDetails/AC.svg', // Updated image source
      agentDetails: {
        agentName: 'Viraj Patel',
        agentContact: 9585654648,
        agentEmail: 'Virajpatel@gmail.com',
        agentImage: 'assets/icon/bookingDetails/agentImage.jpeg' // Updated image source
      }
    }
  ]

  // Constructor to initialize the component
  constructor (public dialogRef: MatDialog) {}

  // Function to close the booking details dialog
  closeDialog (): void {
    const dialogRef = this.dialogRef.closeAll()
  }
}
