import moment from "moment";

export default class Utils {
  static stageMaster: any = {
    availableAgents: {
      text: "Available Agents",
      gradient: "",
      color: "",
      textColor: "",
      key: "",
    },
    allotmentPending: {
      text: "Allotment Pending",
      gradient: "sky-blue-gradient",
      color: "sky-blue-background",
      textColor: "sky-blue-color",
      key: "allotmentPending",
    },
    acceptancePending: {
      text: "Acceptance Pending",
      gradient: "blue-gradient",
      color: "blue-background",
      textColor: "blue-color",
      key: "acceptancePending",
    },
    jobAccepted: {
      text: "Job Accepted",
      gradient: "light-blue-gradient",
      color: "light-blue-background",
      textColor: "light-blue-color",
      key: "jobAccepted",
    },
    jobStarted: {
      text: "Job Started",
      gradient: "light-blue-gradient",
      color: "light-blue-background",
      textColor: "light-blue-color",
      key: "jobStarted",
    },
    otpVerificationPending: {
      text: "OTP Verification Pending",
      gradient: "light-blue-gradient",
      color: "light-blue-background",
      textColor: "light-blue-color",
      key: "otpVerificationPending",
    },
    workStarted: {
      text: "In Progress",
      gradient: "yellow-gradient",
      color: "yellow-background",
      textColor: "yellow-color",
      key: "workStarted",
    },
    inProgress: {
      text: "In Progress",
      gradient: "yellow-gradient",
      color: "yellow-background",
      textColor: "yellow-color",
      key: "inProgress",
    },
    washInProgress: {
      text: "Wash In Progress",
      gradient: "yellow-gradient",
      color: "yellow-background",
      textColor: "yellow-color",
      key: "washInProgress",
    },
    workCompleted: {
      text: "Work Completed",
      gradient: "yellow-gradient",
      color: "yellow-background",
      textColor: "yellow-color",
      key: "workCompleted",
    },
    paymentPending: {
      text: "Payment Pending",
      gradient: "yellow-gradient",
      color: "yellow-background",
      textColor: "yellow-color",
      key: "paymentPending",
    },
    paymentCompleted: {
      text: "Payment Completed",
      gradient: "yellow-gradient",
      color: "yellow-background",
      textColor: "yellow-color",
      key: "paymentCompleted",
    },
    completed: {
      text: "Completed",
      gradient: "green-gradient",
      color: "green-background",
      textColor: "green-color",
      key: "completed",
    },
    expired: {
      text: "Expired",
      gradient: "grey-gradient",
      color: "grey-background",
      textColor: "grey-color",
      key: "expired",
    },
    discarded: {
      text: "Discarded",
      gradient: "red-gradient",
      color: "red-background",
      textColor: "red-color",
      key: "discarded",
    },
  };

  static timelineStagesPickup = [
    {
      title: "Allotment",
      date: "12 Oct",
      time: "9:00 am",
      color: "#06a3b8",
      status: false,
      progress: 2,
      show: true,
      key: "allotmentPending",
      dateKey: "allotmentPickupAt",
    },
    {
      title: "Acceptance",
      date: "12 Oct",
      time: "1:00 pm",
      color: "#094A28",
      status: false,
      progress: 23,
      show: true,
      key: "acceptancePending",
      dateKey: "pickupAcceptedAt",
    },
    {
      title: "Accepted",
      date: "12 Oct",
      time: "1:00 pm",
      color: "#094A28",
      status: false,
      progress: 0,
      show: false,
      key: "jobAccepted",
      dateKey: "acceptedAt",
    },
    {
      title: "Started",
      date: "12 Oct",
      time: "1:00 pm",
      color: "#094A28",
      status: false,
      progress: 0,
      show: false,
      key: "jobStarted",
      dateKey: "startedAt",
    },
    {
      title: "OTP Verification",
      date: "15 Oct",
      time: "10:55 am",
      color: "#007eda",
      status: false,
      progress: 24.5,
      show: true,
      key: "otpVerificationPending",
      dateKey: "otpAt",
    },
    {
      title: "In Progress",
      date: "15 Oct",
      time: "11:00 am",
      color: "#d7c206",
      status: false,
      progress: 16,
      show: true,
      key: "inProgress",
      dateKey: "progressAt",
    },
    {
      title: "Payment Pending",
      date: "15 Oct",
      time: "11:00 am",
      color: "#d7c206",
      status: false,
      progress: 16,
      show: false,
      key: "paymentPending",
      dateKey: "paymentPendingAt",
    },
    {
      title: "Payment Completed",
      date: "15 Oct",
      time: "11:00 am",
      color: "#d7c206",
      status: false,
      progress: 16,
      show: false,
      key: "paymentCompleted",
      dateKey: "paymentCompletedAt",
    },
    {
      title: "Completed",
      date: "15 Oct",
      time: "12:30 pm",
      color: "#07bf72",
      status: false,
      show: true,
      progress: 21.9,
      key: "washInProgress",
      dateKey: "pickupTime",
    },
  ];

