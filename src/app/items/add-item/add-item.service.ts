import { Injectable } from "@angular/core";
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AddItemService {
  constructor(public firestore: Firestore) {}

  //Adding data in Firebase
  addItem(roleData: any) {
    if (roleData.id)
      return updateDoc(
        doc(this.firestore, "item-catalogue", roleData.id),
        roleData
      );
    else
      return setDoc(
        doc(this.firestore, "item-catalogue", roleData.itemName),
        roleData
      );
  }

  //Fetching data from firebase
  getRole() {
    return getDocs(collection(this.firestore, "item-catalogue"));
  }

  //Deleting data in firebase
  deleteRole(roleId: any) {
    return deleteDoc(doc(this.firestore, "roles", roleId));
  }

  //Updating data in firebase
  updateItem(roleData: any) {
    return updateDoc(
      doc(this.firestore, "item-catalogue", roleData.id),
      roleData
    );
  }
}