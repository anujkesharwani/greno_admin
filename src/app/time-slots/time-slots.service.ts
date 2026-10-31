import { Injectable } from '@angular/core';
import { Firestore, doc,collection, getDocs, addDoc, setDoc, collectionData, docData, query, collectionGroup, updateDoc, Timestamp, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {
  constructor(
    private firestore:Firestore,
  ) { }

  getSlots() {
    return getDocs(collection(this.firestore, 'slots'));
  }

  updateSlotStatus(slotId: string, slotStatus: boolean) {
    return updateDoc(doc(this.firestore,'slots',slotId), {active:slotStatus});
  }
}