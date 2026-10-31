import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Chart } from 'chart.js';
import { BookingService } from 'src/app/core/booking.service';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

// Register the necessary components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);


interface BookingData {
  createdAt: { seconds: number; nanoseconds: number };
  // Add other properties as needed
}

interface BookingsByDay {
  [key: string]: number;
}

@Component({
  selector: 'app-bookings-per-day',
  templateUrl: './bookings-per-day.component.html',
  styleUrls: ['./bookings-per-day.component.scss'],
})
export class BookingsPerDayComponent implements OnInit {
  startDate!: Date;
  endDate!: Date;
  maxDate: string;
  private myChart: any;
  fromDate: any = '';
  toDate: any = '';
  keysArray: string[] = [];
  valuesArray: string[] = [];
  @Output() notify = new EventEmitter<any>();
  notifyParent() {
    // this.notify.emit(this.fromDate, this.toDate);
  }
  constructor(private bookingService: BookingService) {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    const currentDate = new Date();
    this.startDate= new Date(currentDate);
    this.endDate = new Date();
    this.startDate.setDate(currentDate.getDate() - 6); // Set start date to 6 days before today
    this.onDateChange(); // Load data based on the initial date range
  
  }

  onDateChange() {
    this.fromDate = this.convertToYYYYMMDD(this.startDate.toString());
    this.toDate = this.convertToYYYYMMDD(this.endDate.toString());
    this.getBooking(this.fromDate, this.toDate);
  }

  convertToYYYYMMDD(dateString: string): string | null {
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

    this.myChart = new Chart('bookingsPerDay', {
      type: 'line',
      data: {
        labels: this.keysArray,
        datasets: [
          {
            label: 'Sales',
            data: this.valuesArray,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132,50)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  private async getBooking(fromDate: string, toDate: string): Promise<void> {
    try {
      const bookingDataArray: BookingData[] = await this.bookingService.getBookings2(
        fromDate,
        toDate
      );

      const bookingsByDay: BookingsByDay = {};
      bookingDataArray.forEach((booking) => {
        const createdAtTimestamp =
          booking.createdAt.seconds * 1000 + booking.createdAt.nanoseconds / 1e6;
        const createdAtDate = new Date(createdAtTimestamp);

        const formattedDate = createdAtDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
        });

        bookingsByDay[formattedDate] = (bookingsByDay[formattedDate] || 0) + 1;
      });

      this.keysArray = Object.keys(bookingsByDay);
      this.valuesArray = Object.values(bookingsByDay).map(String);
      this.loadChart();
    } catch (error) {
      console.error('Error getting booking data:', error);
    }
  }
}
