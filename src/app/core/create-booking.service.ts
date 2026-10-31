import { Injectable } from "@angular/core";
import { Booking, BookingUpdated } from "./booking.structure";
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  collectionGroup,
  getDoc,
  getDocs,
  setDoc,
} from "@angular/fire/firestore";
import { Category, Service, SubCategory } from "./category-structure";
import { BookingService } from "./booking.service";
import { BehaviorSubject } from "rxjs";
import Utils from "../Shared/shared-services/util";

@Injectable({
  providedIn: "root",
})
export class CreateBookingService {
  fixedCharges: any[] = [];
  selectedServices: any[] = [];
  cart$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  cartInitial: any = {
    id: "",
    services: [],
    billing: {
      grandTotal: 0,
      tax: 0,
      discount: 0,
      coupanDiscunt: undefined,
      subTotal: 0,
      totalJobTime: 0,
      totalJobAcceptanceCharge: 0,
      fixedCharges: this.fixedCharges,
    },
    createdAt: Timestamp.fromDate(new Date()),
    jobOtp: "",
    currentUser: {
      userId: "",
      name: "",
      phoneNumber: "",
    },
  };
  cart: any = this.cartInitial;
  currentCustomer: any;
  discounts: any[] = [];
  userCurrentAddress: any = {};
  taxes: any[] = [];
  applicableDiscounts: any[] = [];
  constructor(
    private bookingService: BookingService,
    private firestore: Firestore
  ) {}

  async addToCart(customer: any, selectedServices: any) {
    let data: any = {
      isPaid: false,
      isPaylater: false,
      address: this.userCurrentAddress,
      isUpdateSlot: false,
      picsAfter: [],
      picsBefore: [],
      cancelReason: "",
      isDelivery: false,
      currentUser: {
        name: customer.name!,
        phoneNumber: customer.phoneNumber!,
        avatar: customer.photoUrl
          ? customer.photoUrl!
          : "https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697",
        userId: customer.uid,
      },
      stage: "allotmentPending",
      jobOtp: this.generateOtpCode(),
      billing: {
        grandTotal: 0,
        tax: 0,
        discount: 0,
        subTotal: 0,
        totalJobTime: 2,
        totalJobAcceptanceCharge: 0,
      },
      id: this.generateJobId(),
      createdAt: Timestamp.fromDate(new Date()),
      timeSlot: {
        date: Timestamp.fromDate(new Date()),
        agentArrivalTime: Timestamp.fromDate(new Date()),
        time: {
          startTime: Timestamp.fromDate(new Date()),
          endTime: Timestamp.fromDate(new Date()),
        },
        id: "",
      },
      services: [],
    };

    this.selectedServices.push(selectedServices);

    //removing duplicates
    this.selectedServices[0].map((service: any) => {
      service.selectedItems = service.selectedItems.filter(
        (item1: any, index: any) => {
          return (
            index ===
            service.selectedItems.findIndex(
              (item2: any) => item1.id === item2.id
            )
          );
        }
      );
    });

    // console.log(this.selectedServices);
    data["services"] = [...this.selectedServices[0]];

    this.cart = data;
    const newData = this.calculateBilling(this.cart);
    this.cart$.next(this.cart);
    this.selectedServices = [];
    return newData;
  }

  async removeFromCart(service: any, cartItem: any) {
    let data: BookingUpdated = { ...this.cart };
    data.services.map((thisService: any) => {
      if (thisService.id === service.id) {
        thisService.selectedItems.map((item: any) => {
          if (item.id === cartItem.id)
            thisService.selectedItems.splice(item, 1);
        });
      }
    });
    if (data.services.length === 0) {
      this.cart = this.cartInitial;
      this.selectedServices = [];
    } else {
      this.selectedServices = [];
      this.cart = data;
      this.calculateBilling(this.cart);
      this.cart$.next(this.cart);
    }
  }

