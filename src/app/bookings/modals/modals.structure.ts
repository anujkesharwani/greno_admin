export type stageStructure = {
  name: string;
  title: string;
  colorClass?: string;
  color: string;
  allStagesTime: string;
  bookingTime: string;
  serviceDate: string;
  slotTime: string;
  jobStartTime: string;
  jobEndTime: string;
  agentName: string;
  agentContactNo: string;
  stageStatus: boolean;
  progress: number;
  button1: string;
  button2: string;
  button3: string;
};

export type timeLineStructure = {
  title: string;
  date: string;
  time: string;
  color: string;
  status: boolean;
  progress: number;
};

export type agentStruture = {
  id: string;
  name: string;
  contactNumber: string;
  status: string;
  color: string;
};

export type stageStructureUpdated = {
  id: string;
  name: string;
  title: string;
  isDelivery: boolean;
  colorClass?: string;
  color: string;
  allStagesTime: string;
  bookingTime: string;
  serviceDate: string;
  slotTime: string;
  progressDeliveryAt: string;
  deliveryOtpAt: string;
  jobStartTime: string;
  allotmentPickupAt: string;
  allotmentDeliveryAt: string;
  pickupTime: string;
  deliveryTime: string;
  pickupAcceptedAt: string;
  deliveryAcceptedAt: string;
  jobEndTime: string;
  agentName: string;
  agentContactNo: string;
  stageStatus: boolean;
  progress: number;
  button1: string;
  button2: string;
  button3: string;
  jobOTP: string;
  jobAcceptanceCharge: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  billing: billing;
  variants: any[];
  stage: string;
  cancelReason: string;
  cancelReasonText: string;
  payment: any;
  isRefunded: boolean;
  agentPhoto: string;
  userPhoto: string;
};

export type billing = {
  discount: string;
  grandTotal: string;
  tax: string;
  subTotal: string;
  fixedCharges: any[];
};

export type serviceVariant = {
  name: string;
  price: number;
  quantity: number;
  serviceId: string;
  variantId: string;
};
