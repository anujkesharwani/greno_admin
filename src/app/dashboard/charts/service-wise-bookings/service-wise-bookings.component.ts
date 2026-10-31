import { Component, Input } from '@angular/core';
// import { Chart } from 'chart.js';
import { BookingService } from 'src/app/core/booking.service';
import { Booking } from 'src/app/core/booking.structure';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components
Chart.register(PieController, ArcElement, Tooltip, Legend);


@Component({
  selector: 'app-service-wise-bookings',
  templateUrl: './service-wise-bookings.component.html',
  styleUrls: ['./service-wise-bookings.component.scss'],
})
export class ServiceWiseBookingsComponent {
  bookingsByService: { [key: string]: number } = {};
  serviceArray: any[] = [];
  valuesArray: any[] = [];
  orders: any[] = [];
  startDateService!: Date;
  endDateService!: Date;
  fromDate: any = '';
  toDate: any = '';
  private myChart: any;

  constructor(private bookingService: BookingService) {}
  ngOnInit() {
    const currentDate = new Date();
    this.startDateService = new Date(currentDate);
    this.endDateService = new Date();
    this.startDateService.setDate(currentDate.getDate() - 6); // Set start date to 6 days before today
    this.onDateChange(); // Load data based on the initial date range
  
  }
  onDateChange() {
    this.fromDate = this.convertToYYYYMMDD(this.startDateService?.toString());
    this.toDate = this.convertToYYYYMMDD(this.endDateService?.toString());
    this.getBookingsStatus();
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
 
  async getBookingsStatus() {
    this.bookingsByService={}
    const bookings = await this.bookingService.getBookingByService(
      this.fromDate,
      this.toDate
    );


    bookings.forEach((booking) => {
      // if (this.bookingsByService[booking.mainCategory?.name]) {
        //  this.bookingsByService[booking.mainCategory?.name] += 1;
      // } else {
      //   this.bookingsByService[booking.mainCategory?.name] = 1;
      // }
       if (Array.isArray(booking?.['services'])) {
    // Iterate over each service in the 'services' array
       booking?.['services'].forEach((service) => {
       const serviceName = service.name;
      // Check if the serviceName exists in bookingsByService, if so increment, otherwise set to 1
      if (this.bookingsByService[serviceName]) {
        this.bookingsByService[serviceName] += 1;
      } else {
        this.bookingsByService[serviceName] = 1;
      }
    });
  }
    });

    this.serviceArray = Object.keys(this.bookingsByService);
    this.valuesArray = Object.values(this.bookingsByService);


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

    this.myChart = new Chart('serviceWiseBookings', {
      type: 'pie', //this denotes tha type of chart
      data: {
        // values on X-Axis
        labels: this.serviceArray,
        datasets: [
          {
            label: 'Sales',
            data: this.valuesArray,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
