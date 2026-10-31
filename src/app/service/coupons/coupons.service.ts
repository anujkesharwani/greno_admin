import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Coupon } from './coupons.structure';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  constructor(private firestore: Firestore) {}

  getCoupons(): Promise<QuerySnapshot<DocumentData>> {
    return getDocs(collection(this.firestore, 'coupons'));
  }

  addCoupon(coupon: Coupon): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.firestore, 'coupons'), {
      ...coupon,
      createdOn: new Date(),
      lastUpdated: new Date(),
    });
  }

  updateCoupon(id: string, coupon: Coupon): Promise<void> {
    return updateDoc(doc(this.firestore, 'coupons', id), {
      ...coupon,
      lastUpdated: new Date(),
    });
  }

  deleteCoupon(id: string): Observable<void> {
    return from(deleteDoc(doc(this.firestore, 'coupons', id)));
  }
}
