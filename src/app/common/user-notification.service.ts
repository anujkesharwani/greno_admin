import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, updateDoc } from '@angular/fire/firestore';
import { UserNotification } from './notification.structure';
@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  constructor(private firestore:Firestore) { }

  notificationBase = {
    createdAt: new Date(),
    read: false,
  } 
  message = {
    bookingAllotted: {
      title: 'New Booking',
      body: 'A new booking is allotted to you',
      icon: '',
      ...this.notificationBase
    },
    bookingAccepted: {
      title: 'Booking Accepted',
      body: 'Your booking has been accepted by the Agent',
      icon: '',
      ...this.notificationBase
    },
    bookingOTPVerified: {
      title: 'Booking OTP Verified',
      body: 'Your booking OTP is verified',
      icon: '',
      ...this.notificationBase
    },
    bookingCompleted: {
      title: 'Booking Completed',
      body: 'Your booking has been completed by the Agent',
      icon: '',
      ...this.notificationBase
    },
    bookingRejected: {
      title: 'Booking Rejected',
      body: 'Your booking has been rejected',
      icon: '',
      ...this.notificationBase
    }
  }
  addAgentNotification(agentId: string, notification: UserNotification){
    return addDoc(collection(this.firestore, 'agents', agentId, 'notifications'), notification);
  }

  addUserNotification(userId: string, notification: UserNotification){
    return addDoc(collection(this.firestore, 'users', userId, 'notifications'), notification);
  }
}