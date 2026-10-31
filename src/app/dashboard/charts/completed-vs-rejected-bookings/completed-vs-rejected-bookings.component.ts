import { Component, Input } from '@angular/core';
// import { Chart } from 'chart.js';
import { BookingService } from 'src/app/core/booking.service';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);



@Component({
  selector: 'app-completed-vs-rejected-bookings',
  templateUrl: './completed-vs-rejected-bookings.component.html',
  styleUrls: ['./completed-vs-rejected-bookings.component.scss'],
})
export class CompletedVsRejectedBookingsComponent {
  private chartInstance: Chart | null = null;
  bookingsByStatus: any = [];
  groupedBookings: { [key: string]: { completed: number; others: number } } =
    {};
  serviceArray: any[] = [];
  startDate!: Date;
  endDate!: Date;
  fromDate: any = '';
  toDate: any = '';
  dataset: any[] = [
    {
      label: 'Complete',
      data: [],
      backgroundColor: '#ff006e',
    },
    {
      label: 'Others',
      data: [],
      backgroundColor: '#3a86ff',
    },
  ];
  private myChart: any;
  onDateChange() {
    this.fromDate = this.convertToYYYYMMDD(this.startDate?.toString());
    this.toDate = this.convertToYYYYMMDD(this.endDate?.toString());
    this.getCompleteAndRejectedBookings();
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

  constructor(private bookingService: BookingService) {}
  ngOnInit() {
    const currentDate = new Date();
    this.startDate = new Date(currentDate);
    this. endDate = new Date();
    this.startDate.setDate(currentDate.getDate() - 6); // Set start date to 6 days before today
    this.onDateChange(); // Load data based on the initial date range
  
    // this.getCompleteAndRejectedBookings();
  }
  monthAbbreviation(monthIndex: number): string {
    const monthsAbbreviation = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthsAbbreviation[monthIndex];
  }
  async getCompleteAndRejectedBookings() {
    const bookings = await this.bookingService.getBookingStatusByDay(
      this.fromDate,
      this.toDate
    );

    this.groupedBookings = bookings.reduce(
      (
        result: { [key: string]: { completed: number; others: number } },
        booking: any
      ) => {
        const date = new Date(booking.timeSlot.date.seconds * 1000); // Convert seconds to milliseconds
        const formattedDate = date.toISOString().split('T')[0];

        if (!result[formattedDate]) {
          result[formattedDate] = {
            completed: 0,
            others: 0,
          };
        }

        if (booking.stage === 'completed') {
          result[formattedDate].completed += 1;
        } else {
          result[formattedDate].others += 1;
        }

        return result;
      },
      {}
    );

    this.serviceArray = Object.keys(this.groupedBookings);
    Object.values(this.groupedBookings).map((x) => {
      this.dataset[0].data.push(x.completed);
      this.dataset[1].data.push(x.others);
    });

    this.loadChart();
  }
  private destroyChart() {
    if (this.myChart) {
      this.myChart.destroy();
      this.myChart = null;
    }
  }

  private loadChart() {
    if (this.myChart) {
      this.destroyChart();
    }

    this.myChart = new Chart('completedVsRejectedBookings', {
      type: 'bar', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: this.serviceArray,
        datasets: this.dataset,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
