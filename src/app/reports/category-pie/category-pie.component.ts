import {
  Component,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from "@angular/core";
import Chart from "chart.js/auto";
import { ReportsService } from "../reports.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LoaderService } from "src/app/Shared/shared-services/loader.service";
import { Firestore, collection, getDocs } from "@angular/fire/firestore";
import { AuthService } from "src/app/auth/auth.service";
import { DataProviderService } from "src/app/core/data-provider.service";
export interface DaySummary {
  name: string;
  count: number;
}

@Component({
  selector: "app-category-pie",
  templateUrl: "./category-pie.component.html",
  styleUrls: ["./category-pie.component.scss"],
})
export class CategoryPieComponent implements OnChanges {
  @Input() dateSelected: Date = new Date();
  sales: DaySummary | undefined;
  chart: Chart<"pie", number[], string> | undefined;
  // dateSelected: Date = new Date();
  today: Date = new Date();
  refreshedAt: string = "";
  bookings: any[] = [];
  isReport: boolean = false;

  constructor(
    private db: ReportsService,
    private loader: LoaderService,
    private firestore: Firestore,
    public dataProvider: DataProviderService,//copy this
    public AuthService: AuthService,//copy this
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // this.refreshChart(this.dateSelected)
    if (changes["dateSelected"] && !changes["dateSelected"].firstChange) {
      this.refreshChart(this.dateSelected);
    }
  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnInit(): void {
    this.refreshChart(this.dateSelected);
  }

  refresh(): void {
    this.refreshedAt = "Refreshing...";

    this.refreshedAt = "Data loaded at " + new Date().toLocaleTimeString();
    const endDate = this.dateSelected;

    //this.setChartData();
  }
  allowedCities: any []
  private async refreshChart(
    selectedDate: Date
  ): Promise<{ labels: string[]; data: number[] }> {
    selectedDate.setHours(0, 0, 0, 0); // Set start time to 12:00 AM (midnight)
    const startTimeStamp = selectedDate.getTime(); // Timestamp for 12:00 AM on the selected date

    selectedDate.setHours(23, 59, 0, 0); // Set the time to 11:59 PM
    const endTimeStamp = selectedDate.getTime(); // Get the timestamp

    const serviceUsageMap = new Map<string, number>();
    const usersSnapshot = await this.db.getDaySummary();
    const allowedCities = await this.AuthService.getAllowedCities();
      
    this.allowedCities = allowedCities.map((city:any) => city.cityId);
    await Promise.all(
      usersSnapshot.docs.map(async (user: any) => {
        const bookingsSnapshot = await getDocs(
          collection(this.firestore, "users", user.id, "bookings")
        );

        bookingsSnapshot.docs.forEach((booking) => {
          const bookingData = booking.data();
          // const createdAtDate = bookingData['createdAt'].seconds;
          //  const createdAtTimestamp = createdAtDate * 1000; //
          const bookingDate = bookingData["timeSlot"]["date"]
            .toDate()
            .getTime();
          // const BookingTimeStamp = new Date(bookingDate).getTime();
          let validBooking=false;  
          if ( this.dataProvider.cityId == bookingData?.["address"].cityId  ){
              validBooking=true;
            
          }
          else if(this.dataProvider.cityId=="all"){
            this.allowedCities.map((cid:any)=>{
              if(cid==bookingData?.["address"].cityId){
                validBooking=true;
              }
            })
          }
          if (bookingDate >= startTimeStamp && bookingDate <= endTimeStamp && validBooking==true) {
            bookingData["services"]?.forEach((service: any) => {
              const serviceName = service.name;
              const count = serviceUsageMap.get(serviceName) || 0;
              serviceUsageMap.set(serviceName, count + 1);
            });
          }
        });
      })
    );

    // Convert Map to arrays for labels and data
    const labels = Array.from(serviceUsageMap.keys());
    const data = Array.from(serviceUsageMap.values());
    this.isReport = data.length ? true : false;
    this.createChart(labels, data);
    return { labels, data };
  }

  private async createChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart if it exists
    }

    this.chart = new Chart("MyChart", {
      type: "pie",
      data: {
        labels: labels, // Use service names as labels
        datasets: [
          {
            data: data, // Use counts as data
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
            ],
            hoverOffset: 4,
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            font: {
              size: 24,
              weight: "bold",
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            },
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
              },
            },
          },
        },
      },
    });
  }
  updateDateSelected(event: any) {
    this.dateSelected = new Date(event.target.value); // Assuming event.target.value is a valid date string
    this.refreshChart(this.dateSelected);
    // You can add additional logic here if needed
  }

  private get dateSelectedStr(): string {
    return this.dateSelected.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
