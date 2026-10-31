import { Injectable } from "@angular/core";
import { Firestore, doc } from "@angular/fire/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { Tax } from "./taxes.structure";

@Injectable({
  providedIn: "root",
})
export class TaxesService {
  constructor(private firestore: Firestore) {}

  getTaxes() {
    return getDocs(collection(this.firestore, "taxes"));
  }

  addTax(tax: Tax) {
    return addDoc(collection(this.firestore, "taxes"), {
      ...tax,
      createdOn: new Date(),
      lastUpdated: new Date(),
    });
  }

  getTax(id: string) {
    return getDoc(doc(this.firestore, "taxes", id));
  }

  updateTax(id: string, tax: any) {
    return updateDoc(doc(this.firestore, "taxes", id), {
      ...tax,
      lastUpdated: new Date(),
    });
  }

  deleteTax(id: string) {
    return deleteDoc(doc(this.firestore, "taxes", id));
  }
  changeTaxStatus(id: any, status: any) {
    return updateDoc(doc(this.firestore, "taxes", id), { active: status });
  }
}
