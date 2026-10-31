import { Component, Inject, Input, OnChanges } from "@angular/core";
import Chart from "chart.js/auto";
import { ReportsService } from "../reports.service";
import { LoaderService } from "src/app/Shared/shared-services/loader.service";
import { Firestore, collection, getDocs } from "@angular/fire/firestore";
import { AuthService } from "src/app/auth/auth.service";
import { DataProviderService } from "src/app/core/data-provider.service";
@Component({
  selector: "app-day-line-chart",
  templateUrl: "./day-line-chart.component.html",
  styleUrls: ["./day-line-chart.component.scss"],
})
export class DayLineChartComponent implements OnChanges {
  [x: string]: any;
  chart: any;

  @Input() dateSelected: Date;

  constructor(
    private db: ReportsService,
    private loader: LoaderService,
    private firestore: Firestore,
    public dataProvider: DataProviderService,//copy this
    public AuthService: AuthService,//copy this
  ) {}

  ngOnChanges(): void {
    this.chart?.destroy();
    this.createChart();
   
  }

  private async createChart() {
    const endDate = this.dateSelected;
    const startDate = new Date(endDate);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(endDate.getDate() - 6);
    let data = await this.weekSales(startDate, endDate);
  
    let newdata: number[]=[];
    for (let i = 0; i <7 ; i++) {
        newdata.push(data[i] as number);
    }
    
    const commonConfig = {
      tension: 0.4,
      fill: true,
     };
    
    this.chart = new Chart("chart", {
      type: "line",
      data: {
        labels: this.xLabels,
        datasets: [
          {
            ...commonConfig,
            label: "Week Sales",
            data: [...newdata],
            borderColor: "#1ad5b5",
          },
          // {
          //   ...commonConfig,
          //   label: 'Average Sales',
          //   data: await this.avgSales(),
          //   borderColor: '#0692fb',
          //   backgroundColor: 'rgba(6, 146, 251, 0.2)',
          // },
        ],
      },
    });
  }

  private get xLabels(): string[] {
    const today = new Date(); // Get today's date
    const selectedDate = this.dateSelected;
    const labels: string[] = [];
    if (selectedDate >= today) {
        labels.push(this.formatDate(today)); // Add today's date
        // Generate labels for the past six days
        for (let i = 1; i <= 6; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            labels.unshift(this.formatDate(date));
        }
    } else {
        // Generate labels for the last seven days starting from the selected date
        for (let i = 6; i >= 0; i--) {
            const date = new Date(selectedDate);
            date.setDate(selectedDate.getDate() - i);
            labels.push(this.formatDate(date));
        }
    }
    return labels;
  }

  private formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  }

  private get week(): Date[] {
    const date = new Date(this.dateSelected!);
    const diff = date.getDate() - date.getDay();
    const weekSunday = new Date(date.setDate(diff));
    const week = [weekSunday];
    for (let i = 1; i < 7; i++) {
      week.push(new Date(weekSunday.getTime() + 86400000 * i));
    }
    return week;
  }
  allowedCities: any []
  async weekSales(startDate: Date, endDate: Date) {
    let sales: number[] = [0,0,0,0,0,0,0];
    const usersSnapshot = await this.db.getWeekSummary();
    // Array to store all promises
    const promises: Promise<void>[] = [];
    const allowedCities = await this.AuthService.getAllowedCities();
      
    this.allowedCities = allowedCities.map((city:any) => city.cityId);
    usersSnapshot.docs.forEach((user: any) => {
      const promise = new Promise<void>(async (resolve, reject) => {
            const bookingsSnapshot = await getDocs(
                collection(this.firestore, "users", user.id, "bookings")
            );
           
            bookingsSnapshot.docs.forEach((booking) => {
              // console.log(startDate,endDate,booking.data());
                const bookingData = booking.data();
                const createdOn = bookingData['timeSlot']['date'].toDate().getTime();
                const createdTimeStamp = new Date(createdOn).getTime();
                const currentDate=new Date(createdOn);
                const startTimestamp = new Date(startDate);
                const endTimestamp = new Date(endDate);
                const timestamp1 = startTimestamp.getTime();
                const timestamp2 = endTimestamp.getTime();
                //console.log(currentDate);
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
                if (createdTimeStamp >= timestamp1 && createdTimeStamp <= timestamp2 && validBooking==true){
                const differenceMs: number = currentDate.getTime() - startDate.getTime();
                // Convert milliseconds to days
                const differenceDays: number = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
                // Output the difference in days
                let temp=bookingData["billing"]["grandTotal"];
                sales[differenceDays]+=temp
                //sales.push(bookingData["billing"]["grandTotal"]);
                }

            });

            resolve();
        });
        
        promises.push(promise);
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    console.log("abh",sales);
    return sales;
  }

  // private async avgSales() {
  //   this.loader.showLoader();
  //   const res = await this.db.getAverageSales();
  //   const data = res.data();
  //   var sales: number[] = [];
  //   if (data) {
  //     sales = [
  //       data['sun'],
  //       data['mon'],
  //       data['tue'],
  //       data['wed'],
  //       data['thu'],
  //       data['fri'],
  //       data['sat'],
  //     ];
  //   }
  //   this.loader.hideLoader();
  //   return sales;
  // }

  // dateSelected: Date;
  //   today: Date = new Date();

  
}


