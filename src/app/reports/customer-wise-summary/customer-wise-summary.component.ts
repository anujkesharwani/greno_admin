import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Booking } from "../booking.structure";
import { ExcelService } from "../excel.service";
import { ReportsService } from "../reports.service";
import { PdfService } from "../pdf.service";
import { Firestore, collection, getDocs } from "@angular/fire/firestore";
import { MatDatepicker } from "@angular/material/datepicker";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { DataProviderService } from "src/app/core/data-provider.service";
export interface Summary {
  id: string | number;
  name: string;
  discount: number;
  taxes: number;
  bookings: number;
  bookingsCancelled: number;
  availableAgents: number;
  totalRatings: number;
}

@Component({
  selector: "app-customer-wise-summary",
  templateUrl: "./customer-wise-summary.component.html",
  styleUrls: ["./customer-wise-summary.component.scss"],
})
export class CustomerWiseSummaryComponent implements OnInit {
  refreshedAt: string = "";
  dateSelected: Date = new Date();
  today: Date = new Date();
  bookings: Booking[] | any;
  customerSummary: any[] = [];
  dateRange!: FormGroup;
  isLoading: boolean = false;
  chartData: { labels: string[]; data: number[]; backgroundColor: string[] } | undefined;
  summ: any[] = [];
  @ViewChild("picker") picker!: MatDatepicker<Date>;

  summary: Summary = {
    id: '',
    name: '',
    discount: 0,
    taxes: 0,
    bookings: 0,
    bookingsCancelled: 0,
    availableAgents: 0,
    totalRatings: 0,
  };

  agentDetail: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerWiseSummaryComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { dateSelected: Date },
    private excelService: ExcelService,
    private pdfService: PdfService,
    private ReportsService: ReportsService,
    private firestore: Firestore,
    public dataProvider: DataProviderService,//copy this
    public AuthService: AuthService,//copy this
  ) { }

  ngOnInit(): void {
    this.dateSelected = new Date();
    this.refresh();
  }

  refresh(): void {
    this.isLoading = true;
    this.refreshedAt = "Refreshing...";
    this.loadSummary().then(() => {
      this.refreshedAt = "Data loaded at " + new Date().toLocaleTimeString();
      this.isLoading = false;
    });
  }
  allowedCities: any [] //copy this
  async getUsersBoooking() {
    const selectedDate = new Date(this.dateSelected);
    selectedDate.setHours(0, 0, 0, 0);
    const startTimeStamp = selectedDate.getTime();

    selectedDate.setHours(23, 59, 59, 999);
    const endTimeStamp = selectedDate.getTime();
    const allowedCities = await this.AuthService.getAllowedCities();
      
      this.allowedCities = allowedCities.map((city:any) => city.cityId);
    this.customerSummary = [];

    try {
      const usersSnapshot = await this.ReportsService.getDaySummaryy();
      const userDocs = usersSnapshot.docs;
      const bookingPromises = userDocs.map(async (user: any) => {
        const userData = user.data();
        const bookingsSnapshot = await getDocs(collection(this.firestore, "users", user.id, "bookings"));
        return { userData, bookings: bookingsSnapshot.docs };
      });

      const allUserBookings = await Promise.all(bookingPromises);
      for (const { userData, bookings } of allUserBookings) {
        for (const booking of bookings) {
          const bookingData = booking.data();

          if (!bookingData["timeSlot"] || !bookingData["timeSlot"].date) {
            console.error(`Invalid booking data: `, bookingData);
            continue;
          }

          const bookingDate = bookingData["timeSlot"].date.toDate().getTime();
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
            let existingCustomerIndex = this.customerSummary.findIndex((c) => c.id === userData.uid);

            if (existingCustomerIndex !== -1) {
              this.customerSummary[existingCustomerIndex].totalDiscount += Math.round(bookingData["billing"]?.discount || 0);
              this.customerSummary[existingCustomerIndex].totalBooking += 1;
              this.customerSummary[existingCustomerIndex].taxes += Math.round(bookingData["billing"]?.tax || 0);
              this.customerSummary[existingCustomerIndex].discarded += Math.round(bookingData["stage"] === "discarded" ? 1 : 0);
            } else {
              this.customerSummary.push({
                id: userData.uid,
                name: userData.name,
                totalDiscount: Math.round(bookingData["billing"]?.discount || 0),
                totalBooking: 1,
                taxes: Math.round(bookingData["billing"]?.tax || 0),
                discarded: bookingData["stage"] === "discarded" ? 1 : 0,
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching bookings: ", error);
    } finally {
      this.isLoading = false;
    }
  }

  private async loadSummary() {
    await this.getUsersBoooking();
    this.summary = {
      id: 'some-id',
      name: 'Customer Name',
      discount: 100,
      taxes: 50,
      bookings: 10,
      bookingsCancelled: 1,
      availableAgents: 5,
      totalRatings: 4.5,
    };
  }

  downloadExcel() {
    const summaryData = this.summaryArr;

    if (summaryData.length === 0) {
      console.warn('No summary data available to export.');
      return;
    }

    this.excelService.export(summaryData, "Summary for " + this.dateSelectedStr);
  }

  downloadPDF() {
    const summaryData = this.summaryArr;

    if (summaryData.length === 0) {
      console.warn('No summary data available to export.');
      return;
    }
    this.pdfService.export(summaryData, "Summary for " + this.dateSelectedStr);
  }

  private get summaryArr() {
    if (!this.summary) {
      return [];
    }

    return Object.entries(this.summary).map(([key, value]) => {
      if (["sales", "discount", "taxes", "jobAcceptanceCharge", "cancelledAmount"].includes(key)) {
        value = "Rs. " + value;
      }
      return {
        key: this.camelCaseToTitleCase(key),
        value,
      };
    });
  }

  private camelCaseToTitleCase(str: string): string {
    const spacedString = str.replace(/([A-Z])/g, " $1");
    return spacedString.charAt(0).toUpperCase() + spacedString.slice(1).toLowerCase();
  }

  private get dateSelectedStr(): string {
    return this.dateSelected.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
