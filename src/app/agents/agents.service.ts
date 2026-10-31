import { Injectable } from '@angular/core';
import { AgentInfo } from './agents.structure';
import { faker } from '@faker-js/faker';
import { Booking } from '../core/booking.structure';
import { Firestore, collection, collectionData, collectionGroup, deleteDoc, doc, documentId, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  constructor(private firestore: Firestore) { }

  async getAgents(endDate?: Date) {
    if (!endDate) {
      endDate = new Date();
    }
    return new Promise<AgentInfo[]>(async (resolve, reject) => {
      const today = moment(new Date()).format('YYYY-MM-DD');
      let customers: AgentInfo[] = [];
      let querySnapshot = await getDocs(collection(this.firestore, "agents"));
      let docs = querySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() } as any })
      await Promise.all(docs.map(async (doc) => {

        let bookings = (await getDocs(query(collectionGroup(this.firestore, 'bookings'), where('assignedAgent', '==', doc.id)))).docs.map((doc) => { return { id: doc.id, ...doc.data() } as Booking });
        customers.push({
          image: doc.photoUrl ? doc.photoUrl : `https://api.dicebear.com/7.x/initials/svg?radius=50&size=36&seed=${doc.name}`,
          name: doc.name,
          phone: doc.phoneNumber,
          email: doc.email,
          chatId: doc.uid,
          userId: doc.uid,
          cityId:doc.address.city.id,
          totalOrders: bookings.length,
          averageBills: bookings.length,
          totalBills: bookings.length,
          totalBillsAmount: bookings.filter((booking) => (['completed'].includes(booking.stage || ''))).reduce((acc, booking) => acc + booking.billing.grandTotal, 0),
          totalAcceptanceAmount: bookings.filter((booking) => (['completed'].includes(booking.stage || ''))).reduce((acc, booking) => acc + booking.billing.totalJobAcceptanceCharge, 0),
          totalAcceptanceAmountToday: bookings.filter((booking) => (['completed'].includes(booking.stage || '') && (booking.createdAt && moment(new Date(booking.createdAt.seconds * 1000)).format('YYYY-MM-DD') === today))).reduce((acc, booking) => acc + booking.billing.totalJobAcceptanceCharge, 0),
          pendingBills: bookings.length,
          pendingAmount: bookings.filter((booking) => !(['completed', 'cancelled'].includes(booking.stage || ''))).reduce((acc, booking) => acc + booking.billing.grandTotal, 0),
          orders: bookings as Booking[],
          completedBookings: bookings.filter((booking) => (['completed'].includes(booking.stage || ''))).length,
          completedBookingsToday: bookings.filter((booking) => (['completed'].includes(booking.stage || '') && (booking.createdAt && moment(new Date(booking.createdAt.seconds * 1000)).format('YYYY-MM-DD') === today))).length,
          registerDate: doc.createdDate,
          active: doc.active ? true : false,
          currentLocation: {
            longitude: 0,
            latitude: 0
          },
          aadharNumber: doc.userProofDocument.aadhaarNumber,
          aadhaarImageUrl: doc.userProofDocument.aadhaarImageUrl,
          panNumber: doc.userProofDocument.panNumber,
          panImageUrl: doc.userProofDocument.panUrl,
          address: this.getAddress(doc)
        })
      }))
      resolve(customers);
    })
  }

  async getAgentById(agentId: string) {
    return getDocs(query(collection(this.firestore, 'agents'), where(documentId(), '==', agentId)));
  }

  deleteAgent(agentId: any) {
    return deleteDoc(doc(this.firestore, "agents", agentId));
  }

  async getAllAgents() {
    return getDocs(query(collection(this.firestore, "agents"), where('type', '==', 'agent')));
  }

  getAllAgentsSubscription() {
    return collectionData(collection(this.firestore, "agents"), { idField: 'id' });
  }

  getAgentsSlotsSubscription(userId: string) {
    return collectionData(collection(this.firestore, 'agents', userId, 'slots'), { idField: 'id' });
  }

  updAgentStatus(agentId: string, status: boolean) {
    return updateDoc(doc(this.firestore, 'agents', agentId), { active: status });
  }

  getAddress(data: any) {
    return data.address ? `${data.address?.addressLine}, ${data.address.city?.name || ''}, ${data.address.state?.state || ''}` : '';
  }
}
