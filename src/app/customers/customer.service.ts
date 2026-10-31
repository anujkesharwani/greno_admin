import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { CustomerInfo } from './customer.structure';
import { Firestore, collection, deleteDoc, doc, documentId, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Booking } from '../core/booking.structure';
import moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firestore: Firestore) { }

  async getCustomers(endDate?: Date) {

    if (!endDate) {
      endDate = new Date();
    }
    return new Promise<CustomerInfo[]>(async (resolve, reject) => {
      const today = moment(new Date()).format('YYYY-MM-DD');
      let customers: CustomerInfo[] = [];
      let querySnapshot = await getDocs(query(collection(this.firestore, "users"), where('type', '==', 'customer')));
      let docs = querySnapshot.docs.map((doc) => { return { id: doc.id, ...doc.data() } as any })
      await Promise.all(docs.map(async (doc) => {
        let cityId:any[]=[]
        await(getDocs(collection(this.firestore, "users", doc.id,'addresses'))).then((addresses)=>{
          addresses.docs.map((address:any)=>{
            cityId.push(address.data()['cityId'])
          })
        })
        let bookings = (await getDocs(collection(this.firestore, "users", doc.id, 'bookings'))).docs.map((doc) => { return { id: doc.id, ...doc.data() } as Booking });
        customers.push({
          active: doc.active === false ? false : true,
          image: 'https://api.dicebear.com/7.x/initials/svg?radius=50&size=36&seed=' + doc.name,
          name: doc.name,
          phone: doc.phoneNumber,
          email: doc.email,
          chatId: doc.uid,
          userId: doc.uid,
          cityId:cityId,
          totalOrders: bookings.length,
          averageBills: bookings.length,
          totalBills: bookings.length,
          totalBillsAmount: bookings.filter((booking) => (['completed'].includes(booking.stage || ''))).reduce((acc, booking) => acc + (booking.billing?.grandTotal || 0), 0),
          totalBillsAmountToday: bookings.filter((booking) => (['completed'].includes(booking.stage || '') && (booking.createdAt && moment(new Date(booking.createdAt.seconds * 1000)).format('YYYY-MM-DD') === today))).reduce((acc, booking) => acc + (booking.billing?.grandTotal || 0), 0),
          totalCompletedBooking: bookings.filter((booking) => (['completed'].includes(booking.stage || ''))).length,
          totalCompletedBookingToday: bookings.filter((booking) => (['completed'].includes(booking.stage || '') && (booking.createdAt && moment(new Date(booking.createdAt.seconds * 1000)).format('YYYY-MM-DD') === today))).length,
          pendingBills: bookings.length,
          pendingAmount: bookings.filter((booking) => !(['completed'].includes(booking.stage || ''))).reduce((acc, booking) => acc + (booking.billing?.grandTotal || 0), 0),
          orders: bookings as Booking[],
          registerDate: new Date(),
          currentLocation: {
            longitude: 0,
            latitude: 0
          },
          address: this.getAddress(doc),
          accountNumber:doc.accountNumber
        })
      }))
      resolve(customers);
    });
  }

  deleteCustomer(customerId: any) {
    return deleteDoc(doc(this.firestore, "users", customerId));
  }

  updCustomerStatus(userId: string, status: boolean) {
    return updateDoc(doc(this.firestore, 'users', userId), {active: status});
  }

  getAddress(data: any) {
    return data.address ? `${data.address.addressLine}, ${data.address.city.name || ''}, ${data.address.state.state || ''}` : '';
  }

  async getCustomerById(customerId: string) {
    return getDocs(query(collection(this.firestore, 'users'), where(documentId(), '==', customerId)));
  }
}
