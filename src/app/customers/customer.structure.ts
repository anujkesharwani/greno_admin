import { Booking } from "../core/booking.structure";

export interface CustomerInfo {
	active: boolean;
	image: string;
	name: string;
	phone: string;
	email: string;
	chatId: string;
	userId: string;
	totalOrders: number;
	averageBills: number;
	totalBills: number;
	totalBillsAmount: number;
	totalBillsAmountToday: number;
	pendingBills: number;
	pendingAmount: number;
	registerDate: any;
	currentLocation: {
		longitude: number;
		latitude: number;
	}
	orders: Booking[];
	totalCompletedBooking: number;
	totalCompletedBookingToday: number;
	address: string;
	cityId:any[],
	accountNumber:any
}