import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';
import { LoaderService } from 'src/app/Shared/shared-services/loader.service';
import { BookingService } from 'src/app/core/booking.service';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);



interface AgentInfo {
  agentName: string;
  count: number;
}

@Component({
  selector: 'app-agent-wise-bookings',
  templateUrl: './agent-wise-bookings.component.html',
  styleUrls: ['./agent-wise-bookings.component.scss'],
})
export class AgentWiseBookingsComponent implements OnInit {
  agentDict: { [key: string]: AgentInfo } = {};
  labels: string[] = [];
  values: number[] = [];

  startDateAgents!: Date;
  endDateAgents!: Date;
  maxDate: string;
  private myChart: any;
  fromDate: any = '';
  toDate: any = '';

  constructor(private bookingService: BookingService, private loader: LoaderService) {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    // Set default date range to the last 6 days including today
    const currentDate = new Date();
    this.startDateAgents = new Date(currentDate);
    this.endDateAgents = new Date();
    this.startDateAgents.setDate(currentDate.getDate() - 6); // Set start date to 6 days before today
    this.onDateChange(); // Load data based on the initial date range
  }

  onDateChange() {
    this.fromDate = this.convertToYYYYMMDD(this.startDateAgents.toString());
    this.toDate = this.convertToYYYYMMDD(this.endDateAgents.toString());
    this.loadData();
  }

  private async loadData() {
    // Reset state before fetching new data
    this.agentDict = {};
    this.labels = [];
    this.values = [];

    const bookingsDocs = await this.bookingService.getBookingByAgent(this.fromDate, this.toDate);
    bookingsDocs.forEach((booking: any) => {
      const agentId = booking?.assignedAgent;
      let agentName = booking?.agentName;
      if (agentName === undefined) {
        agentName = `Agent ${agentId.slice(0, 4)}`;
      }
      if (!(agentId in this.agentDict)) {
        this.agentDict[agentId] = { agentName, count: 1 };
      } else {
        this.agentDict[agentId].count += 1;
      }
    });

    this.labels = Object.values(this.agentDict).map((agent) => agent.agentName);
    this.values = Object.values(this.agentDict).map((agent) => agent.count);
    this.loadChart();
  }

  private convertToYYYYMMDD(dateString: string): string | null {
    const inputDate = new Date(dateString);

    if (isNaN(inputDate.getTime())) {
      // Handle invalid date string
      return null;
    }

    const year = inputDate.getFullYear();
    const month = ('0' + (inputDate.getMonth() + 1)).slice(-2); // Month is 0-based
    const day = ('0' + inputDate.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  private loadChart() {
    this.destroyChart();
    this.myChart = new Chart('agentWiseBookings', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Sales',
            data: this.values,
            backgroundColor: 'pink',
            barThickness: 30,
            barPercentage: 0.6,
            categoryPercentage: 0.6,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category', // Set the x-axis type to 'category'
          },
          y: {
            beginAtZero: true, // Ensure the y-axis starts from zero
            ticks: {
              stepSize: 5, // Set the gap between numbers on the y-axis to 5
            },
          },
        },
      },
    });
  }

  private destroyChart() {
    if (this.myChart) {
      this.myChart.destroy();
      this.myChart = null;
    }
  }
}
