import { Injectable } from "@angular/core";
import { Assignment, Booking, BookingUpdated } from "./booking.structure";
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
  documentId,
  or,
  startAt,
  deleteDoc,
} from "@angular/fire/firestore";
import { BehaviorSubject, Subject } from "rxjs";
import { faker } from "@faker-js/faker";
import Utils from "../Shared/shared-services/util";
import {
  DocumentData,
  QuerySnapshot,
  endAt,
  orderBy,
} from "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  bookings: Booking[] = [];
  isFullWidth: boolean = false;
  userAdded: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  addressAdded: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public refreshCounts: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  bookingsSubject: Subject<Booking[]> = new Subject<Booking[]>();
  public selectedBooking$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public selectedDate: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(public firestore: Firestore) {}

  getAllReviews() {
    return getDocs(collection(this.firestore, "Review"));
  }

  addBooking(booking: BookingUpdated, userId: string) {
    return setDoc(
      doc(this.firestore, "users", userId, "bookings", booking.id!),
      booking
    );
  }

  getBookings(date?: string) {
    const x = getDocs(collectionGroup(this.firestore, "bookings"));

    return x;
  }

  saveItems(userId: string, bookingId: string, obj: any, subTotal: number) {
    return updateDoc(
      doc(this.firestore, "users", userId, "bookings", bookingId),
      {
        ...obj,
        billing: {
          subTotal: subTotal,
          discount: obj.billing.discount,
          tax: obj.billing.tax,
          grandTotal: obj.billing.tax + subTotal - obj.billing.discount,
        },
      }
    );
  }

  async getBookings2(startDate: string, endDate: string) {
    const bookingsRef = collectionGroup(this.firestore, "bookings");
    const resultArray: { id: string; createdAt: any }[] = [];
    // Convert date strings to Firestore Timestamps
    const startTimestamp = Timestamp.fromDate(new Date(startDate));
    const endTimestamp = Timestamp.fromDate(new Date(endDate));

    const query1 = query(
      bookingsRef,
      where("createdAt", ">=", startTimestamp),
      where("createdAt", "<=", endTimestamp)
    );

    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(query1);
      // Extract document data (ID and createdAt) and push into the array
      querySnapshot.docs.forEach((doc) => {
        resultArray.push({
          id: doc.id,
          createdAt: doc.data()?.["createdAt"],
        });
      });
    } catch (error) {
      console.error("Error getting booking data:", error);
    }
    return resultArray;
  }
  async getBookingBySlot(startDate: string, endDate: string) {
    const bookingsRef = collectionGroup(this.firestore, "bookings");
    const resultArray: { id: string; timeSlot: any; time: any }[] = [];
    // Convert date strings to Firestore Timestamps
    const startTimestamp = Timestamp.fromDate(new Date(startDate));
    const endTimestamp = Timestamp.fromDate(new Date(endDate));

    const query1 = query(
      bookingsRef,
      where("createdAt", ">=", startTimestamp),
      where("createdAt", "<=", endTimestamp)
    );

    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(query1);
      // Extract document data (ID and createdAt) and push into the array
      querySnapshot.docs.forEach((doc) => {
        // console.log(this.formatAMPM(doc.data()?.['timeSlot'].time));
        // const formattedStartTime = this.formatAMPM( new Date(doc.data()?.['timeSlot']?.time?.startTime?.seconds * 1000) );
        // console.log(formattedStartTime);

        resultArray.push({
          id: doc.id,
          timeSlot: doc.data()?.["timeSlot"],
          time: this.formatAMPM(
            new Date(doc.data()?.["timeSlot"]?.time?.startTime?.seconds * 1000)
          ),
        });
      });
    } catch (error) {
      console.error("Error getting booking data:", error);
    }
    return resultArray;
  }
  async getNumberOfAgents() {
    const bookingsRef = collectionGroup(this.firestore, "bookings");
    const uniqueAgents: Set<string> = new Set();

    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
        bookingsRef
      );

      querySnapshot.forEach((doc) => {
        const assignedAgent = doc.data()?.["assignedAgent"];
        if (assignedAgent !== undefined) {
          uniqueAgents.add(assignedAgent);
        }
      });
    } catch (error) {
      console.error("Error getting booking data:", error);
    }

    const numberOfAgents = uniqueAgents.size;

    return numberOfAgents;
  }

  async getBookingByAgent(startDate: string, endDate: string) {
    const bookingsRef = collectionGroup(this.firestore, "bookings");
    const resultArray: { id: string; assignedAgent: any; agentName: any }[] =
      [];
    const startTimestamp = Timestamp.fromDate(new Date(startDate));
    const endTimestamp = Timestamp.fromDate(new Date(endDate));

    const query1 = query(
      bookingsRef,
      where("createdAt", ">=", startTimestamp),
      where("createdAt", "<=", endTimestamp)
    );
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(query1);
      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          if (doc.data()?.["assignedAgent"] != undefined) {
            let getAgentName = "";
            const agentQuerySnapshot = await getDocs(
              query(
                collection(this.firestore, "agents"),
                where(documentId(), "==", doc.data()?.["assignedAgent"])
              )
            );
            getAgentName = agentQuerySnapshot.docs[0]?.data()?.["name"];
            resultArray.push({
              id: doc.id,
              assignedAgent: doc.data()?.["assignedAgent"],
              agentName: getAgentName,
            });
          }
        })
      );
    } catch (error) {
      console.error("Error getting booking data:", error);
    }
    return resultArray;
  }
  async getBookingByService(startDate: string, endDate: string) {
    const bookingsRef = collectionGroup(this.firestore, "bookings");
    const resultArray: {
      [x: string]: any;
      id: string;
      services: any;
    }[] = [];
    const startTimestamp = Timestamp.fromDate(new Date(startDate));
    const endTimestamp = Timestamp.fromDate(new Date(endDate));

    const query1 = query(
      bookingsRef,
      where("createdAt", ">=", startTimestamp),
      where("createdAt", "<=", endTimestamp)
    );
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(query1);
      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          resultArray.push({
            id: doc.id,
            services: doc.data()?.["services"],
          });
        })
      );
    } catch (error) {
      console.error("Error getting booking data:", error);
    }
    return resultArray;
  }

  async getBookings_sta() {
    let totalSales = 0;
    let totalDiscounts = 0;
    let averageBills = 0;
    let totalBooking = 0;

    const bookingsRef = collectionGroup(this.firestore, "bookings");
    const query1 = query(bookingsRef);
    const querySnapshot = await getDocs(query1);

    querySnapshot.forEach((doc) => {
        const billing = doc.data()?.["billing"];
        if (billing) {
            totalSales += Math.round(billing.grandTotal || 0);
            totalDiscounts +=Math.round(billing.discount || 0);
            totalBooking += 1;
        }
    });

    averageBills =Math.round(totalBooking > 0 ? totalSales / totalBooking : 0);

    return { totalSales, totalDiscounts, averageBills };
}

  

  async getBookingStatusCount() {
    const bookingsRef = collectionGroup(this.firestore, "bookings");
    const statusCounts: {
      [x: string]: any;
      completed: number;
      inProgress: number;
      declined: number;
    } = {
      completed: 0,
      inProgress: 0,
      declined: 0,
    };

    const query1 = query(bookingsRef);

    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(query1);

      querySnapshot.forEach((doc) => {
        const stage = doc.data()?.["stage"];

        switch (stage) {
          case "completed":
            statusCounts.completed++;
            break;
          case "discarded":
            statusCounts.declined++;
            break;
          default:
            // Any other stage is considered as 'inProgress'
            statusCounts.inProgress++;
            break;
        }
      });
    } catch (error) {
      console.error("Error getting booking data:", error);
    }

    return statusCounts;
  }

  async getBookingStatusByDay(startDate: string, endDate: string) {
    const bookingsRef = collectionGroup(this.firestore, "bookings");
    const resultArray: { id: string; timeSlot: any; stage: any }[] = [];
    const startTimestamp = Timestamp.fromDate(new Date(startDate));
    const endTimestamp = Timestamp.fromDate(new Date(endDate));

    const query1 = query(
      bookingsRef,
      where("createdAt", ">=", startTimestamp),
      where("createdAt", "<=", endTimestamp)
    );
    try {
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(query1);
      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          if (doc.data()?.["assignedAgent"] != undefined) {
            let getAgentName = "";
            const agentQuerySnapshot = await getDocs(
              query(
                collection(this.firestore, "agents"),
                where(documentId(), "==", doc.data()?.["assignedAgent"])
              )
            );
            getAgentName = agentQuerySnapshot.docs[0]?.data()?.["name"];
            resultArray.push({
              id: doc.id,
              timeSlot: doc.data()?.["timeSlot"],
              stage: doc.data()?.["stage"],
            });
          }
        })
      );
    } catch (error) {
      console.error("Error getting booking data:", error);
    }
    return resultArray;
  }

  formatAMPM(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  getTaxes() {
    return getDocs(collectionGroup(this.firestore, "taxes"));
  }

  getDiscounts() {
    return getDocs(collectionGroup(this.firestore, "coupons"));
  }

  getSubCategories(catalogId: string, categoryId: string) {
    return getDocs(
      query(
        collection(
          this.firestore,
          "service-catalogue",
          catalogId,
          "categories",
          categoryId,
          "categories"
        )
      )
    );
  }

  getCategories(catalogId: string) {
    return getDocs(
      query(
        collection(this.firestore, "service-catalogue", catalogId, "categories")
      )
    );
  }

  getServices(catalogId: string) {
    return getDocs(
      query(
        collection(this.firestore, "service-catalogue", catalogId, "services")
      )
    );
  }

  getBookingsByDate(startDate: Date, endDate: Date) {
    // set time of the start date to 00:00:00
    // set the time of the end date to 23:59:59
    startDate.setHours(0, 0, 0);
    endDate.setHours(23, 59, 59);
    return getDocs(
      query(
        collectionGroup(this.firestore, "bookings"),
        where("createdAt", ">=", Timestamp.fromDate(startDate)),
        where("createdAt", "<=", Timestamp.fromDate(endDate))
      )
    );
  }

  getBookingsByKey(key: string, bookingSearchInput: string) {
    return getDocs(
      query(
        collectionGroup(this.firestore, "bookings"),
        where(key, ">=", bookingSearchInput)
      )
    );
  }

  assignAgent(userId: string, bookingId: string, agentId: string) {
    return updateDoc(
      doc(this.firestore, "users", userId, "bookings", bookingId),
      { assignedAgent: agentId, stage: "assigned" }
    );
  }

  reAssignAgent(userId: string, bookingId: string, agentId: string) {
    return updateDoc(
      doc(this.firestore, "users", userId, "bookings", bookingId),
      { assignedAgent: agentId }
    );
  }

  getUsers() {
    return getDocs(collection(this.firestore, "users"));
  }

  getUsersByText(text: string, key: string) {
    text = text.toUpperCase();
    return getDocs(
      query(collection(this.firestore, "users"), where(key, ">=", text))
    );
  }

  getSlots() {
    return getDocs(collection(this.firestore, "slots"));
  }

  updateSlotStatus(slotId: string, slotStatus: boolean) {
    return updateDoc(doc(this.firestore, "slots", slotId), {
      active: slotStatus,
    });
  }

  getAddressByCustomerId(userId: string) {
    return getDocs(
      query(collection(this.firestore, "users", userId, "addresses"))
    );
  }

  getAllFakeBookings() {
    // generate fake bookings using faker js
    let bookings: Booking[] = [];
    for (let i = 0; i < 100; i++) {
      let booking: Booking = {
        id: faker.datatype.uuid(),
        // subCategory: {
        //   id: faker.datatype.uuid(),
        //   name: faker.commerce.productName(),
        //   image: faker.image.imageUrl(),
        // },
        agentData: {
          agentName: faker.person.fullName(),
          agentPic: faker.image.url(),
          agentID: faker.datatype.uuid(),
        },
        jobOtp: faker.datatype.number().toString(),
        // mainCategory: {
        //   id: faker.datatype.uuid(),
        //   name: faker.commerce.productName(),
        //   image: faker.image.imageUrl(),
        // },
        services: [],
        billing: {
          grandTotal: faker.datatype.number(),
          tax: faker.datatype.number(),
          discount: faker.datatype.number(),
          subTotal: faker.datatype.number(),
          totalJobTime: faker.datatype.number(),
          totalJobAcceptanceCharge: faker.datatype.number(),
        },
        createdAt: Timestamp.fromDate(faker.date.recent()),
        address: {
          addressLine1: faker.address.streetAddress(),
          addressLine2: faker.address.secondaryAddress(),
          pinCode: faker.address.zipCode(),
          name: faker.person.jobArea(),
        },
        timeSlot: {
          date: Timestamp.fromDate(faker.date.recent()),
          time: Timestamp.fromDate(faker.date.recent()),
        },
        currentUser: {
          userId: faker.datatype.uuid(),
          name: faker.person.fullName(),
          phoneNumber: faker.phone.number(),
          avatar: faker.image.url(),
        },
        payment: {
          amount: faker.datatype.number(),
          paymentId: faker.datatype.uuid(),
          paymentMethod: faker.finance.currencyName(),
          paymentStatus: faker.finance.transactionType(),
        },
        assignedAgent: faker.datatype.uuid(),
        stage: "assigned",
      };
      bookings.push(booking);
    }
    return new Promise<Booking[]>((resolve, reject) => {
      resolve(bookings);
    });
  }

  updateBooking(
    userId: string,
    bookingId: string,
    nextStage: string,
    isDelivery?: boolean,
    agentId?: string,
    data?: any
  ) {
    let obj: any = {};
    if (nextStage === Utils.stageMaster.acceptancePending.key) {
      obj["assignedAgent"] = agentId;
      if (isDelivery) obj["allotmentDeliveryAt"] = new Date();
      else obj["allotmentPickupAt"] = new Date();
    } else if (nextStage === Utils.stageMaster.jobAccepted.key) {
      if (isDelivery) obj["deliveryAcceptedAt"] = new Date();
      else obj["pickupAcceptedAt"] = new Date();
    } else if (nextStage === Utils.stageMaster.inProgress.key) {
      if (isDelivery) obj["deliveryOtpAt"] = new Date();
      else obj["otpAt"] = new Date();
      if (isDelivery) obj["progressDeliveryAt"] = new Date();
      else obj["progressAt"] = new Date();
    } else if (nextStage === Utils.stageMaster.completed.key) {
      obj["completedAt"] = new Date();
      if (isDelivery) obj["deliveryTime"] = new Date();
      else {
        obj["pickupTime"] = new Date();
        obj["isDelivery"] = true;
        nextStage = Utils.stageMaster.washInProgress.key;
      }
    } else if (nextStage === Utils.stageMaster.discarded.key) {
      obj["discardedAt"] = new Date();
    }
    obj["stage"] = nextStage;
    if (data) {
      obj = { ...obj, ...data };
    }
    return updateDoc(
      doc(this.firestore, "users", userId, "bookings", bookingId),
      obj
    );
  }

  updateBookingAssignment(
    userId: string,
    bookingId: string,
    assignmentId: string,
    obj: any
  ) {
    return updateDoc(
      doc(
        this.firestore,
        "users",
        userId,
        "bookings",
        bookingId,
        "assignments",
        assignmentId
      ),
      obj
    );
  }

  getBookingAssignments(userId: string, bookingId: string) {
    return getDocs(
      collection(
        this.firestore,
        "users",
        userId,
        "bookings",
        bookingId,
        "assignments"
      )
    );
  }

  deleteBookingAssignments(
    userId: string,
    bookingId: string,
    assignmentId: string
  ) {
    return deleteDoc(
      doc(
        this.firestore,
        "users",
        userId,
        "bookings",
        bookingId,
        "assignments",
        assignmentId
      )
    );
  }

  addBookingAssignments(
    userId: string,
    bookingId: string,
    assignment: Assignment
  ) {
    return addDoc(
      collection(
        this.firestore,
        "users",
        userId,
        "bookings",
        bookingId,
        "assignments"
      ),
      assignment
    );
  }

  addAddress(userId: string, address: any) {
    return addDoc(
      collection(this.firestore, "users", userId, "addresses"),
      address
    );
  }

  getBookingsById(userId: string, bookingId: string) {
    return getDocs(
      query(
        collection(this.firestore, "users", userId, "bookings"),
        where(documentId(), "==", bookingId)
      )
    );
  }

  getBookingsAssignment(userId: string, bookingId: string) {
    return getDocs(
      collection(
        this.firestore,
        "users",
        userId,
        "bookings",
        bookingId,
        "assignments"
      )
    );
  }

  getAgentBookingSlots(agentId: string, date: string) {
    return getDocs(
      query(
        collection(this.firestore, "agents", agentId, "slots"),
        where(documentId(), "==", date)
      )
    );
  }

  updAgentBookingSlots(agentId: string, slotId: string, obj: any) {
    return updateDoc(
      doc(this.firestore, "agents", agentId, "slots", slotId),
      obj
    );
  }

  updateBookingPics(userId: string, bookingId: string, obj: any) {
    return updateDoc(
      doc(this.firestore, "users", userId, "bookings", bookingId),
      obj
    );
  }

  async getFixedCharges() {
    const chargesRef = collection(
      this.firestore,
      "customer-settings",
      "fixed-charges",
      "charges"
    );
    const query1 = query(chargesRef, where("active", "==", true));
    return getDocs(query1);
  }
}