  async incrementQuantity(service: any, cartItem: any) {
    let data: any = { ...this.cart };
    data.services.map((thisService: any) => {
      if (thisService.id === service.id) {
        thisService.selectedItems.map((item: any) => {
          if (item.id === cartItem.id) item.quantity += 1;
        });
      }
    });
    this.cart = data;
    this.calculateBilling(this.cart);
    this.cart$.next(this.cart);
  }

  async decrementQuantity(service: any, cartItem: any) {
    let data: any = { ...this.cart };
    data.services.map((thisService: any) => {
      if (thisService.id === service.id) {
        thisService.selectedItems.map((item: any) => {
          if (item.id === cartItem.id && item.quantity > 0) item.quantity -= 1;
        });
        thisService.selectedItems.filter((item: any) => {
          return item.quantity > 0;
        });
      }
    });
    this.cart = data;
    this.calculateBilling(this.cart);
    this.cart$.next(this.cart);
  }

  async emptyCart() {
    this.selectedServices = [];
    this.cart = this.cartInitial;
    this.calculateBilling(this.cart);
    this.cart$.next(this.cart);
  }

  generateOtpCode() {
    // 6 digit number
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  }

  generateJobId() {
    // 16 chars alpha num
    let code = "";
    let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 16; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  getDiscounts() {
    return getDocs(collectionGroup(this.firestore, "coupons"));
  }

  getTaxes() {
    return getDocs(collectionGroup(this.firestore, "taxes"));
  }

  async calculateBilling(booking: any) {
    let totalTaxable: number = 0;
    let totalDiscountable: number = 0;
    let isUsesMaxDiscountAmount: boolean = false;
    let totalSubTotal: number = 0;

    await this.getDiscounts().then((discountRequest) => {
      this.discounts = discountRequest.docs.map((discount: any) => {
        return { ...discount.data(), id: discount.id };
      });
    });

    await this.getTaxes().then((taxRequest) => {
      this.taxes = taxRequest.docs.map((tax: any) => {
        return { ...tax.data(), id: tax.id };
      });
    });

    this.discounts.map((discount: any) => {
      if (
        discount.visibilityEnabled &&
        booking.billing.subTotal > discount.minimumRequiredAmount!
      ) {
        isUsesMaxDiscountAmount = false;
        if (discount.type === "percentage") {
          totalDiscountable = Math.max(
            totalDiscountable,
            (Number(discount.value) * booking.billing.subTotal) / 100
          );
        } else if (discount.type === "flat")
          totalDiscountable = Math.max(
            totalDiscountable,
            Number(discount.value)
          );
      }
      if (totalDiscountable > Number(discount.maximumDiscountAmount)!) {
        isUsesMaxDiscountAmount = true;
        totalDiscountable = Number(discount.maximumDiscountAmount)!;
      }
    });

    // if (isUsesMaxDiscountAmount) {
    //   console.log(isUsesMaxDiscountAmount);
    //   this.discounts.map((discount: Coupon) => {
    //     if (totalDiscountable < Number(discount.maximumDiscountAmount)!)
    //       totalDiscountable = Number(discount.maximumDiscountAmount)!;
    //   });
    // }

    this.taxes.map((tax: any) => {
      if (tax.active) {
        if (tax.type === "percentage")
          totalTaxable +=
            (tax.rate * (booking.billing.subTotal - totalDiscountable)) / 100;
        else if (tax.type === "flat") totalTaxable += tax.rate;
      }
    });

    for (const service of booking?.services) {
      service.selectedItems.forEach((variant: any) => {
        totalSubTotal += variant.quantity * variant.cost;
      });
    }

    booking.billing.tax = totalTaxable;
    booking.billing.discount = totalDiscountable;
    booking.billing.subTotal = totalSubTotal;

    booking.billing.grandTotal =
      booking.billing.subTotal + booking.billing.tax - booking.billing.discount;

    return booking;
  }
}
