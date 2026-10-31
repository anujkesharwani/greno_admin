import { Component } from '@angular/core';
import { Agent } from './agent.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  agentDetails: Agent[] = [
    {
      agentName: 'Viraj Patel',
      bookingID: 'JCA317',
      email: 'example@gmail.com',
      startTime: '12 Jan 23,12:00 PM',
      totalService: 124,
      agentID: '65JCD3',
      rating: 4.4,
      status: 'Assigned',
      total: 1500,
      agentPhoto: './assets/icon/searchBar/agentList/VirajPatel.svg'
    },
    {
      agentName: 'Viraj Patel',
      bookingID: 'JCF315',
      email: 'example@gmail.com',
      startTime: '12 Jan 23,12:00 PM',
      totalService: 124,
      agentID: '65JCD3',
      rating: 4.2,
      status: 'Completed',
      total: 1500,
      agentPhoto: './assets/icon/searchBar/agentList/VirajPatel.svg'
    },
    {
      agentName: 'Manoj Ravat',
      bookingID: 'JAF315',
      email: 'example@gmail.com',
      startTime: '12 Jan 23,12:00 PM',
      totalService: 124,
      agentID: '65JCD3',
      rating: 4.5,
      status: 'Accepted',
      total: 1500,
      agentPhoto: './assets/icon/searchBar/agentList/VirajPatel.svg'
    },
    {
      agentName: 'Viraj Patel',
      bookingID: 'WCF315',
      email: 'example@gmail.com',
      startTime: '12 Jan 23,12:00 PM',
      totalService: 124,
      agentID: '65JCD3',
      rating: 4.2,
      status: 'Completed',
      total: 1500,
      agentPhoto: './assets/icon/searchBar/agentList/VirajPatel.svg'
    }
  ]
  filteredItems: Agent[] = this.agentDetails
  searchBar = ''
  valueChange(event: any) {
    this.searchBar = event;


    this.filteredItems = this.agentDetails.filter(item =>
      item.bookingID.toLowerCase().includes(this.searchBar.toLowerCase())
    );
  }
}
