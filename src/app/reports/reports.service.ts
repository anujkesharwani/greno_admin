import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
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
} from "firebase/firestore";
import { user } from "rxfire/auth";

@Injectable({
  providedIn: "root",
})
export class ReportsService {
  constructor(private firestore: Firestore, ) {}

  private formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  
  async getBookingByService() {
    return await getDocs(collection(this.firestore, "users"));
  }
  //grandtotal:any[]=[]
  // async getAverageSales() {
  //   //return getDoc(doc(this.firestore, 'reports','Average_sales'));
  //   return await getDocs(collection(this.firestore, 'users'));
  //   // return  getDocs(doc(this.firestore, 'users'));
  // }
 
  async getWeekSummary() {
    return await getDocs(collection(this.firestore, "users"));
  }

  getTopCategories(date: Date, max: number) {
    return getDocs(
      query(
        collection(
          this.firestore,
          "users",
          this.formatDate(date),
          "categories"
        ),
        orderBy("count", "desc"),
        limit(max)
      )
    );
  }

  getDaySummary() {
    return getDocs(collection(this.firestore, "users"));
  }

  async getDaySummaryy() {
    return  await getDocs(collection(this.firestore, 'users'));
   
   }
}
