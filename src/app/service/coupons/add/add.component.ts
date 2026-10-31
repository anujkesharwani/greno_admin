import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NotificationService } from "src/app/Shared/core/notification.service";
import { Coupon } from "../coupons.structure";
import { CouponsService } from "../coupons.service";
import { Observable } from "rxjs";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent {
  mode: "edit" | "add" = "add";
  serviceCatalogueId: string;
  availableTimes: {
    value: number;
    time: string;
  }[] = [];
  couponForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    code: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    value: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    minimumRequiredAmount: new FormControl(""),
    maximumDiscountAmount: new FormControl(""),
    maxUsesPerUserDaily: new FormControl(""),
    maxUsesPerUserWeekly: new FormControl(""),
    visibilityEnabled: new FormControl(""),
  });
  selectedMonths: string[] = [];
  days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  allMonths: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  visibilityDateRangeForm: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  filteredMonths: Observable<string[]> | undefined;
  visibilitySettings: any = {
    mode: "monthly",
    repeating: false,
    dateRange: {},
    selectedMonths: this.selectedMonths,
    visibilityDateRangeForm: this.visibilityDateRangeForm,
    selectedWeeks: {
      week1: true,
      week2: true,
      week3: true,
      week4: true,
      week5: true,
      week6: true,
    },
    activatedWeeks: () => {
      return Object.keys(this.visibilitySettings.selectedWeeks).filter(
        (key) => this.visibilitySettings.selectedWeeks[key]
      ).length;
    },
    daysSelected: {
      allSunday: false,
      allMonday: false,
      allTuesday: false,
      allWednesday: false,
      allThursday: false,
      allFriday: false,
      allSaturday: false,
    },
    daysSetting: [],
    timeSlotSelected: {
      breakfast: {
        selected: false,
        timeStart: 6,
        timeEnd: 13,
      },
      lunch: {
        selected: false,
        timeStart: 13,
        timeEnd: 18,
      },
      dinner: {
        selected: false,
        timeStart: 18,
        timeEnd: 1,
      },
      night: {
        selected: false,
        timeStart: 1,
        timeEnd: 6,
      },
      custom: {
        selected: false,
        timeStart: 0,
        timeEnd: 0,
      },
    },
  };

  constructor(
    @Inject(DIALOG_DATA)
    private dialogData: {
      mode: "add" | "edit";
      serviceCatalogueId: string;
      coupon: Coupon;
    },
    private couponService: CouponsService,
    private dialogRef: MatDialogRef<AddComponent>,
    private alertify: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.dialogData?.mode == "edit" && this.dialogData?.coupon) {
      this.couponForm.patchValue(this.dialogData.coupon);
      this.visibilitySettings = this.dialogData.coupon.visibilitySettings;
    }
    this.mode = this.dialogData?.mode;
    this.serviceCatalogueId = this.dialogData.serviceCatalogueId;
  }

  close() {
    this.dialogRef.close();
  }

  handleSubmit() {
    if (this.dialogData?.mode == "edit") {
      this.updateCoupon();
    } else {
      this.addCoupon();
    }
  }

  addCoupon() {
    if (this.couponForm.valid) {
      let visibilitySettings = {
        ...this.visibilitySettings,
        visibilityDateRangeForm:
          this.visibilitySettings.visibilityDateRangeForm.value,
      };
      delete visibilitySettings["activatedWeeks"];
      this.couponService
        .addCoupon({
          ...this.couponForm.value,
          serviceCatalogueID: this.serviceCatalogueId,
          visibilitySettings,
        })
        .then(() => {
          this.couponForm.reset();
        })
        .catch((err) => {
          this.alertify.presentToast(err.message);
        });
    } else {
      this.alertify.presentToast("Please fill all the required fields");
    }
    this.dialogRef.close("add");
  }

  updateCoupon() {
    const visibilityDateRangeForm = {
      startDate: null,
      endDate: null,
    };

    if (this.dialogData.coupon.id) {
      let visibilitySettings = {
        ...this.visibilitySettings,
        visibilityDateRangeForm,
      };
      this.couponService
        .updateCoupon(this.dialogData.coupon.id, {
          ...this.couponForm.value,
          visibilitySettings,
        })
        .then(() => {
          this.couponForm.reset();
        })
        .catch((err) => {
          this.alertify.presentToast(err.message);
        });
      this.dialogRef.close("edit");
    }
  }

  generateMonthsData() {
    let monthWiseDays: any[] = [];

    this.selectedMonths.forEach((month) => {
      // generate a full calendar for each month
      // every day must have three var day, possible, selected
      let monthDays: any[] = [];
      // example format
      // let singleMonth =  {
      //   weekOne: [
      //     {
      //       day:'Sunday',
      //       possible:false,
      //     },
      //     {
      //       day:'Monday',
      //       possible:false,
      //     },
      //     {
      //       day:'Tuesday',
      //       possible:true,
      //     },
      //     {
      //       day:'Wednesday',
      //       possible:true,
      //     },
      //     {
      //       day:'Thursday',
      //       possible:true,
      //     },
      //     {
      //       day:'Friday',
      //       possible:true,
      //     },
      //     {
      //       day:'Saturday',
      //       possible:true,
      //     },
      //   ]
      // };

      let date = new Date();
      date.setMonth(this.allMonths.indexOf(month));
      date.setDate(1);
      let day = date.getDay();
      let days: { day: string; possible: boolean; selected: boolean }[] = [];
      for (let i = 0; i < day; i++) {
        days.push({
          day: this.days[i],
          possible: false,
          selected: false,
        });
      }
      let monthLength = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();
      for (let i = 1; i <= monthLength; i++) {
        let day = new Date(
          date.getFullYear(),
          date.getMonth(),
          i
        ).toLocaleDateString("en-US", { weekday: "long" });
        days.push({
          day: day,
          possible: true,
          selected: false,
        });
      }
      // split days into weeks
      let weeks: any[] = [];
      let week: any[] = [];
      let weekCounter = 0;
      days.forEach((day, index) => {
        week.push(day);
        if (index % 7 == 6) {
          if (
            this.visibilitySettings.selectedWeeks["week" + (weekCounter + 1)]
          ) {
            weeks.push({
              week: week,
              selectAllDays: (select: boolean) => {
                week.forEach((day) => {
                  day.selected = select;
                });
              },
              weekName:
                weekCounter == 0
                  ? "1st week"
                  : weekCounter == 1
                  ? "2nd week"
                  : weekCounter == 2
                  ? "3rd week"
                  : weekCounter == 3
                  ? "4th week"
                  : weekCounter == 4
                  ? "5th week"
                  : "6th week",
            });
          }
          week = [];
          weekCounter++;
        } else if (index == days.length - 1) {
          // fill remaining days
          let counter = 7 - week.length;
          let initialWeekLength = week.length;

          for (let j = 0; j < counter; j++) {
            week.push({
              day: this.days[j + initialWeekLength],
              possible: false,
              selected: false,
            });
          }
          // check if the week is enabled
          if (
            this.visibilitySettings.selectedWeeks["week" + (weekCounter + 1)]
          ) {
            weeks.push({
              week: week,
              weekName:
                weekCounter == 0
                  ? "1st week"
                  : weekCounter == 1
                  ? "2nd week"
                  : weekCounter == 2
                  ? "3rd week"
                  : weekCounter == 3
                  ? "4th week"
                  : weekCounter == 4
                  ? "5th week"
                  : "6th week",
              selectAllDays: (select: boolean) => {
                week.forEach((day) => {
                  day.selected = select;
                });
              },
            });
          }
          weekCounter++;
        }
      });
      let weekLength = weeks.length;
      if (weekLength < 6) {
        for (let index = 0; index < 6 - weekLength; index++) {
          let week: any = [];
          for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            week.push({
              day: this.days[dayIndex],
              possible: false,
              selected: false,
            });
          }
          weeks.push({
            week: week,
            weekName:
              weekCounter == 0
                ? "1st week"
                : weekCounter == 1
                ? "2nd week"
                : weekCounter == 2
                ? "3rd week"
                : weekCounter == 3
                ? "4th week"
                : weekCounter == 4
                ? "5th week"
                : "6th week",
            selectAllDays: (select: boolean) => {
              week.forEach((day: any) => {
                day.selected = select;
              });
            },
          });
        }
      }
      monthDays = weeks;
      monthWiseDays.push({
        month: month,
        days: monthDays,
      });
    });
    this.visibilitySettings.daysSetting = monthWiseDays;
  }

  selectAllWeekDays(week: any[], select: boolean) {
    week.forEach((day) => {
      day.selected = select;
    });
  }

  checkAllWeekDays(dayNumber: number, value: boolean) {
    this.visibilitySettings.daysSetting.forEach((month: any) => {
      month.days.forEach((week: any) => {
        week.week[dayNumber].selected = value;
      });
    });
  }

  checkAllTimeSlots(value: boolean) {
    Object.keys(this.visibilitySettings.timeSlotSelected).forEach((key) => {
      this.visibilitySettings.timeSlotSelected[key].selected = value;
    });
  }

  get allTimeSlotsSelected() {
    return Object.keys(this.visibilitySettings.timeSlotSelected).every(
      (key) => this.visibilitySettings.timeSlotSelected[key].selected
    );
  }
}
