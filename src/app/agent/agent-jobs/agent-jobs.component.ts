import { Component } from '@angular/core'
import { AgentDetails } from './agentJobs.model'
import { MatDialog } from '@angular/material/dialog'
import { BookingWillBeCanceledComponent } from 'src/app/dialog/booking-will-be-canceled/booking-will-be-canceled.component';
import { AgentCompletedDetailsComponent } from 'src/app/dialog/agent-completed-details/agent-completed-details.component';
import { AssignedDetailsComponent } from 'src/app/dialog/assignedDetails/assignedDetails.component';
import { JobProofDetailsComponent } from 'src/app/dialog/job-proof-details/job-proof-details.component';
import { NotCompletedDetailsComponent } from 'src/app/dialog/not-completed-details/not-completed-details.component';

@Component({
  selector: 'app-agent-jobs',
  templateUrl: './agent-jobs.component.html',
  styleUrls: ['./agent-jobs.component.scss']
})
export class AgentJobsComponent {
  agentDetails: AgentDetails[] = [
    {
      agentName: 'Raviraj',
      agentPhoto: './assets/icon/searchBar/agentList/ManojRavat.svg',
      pickupDone: 25,
      completionTimeDone:15,
      settled: '20,220',
      unsettled: '20,220',
      transaction: [
        {
          orderID: 'JC78896',
          customerName: 'Arun Arora',
          service:'Kitchen Cleaning X2',serviceTime:'12:00 PM',status:'Assigned',
          address:'Rampur',
          jobEndTime:'02:00 PM'
        },
        {
          orderID: 'JC78896',
          customerName: 'Arun Arora',
          service:'Kitchen Cleaning X2',serviceTime:'12:00 PM',status:'Cancelled',
          address:'Rampur',
          jobEndTime:'02:00 PM'
        },
        {
          orderID: 'JC78896',
          customerName: 'Arun Arora',
          service:'Kitchen Cleaning X2',serviceTime:'12:00 PM',status:'Accepted',
          address:'Rampur',
          jobEndTime:'02:00 PM'
        },
       
      ]
    },
    {
      agentName: 'Raviraj',
      agentPhoto: './assets/icon/searchBar/agentList/ManojRavat.svg',
      pickupDone: 25,
      completionTimeDone:15,
      settled: '20,220',
      unsettled: '20,220',
      transaction: [
        {
          orderID: 'JC78896',
          customerName: 'Arun Arora',
          service:'Kitchen Cleaning X2',serviceTime:'12:00 PM',status:'Assigned',
          address:'Rampur',
          jobEndTime:'02:00 PM'
        },
        {
          orderID: 'JC78896',
          customerName: 'Arun Arora',
          service:'Kitchen Cleaning X2',serviceTime:'12:00 PM',status:'Cancelled',
          address:'Rampur',
          jobEndTime:'02:00 PM'
        },
        {
          orderID: 'JC78896',
          customerName: 'Arun Arora',
          service:'Kitchen Cleaning X2',serviceTime:'12:00 PM',status:'Accepted',
          address:'Rampur',
          jobEndTime:'02:00 PM'
        },
       
      ]
    },
  ]

  constructor(
    private dialog:MatDialog
  ){}

  openChangeAgentDialog(){
    const dialogRef = this.dialog.open(NotCompletedDetailsComponent);
  }

  openBookingConfirmationDialog(){
    const dialogRef = this.dialog.open(BookingWillBeCanceledComponent);
  }

  openInfoDialog(){
    const dialogRef = this.dialog.open(JobProofDetailsComponent);
  }


}
