import { Injectable } from "@angular/core";
import {
  Firestore,
  doc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  collectionData,
  docData,
  query,
  collectionGroup,
  updateDoc,
  Timestamp,
  where,
  deleteDoc,
} from "@angular/fire/firestore";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  addServiceCatalogue: any;

  constructor(private firestore: Firestore) {}

  getRole() {
    return getDocs(collection(this.firestore, "item-catalogue"));
  }

  // getRole(services:any) {
  //   return getDocs(collection(this.firestore, "service-catalogue",services));
  // }

  //Deleting data in firebase
  deleteRole(itemName: any) {
    return deleteDoc(doc(this.firestore, "item-catalogue", itemName));
  }

  //updating data in firebase
  updateItem(roleData: any) {
    return setDoc(
      doc(this.firestore, "item-catalogue", roleData.itemName),
      roleData
    );
  }
}