  static timelineStagesDelivery = [
    {
      title: "Allotment",
      date: "12 Oct",
      time: "9:00 am",
      color: "#06a3b8",
      status: false,
      progress: 2,
      show: true,
      key: "allotmentPending",
      dateKey: "allotmentDeliveryAt",
    },
    {
      title: "Acceptance",
      date: "12 Oct",
      time: "1:00 pm",
      color: "#094A28",
      status: false,
      progress: 23,
      show: true,
      key: "acceptancePending",
      dateKey: "deliveryAcceptedAt",
    },
    {
      title: "Accepted",
      date: "12 Oct",
      time: "1:00 pm",
      color: "#094A28",
      status: false,
      progress: 0,
      show: false,
      key: "jobAccepted",
      dateKey: "acceptedAt",
    },
    {
      title: "Started",
      date: "12 Oct",
      time: "1:00 pm",
      color: "#094A28",
      status: false,
      progress: 0,
      show: false,
      key: "jobStarted",
      dateKey: "startedAt",
    },
    {
      title: "OTP Verification",
      date: "15 Oct",
      time: "10:55 am",
      color: "#007eda",
      status: false,
      progress: 24.5,
      show: true,
      key: "otpVerificationPending",
      dateKey: "deliveryOtpAt",
    },
    {
      title: "In Progress",
      date: "15 Oct",
      time: "11:00 am",
      color: "#d7c206",
      status: false,
      progress: 16,
      show: true,
      key: "inProgress",
      dateKey: "progressDeliveryAt",
    },
    {
      title: "Payment Pending",
      date: "15 Oct",
      time: "11:00 am",
      color: "#d7c206",
      status: false,
      progress: 16,
      show: false,
      key: "paymentPending",
      dateKey: "paymentPendingAt",
    },
    {
      title: "Payment Completed",
      date: "15 Oct",
      time: "11:00 am",
      color: "#d7c206",
      status: false,
      progress: 16,
      show: false,
      key: "paymentCompleted",
      dateKey: "paymentCompletedAt",
    },
    {
      title: "Completed",
      date: "15 Oct",
      time: "12:30 pm",
      color: "#07bf72",
      status: false,
      show: true,
      progress: 21.9,
      key: "completed",
      dateKey: "deliveryTime",
    },
  ];

  static formatDate(date: number, format: string) {
    return moment(new Date(date * 1000)).format(format);
  }

  static createDataForAddAreas(searchedAreaDetails: any) {
    searchedAreaDetails.address_components.map((addressComponent: any) => {
      const geoProofingLocality = addressComponent.types.find(
        (type: any) => type.indexOf("sublocality") > -1
      );
      if (geoProofingLocality) {
        searchedAreaDetails["geoProofingLocality"] = addressComponent.long_name;
      }

      searchedAreaDetails["latitude"] =
        searchedAreaDetails["geometry"].location.lat;
      searchedAreaDetails["longitude"] =
        searchedAreaDetails["geometry"].location.lng;
      const cityName = addressComponent.types.find(
        (type: any) => type.indexOf("administrative_area_level_2") > -1
      );
      if (cityName) {
        searchedAreaDetails["cityName"] = addressComponent.long_name;
      }

      const cityKey = addressComponent.types.find(
        (type: any) => type.indexOf("administrative_area_level_2") > -1
      );
      if (cityKey) {
        searchedAreaDetails["cityKey"] = addressComponent.short_name;
      }

      const stateName = addressComponent.types.find(
        (type: any) => type.indexOf("administrative_area_level_1") > -1
      );
      if (stateName) {
        searchedAreaDetails["stateName"] = addressComponent.long_name;
      }

      const stateCode = addressComponent.types.find(
        (type: any) => type.indexOf("administrative_area_level_1") > -1
      );
      if (stateCode) {
        searchedAreaDetails["stateCode"] = addressComponent.short_name;
      }

      const countryId = addressComponent.types.find(
        (type: any) => type.indexOf("country") > -1
      );
      if (countryId) {
        searchedAreaDetails["countryId"] = addressComponent.short_name;
      }

      const postalCode = addressComponent.types.find(
        (type: any) => type.indexOf("postal_code") > -1
      );
      if (postalCode) {
        searchedAreaDetails["postalCode"] = addressComponent.long_name;
      }

      const locality = addressComponent.types.find(
        (type: any) => type.indexOf("locality") > -1
      );
      if (locality) {
        searchedAreaDetails["locality"] = addressComponent.long_name;
      }
    });
    return searchedAreaDetails;
  }
}
