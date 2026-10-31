import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Booking } from '../booking.structure';
import { ExcelService } from '../excel.service';
import { ReportsService } from '../reports.service';
import { PdfService } from '../pdf.service';
import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  documentId,
  orderBy,
  limit,
  collectionGroup,
} from 'firebase/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { DataProviderService } from 'src/app/core/data-provider.service';
@Component({
  selector: 'app-delivary-completed-booking',
  templateUrl: './delivary-completed-booking.component.html',
  styleUrls: ['./delivary-completed-booking.component.scss']
})



 export class DelivaryCompletedBookingComponent implements OnInit {


allColumns: any[] = [
  "Booking Id",
  "status",
  "createdOn",
  "bookingDate",
  "timeSlot",
  "Pickup Date Time",
  "Delivery Date Time",
  "customer id",
  "customer name",
  "customer Mob.",
  "agent id",
  "agent name",
  "agent Mob.",
  "address",
  "services",
  "cost",
  "tax",
  "Discount",
];
displayedColumns: string[] = this.allColumns; // Initially display all columns
columnVisibility: { [key: string]: boolean } = {};
refreshedAt: string = "";
isLoading: boolean = false;
dateSelected: Date = new Date();
bookings: Booking[] | any;
dateRange!: FormGroup;
selectedColumns: any;
bookingcounter = 0;
grandtotal = 0;
totalTax = 0;
totalDiscount = 0;
agentsid = new Array();
uniqueAgents=new Array();
numberOfAgents: number=0;
uniqueCustomer=new Array();
numberofCustomer:number=0;
constructor(
  private fb: FormBuilder,
  public dialogRef: MatDialogRef<DelivaryCompletedBookingComponent>,
  @Inject(MAT_DIALOG_DATA)
  private data: {
    dateSelected: Date;
  },
  private excelService: ExcelService,
  private pdfService: PdfService,
  private ReportsService: ReportsService,
  private firestore: Firestore,
  public dataProvider: DataProviderService,//copy this
  public AuthService: AuthService,//copy this
) {}

ngOnInit(): void {
  // Initialize column visibility
  this.allColumns.forEach((column) => {
    this.columnVisibility[column] = true;
  });
  this.dateSelected = this.data.dateSelected;
  this.initDateRangeForm();
  this.loadBookings();
  //this.getUsersBooking()
}

initDateRangeForm(): void {
  const endDate = this.formatDate(new Date()); // Current date
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7); // 7 days ago
  const formattedStartDate = this.formatDate(startDate);
  this.dateRange = this.fb.group({
    start: [formattedStartDate + "T00:00:00"], // Default start date
    end: [endDate + "T23:59:59"], // Default end date
  });
  this.dateRange.valueChanges.subscribe(() => {
    this.getUsersBooking();
  });
}
allowedCities: any [] //copy this
async getUsersBooking() {
  this.bookingcounter = 0;
  this.totalDiscount = 0;
  this.totalTax = 0;
  this.grandtotal = 0;
  this.bookings = [];
  let agentid: any[] = [];
  this.uniqueAgents=[]
  this.numberOfAgents=0
  this.uniqueCustomer=[]
  this.numberofCustomer=0
  //this.agents.clear();
  let start = this.dateRange.get("start")?.value;
  let end = this.dateRange.get("end")?.value;
  const startTimestamp = new Date(start);
  const endTimestamp = new Date(end);
  const timestamp1 = startTimestamp.getTime();
  const timestamp2 = endTimestamp.getTime();
  const usersSnapshot = await this.ReportsService.getBookingByService();
  const allowedCities = await this.AuthService.getAllowedCities();
      
  this.allowedCities = allowedCities.map((city:any) => city.cityId);
  usersSnapshot.docs.forEach(async (user: { id: string }) => {
    const bookingsSnapshot = await getDocs(
      collection(this.firestore, "users", user.id, "bookings")
    );

    bookingsSnapshot.docs.forEach(async (booking) => {
      //console.log(booking.data());
      const bookingData = booking.data();
      const createdOn = bookingData["timeSlot"]["date"].toDate().getTime();
      const createdTimeStamp = new Date(createdOn).getTime();
      let startTime = new Date(
        bookingData["timeSlot"]["time"]["startTime"].toDate()
      ).toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      let endTime = new Date(
        bookingData["timeSlot"]["time"]["endTime"].toDate()
      ).toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      let concatenatedNames = "";
      for (let i = 0; i < bookingData["services"].length; i++) {
        concatenatedNames += bookingData["services"][i].name + "/";
      }

      let formattedDelivaryDateTime = "";
      const completedDate = bookingData["deliveryTime"]?.toDate();
      if (completedDate) {
        formattedDelivaryDateTime = this.formatCustomDateTime(
          new Date(completedDate)
        );
      }
      let formattedPickupDateTime = "";
      const pickupDate = bookingData["pickupTime"]?.toDate();
      if (pickupDate) {
        formattedPickupDateTime = this.formatCustomDateTime(
          new Date(pickupDate)
        );
      }
      let HouseName = bookingData["address"].addressLine1;
      let Locality = bookingData["address"].formatted_address;
      let Pincodde = bookingData["address"].pincode;
      const assignedAgent = bookingData["assignedAgent"];
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

      if (timestamp1 <= createdTimeStamp && createdTimeStamp <= timestamp2 && validBooking==true ) {
        if(bookingData['stage']=="completed"){
        this.bookingcounter = this.bookingcounter + 1;

        this.grandtotal = this.grandtotal + bookingData["billing"].subTotal;
        this.totalTax = parseInt(this.totalTax + bookingData["billing"].tax);
        this.totalDiscount =this.totalDiscount + bookingData["billing"].discount;
        //unique agent
        const assignedAgent = bookingData["assignedAgent"];
        if (assignedAgent !== undefined) {
          this.uniqueAgents.push(assignedAgent);
        }
        //console.log(new Set(this.uniqueAgents));
        this.numberOfAgents =new Set(this.uniqueAgents).size;
        //console.log(this.numberOfAgents)
        //unique agent
        //unique customer
        const customer= bookingData["currentUser"].userId
        if (customer!==undefined){
          this.uniqueCustomer.push(customer);
        }
        this.numberofCustomer=new Set(this.uniqueCustomer).size;
        //console.log(this.numberofCustomer);
        //unique customer
        if (bookingData["assignedAgent"]) {
          const agentDoc = await getDoc(
            doc(this.firestore, "agents", bookingData["assignedAgent"])
          );
          const agentData = agentDoc.data();

          //agentid.push(bookingData["assignedAgent"]);
          //this.agents.add(bookingData['assignedAgent']);
          this.bookings.push({
            "Booking Id": bookingData["id"],
            status: bookingData["stage"],
            createdOn: this.formatCustomDate(
              new Date(bookingData["createdAt"].toDate())
            ),
            bookingDate: this.formatCustomDate(
              new Date(bookingData["timeSlot"]["date"].toDate())
            ),
            timeSlot: startTime + "-" + endTime,
            "Pickup Date Time": formattedPickupDateTime,
            "Delivery Date Time": formattedDelivaryDateTime,
            "customer id": bookingData["currentUser"].userId,
            "customer name": bookingData["currentUser"].name,
            "customer Mob.": bookingData["currentUser"].phoneNumber,
            "agent id": bookingData["assignedAgent"],
            "agent name": agentData?.["name"],
            "agent Mob.": agentData?.["phoneNumber"],
            address: HouseName + "," + Locality + "," + Pincodde,
            services: concatenatedNames,
            cost: bookingData["billing"].subTotal,
            tax: bookingData["billing"].tax,
            Discount: bookingData["billing"].discount,
          });
        } else {
          this.bookings.push({
            "Booking Id": bookingData["id"],
            status: bookingData["stage"],
            createdOn: this.formatCustomDate(
              new Date(bookingData["createdAt"].toDate())
            ),
            bookingDate: this.formatCustomDate(
              new Date(bookingData["timeSlot"]["date"].toDate())
            ),
            timeSlot: startTime + "-" + endTime,
            "Pickup Date Time": formattedPickupDateTime,
            "Delivery Date Time": formattedDelivaryDateTime,
            "customer id": bookingData["currentUser"].userId,
            "customer name": bookingData["currentUser"].name,
            "customer Mob.": bookingData["currentUser"].phoneNumber,
            "agent id": bookingData["assignedAgent"],
            "agent name": "", //agentData?.['name'],
            "agent Mob.": "", //agentData?.['phoneNumber'],
            address: HouseName + "," + Locality + "," + Pincodde,
            services: concatenatedNames,
            cost: bookingData["billing"].subTotal,
            tax: bookingData["billing"].tax,
            Discount: bookingData["billing"].discount,
          });
        }
      }
    }
    });
  });
  
}

