import { Component, Inject, OnInit } from "@angular/core";
import { RecaptchaVerifier } from "@angular/fire/auth";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import moment from "moment";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import { NotificationService } from "src/app/Shared/core/notification.service";
import { LoaderService } from "src/app/Shared/shared-services/loader.service";
import Utils from "src/app/Shared/shared-services/util";
import { AreaWiseCatalogueService } from "src/app/area-wise-catalogue/area-wise-catalogue.service";
import { BookingService } from "src/app/core/booking.service";
import { CustomerAuthService } from "src/app/core/customer-auth.service";

@Component({
  selector: "app-create-customer",
  templateUrl: "./create-customer.component.html",
  styleUrls: ["./create-customer.component.scss"],
})
export class CreateCustomerComponent implements OnInit {
  areaSearchList$!: Observable<any>;
  private areaSearchText$ = new Subject<string>();
  areaOptions: any[] = [];
  searchedAreaDetails: any;

  stateList: any[] = [];
  cityList: any[] = [];
  areaList: any[] = [];
  showOTP: boolean = false;
  showDetails: boolean = false;
  isValidMobile: boolean = false;

  gender = new FormControl("");
  imgSrc: any =
    "https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697";

  genderOptions: string[] = ["Male", "Female", "Other"];
  phoneNumber: string = "";
  verifier: RecaptchaVerifier | undefined;
  customerForm = this.fb.group({
    phone: ["", Validators.required],
    otp: ["", Validators.required],
    name: ["", Validators.required],
    gender: ["", Validators.required],
    dateOfBirth: ["", Validators.required],
    address1: ["", Validators.required],
    area: ["", Validators.required],
    cityId: ["", Validators.required],
    stateId: ["", Validators.required],
    pincode: ["", [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  customerData: any;
  constructor(
    public dialogRef: MatDialogRef<CreateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerAuthService: CustomerAuthService,
    private fb: FormBuilder,
    public _bookingService: BookingService,
    private notificationService: NotificationService,
    private areaWiseCatalogueService: AreaWiseCatalogueService,
    public _loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    if (this.data.src) this.imgSrc = this.data.src;

    this.areaSearchList$ = this.areaSearchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((areaInputValue) =>
        this.areaWiseCatalogueService.getAreaOnSearch(areaInputValue)
      )
    );

    this.areaSearchList$.subscribe((response) => {
      this.areaOptions = response.results;
    });

    this.getStateList();
  }

  isOTP(e: any) {
    if (e.target.value != "") this.showDetails = true;
    else this.showDetails = false;
  }

  imgUpload(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgSrc = reader.result;
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAreaDropdownSelect(event: any) {
    const placeId = event.option.value.split("|")[1];
    this.areaWiseCatalogueService
      .getAreaDetailByPlaceId(placeId)
      .subscribe((response: any) => {
        this.searchedAreaDetails = response.result;
        this.searchedAreaDetails = Utils.createDataForAddAreas(
          this.searchedAreaDetails
        );
      });
  }

  getAreaOnSearch(areaSearchInput: any) {
    areaSearchInput && this.areaSearchText$.next(areaSearchInput.target.value);
  }

  getStateList() {
    this.areaWiseCatalogueService.getState().then((data) => {
      this.stateList = data.docs.map((state: any) => {
        return { ...state.data(), id: state.id };
      });
    });
    this.customerForm.patchValue({
      cityId: null,
      area: null,
    });
  }

  getCityList(stateId: any) {
    this.areaWiseCatalogueService.getCity(stateId).then((data) => {
      this.cityList = data.docs.map((city: any) => {
        return { ...city.data(), id: city.id };
      });
    });
    this.customerForm.patchValue({
      area: null,
    });
  }

  getAreaList(cityId: any) {
    const stateId = this.customerForm.value.stateId?.toString();
    if (!stateId) {
      return;
    }
    this.areaWiseCatalogueService.getArea(stateId, cityId).then((data) => {
      this.areaList = data.docs.map((area: any) => {
        return { ...area.data(), id: area.id };
      });
    });
  }

  async sendOtp() {
    this._loaderService.showLoader();
    const phoneNumber = this.customerForm.get("phone")?.value ?? "";
    if (!this.verifier)
      this.verifier = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        this.customerAuthService.auth
      );
    this.customerAuthService
      .loginWithPhoneNumber(phoneNumber, this.verifier)
      .then((login) => {
        this.customerAuthService.loginConfirmationResult = login;
        this.showOTP = true;
        this._loaderService.hideLoader();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }

  submitOtp() {
    if (this.customerAuthService.loginConfirmationResult) {
      this._loaderService.showLoader();
      const otp = this.customerForm.get("otp")?.value ?? "";
      this.customerAuthService.loginConfirmationResult
        .confirm(otp)
        .then((result) => {
          this.customerData = result.user;
          //this.customerAuthService.setUserData(result.user);
          this.showDetails = true;
          this.showOTP = false;
          this.isValidMobile = true;
          this._loaderService.hideLoader();
          this.customerForm.controls["phone"].disable();
        })
        .catch((error) => {})
        .finally(() => {});
    }
  }

  saveCustomer() {
    this._loaderService.showLoader();
    const selectedArea = this.areaList.filter(
      (item) => item.id === this.customerForm.value.area
    )[0];
    const addressObject = {
      ...selectedArea,
      selectedArea: selectedArea,
      cityId: this.customerForm.get("cityId")?.value,
      stateId: this.customerForm.get("stateId")?.value,
      isDefault: false,
      addressLine1: this.customerForm.get("address1")?.value,
      pinCode: this.customerForm.get("pincode")?.value,
    };

    

    const userObject = {
      uid: this.customerData.uid,
      displayName: this.customerForm.get("name")?.value,
      phoneNumber: "+91" + this.customerForm.get("phone")?.value,
      gender: this.customerForm.get("gender")?.value,
      dateofbirth: moment(this.customerForm.get("dateOfBirth")?.value).format(
        "X"
      ),
      photoUrl: this.imgSrc,
      addresses: addressObject,
    };
    this.customerAuthService.setUserData(userObject).then((response) => {
      this._loaderService.hideLoader();
      this._bookingService.userAdded.next(true);
      this.notificationService.presentSuccessToast(
        "Customer added Successfully"
      );
      this.onNoClick();
    });
  }
}