loadBookings(): void {
  this.refresh();
  this.bookings = [];
}
refresh(): void {
  this.isLoading = true;
  this.refreshedAt = "Refreshing...";
  this.loadingbooking().then(() => {
    this.refreshedAt = "Data loaded at " + new Date().toLocaleTimeString();
    this.isLoading = false;
    //this.setChartData();
  });
  // this.initDateRangeForm();
}

private get dateSelectedStr(): string {
  const startDate = this.dateRange.get("start")?.value
    ? new Date(this.dateRange.get("start")?.value)
    : this.dateSelected;
  const endDate = this.dateRange.get("end")?.value
    ? new Date(this.dateRange.get("end")?.value)
    : this.dateSelected;
  const formattedStartDate = startDate.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedEndDate = endDate.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return `${formattedStartDate} - ${formattedEndDate}`;
}

private get exportBookings(): any {
  return this.bookings?.map((booking: any) => {
    const b: any = {
      ...booking,
      
    };
    delete b.customer;
    delete b.agent;
    return b;
  });
}

private async loadingbooking() {
  await this.getUsersBooking();
}
downloadExcel() {
  this.excelService.export(
    this.exportBookings,
    "All Bookings on " + this.dateSelectedStr
  );
}

downloadPDF() {
  this.pdfService.export(
    this.exportBookings,
    "All Bookings on " + this.dateSelectedStr,
    "landscape",
    "a2"
  );
}
updateColumnVisibility(): void {
  this.displayedColumns = this.allColumns.filter(
    (column) => this.columnVisibility[column]
  );
}

formatCustomDate(date_db: {
  getDate: () => any;
  toLocaleString: (arg0: string, arg1: { month: string }) => any;
  getFullYear: () => any;
}) {
  const day = date_db.getDate();
  const month = date_db.toLocaleString("default", { month: "short" });
  const year = date_db.getFullYear();
  return `${day} ${month} ${year}`;
}
formatCustomDateTime(date_Time: {
  getDate: () => any;
  toLocaleString: (arg0: string, arg1: { month: string }) => any;
  getFullYear: () => any;
  getHours: () => any;
  getMinutes: () => any;
}) {
  const day = date_Time.getDate();
  const month = date_Time.toLocaleString("default", { month: "short" });
  const year = date_Time.getFullYear();
  const hours = date_Time.getHours();
  const minutes = date_Time.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${ampm}`;
  return `${day} ${month} ${year} ${formattedTime}`;
}
formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
}




