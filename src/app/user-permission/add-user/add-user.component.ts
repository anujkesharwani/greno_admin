import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Dialog } from "@angular/cdk/dialog";
import { UserPermissionService } from "../service/user-permission.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  Storage,
} from "@angular/fire/storage";
import { Firestore } from "@angular/fire/firestore";
import { AreaWiseCatalogueService } from "src/app/area-wise-catalogue/area-wise-catalogue.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent {
  constructor(
    private dialog: Dialog,
    private UserPermissionService: UserPermissionService,
    private storage: Storage,
    private AreaWiseCatalogueService: AreaWiseCatalogueService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  userForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    name: new FormControl("", Validators.required),
    role: new FormControl("", Validators.required),
    active: new FormControl(true),
    userId: new FormControl(),
    img: new FormControl("assets/add-user/dummyProfile.jpg"),
    allowedAreas: new FormControl(),
    allowedCity: new FormControl(),
  });

  isArea: boolean = false;
  roles: any[] = [];
  isEmailExist: boolean = false;
  isImgSizeValid: boolean = false;
  areas: any[] = [];
  allowedAreas: any[] = [];
  allowedCity: any[] = [];

  area = [
    {
      city: "Prayagraj",
      district: [
        { id: 1, name: "Ashok Nagar" },
        { id: 2, name: "Ashok Nagar" },
        { id: 3, name: "Ashok Nagar" },
      ],
      expanded: false, // Add expanded property directly
    },
    {
      city: "Lucknow",
      district: [
        { id: 1, name: "Ashok Nagar" },
        { id: 2, name: "Ashok Nagar" },
        { id: 3, name: "Ashok Nagar" },
      ],
      expanded: false, // Add expanded property directly
    },
  ];

  ngOnInit() {
    this.getRole();
    if (this.data) {
      this.userForm.setValue({ ...this.data.userDetail, userId: this.data.id });
      this.allowedAreas = this.data.userDetail.allowedAreas;
      this.allowedCity = this.data.userDetail.allowedCity;
    }
    this.getAreas();
  }

  isReadonly(): boolean {
    if (this.data && this.data.userDetail && this.data.userDetail.email) {
      return true;
    } else {
      return false;
    }
  }

  isEmailValid() {
    this.UserPermissionService.getUsers().then((res) => {
      let emailExists = false;

      res.docs.forEach((user) => {
        const userData = user.data();

        if (this.userForm.value.email === userData?.["email"]) {
          emailExists = true;
        }
      });

      this.isEmailExist = emailExists;
    });
  }

  async getAreas() {
    await this.AreaWiseCatalogueService.getState().then((states) => {
      states.docs.map((state) => {
        this.AreaWiseCatalogueService.getCity(state.id).then((citys) => {
          citys.docs.map((city) => {
            let tempArea: any[] = [];
            this.AreaWiseCatalogueService.getArea(state.id, city.id).then(
              (areas) => {
                areas.docs.map((area) => {
                  tempArea.push({ ...area.data(), areaId: area.id });
                });
              }
            );
            this.areas.push({
              city: city.data(),
              cityId: city.id,
              area: tempArea,
              expanded: false,
            });
          });
        });
      });
    });
  }

  getRole() {
    this.roles = [];
    this.UserPermissionService.getRole().then((roles: any) => {
      roles.docs.map((role: any) => {
        this.roles.push({ name: role.data().roleName, id: role.id });
      });
    });
  }

  stopPropagation(event: any): void {
    event.stopPropagation();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
  toggleArea() {
    this.isArea = !this.isArea; // Toggle the value of isArea
  }

  toggleCity(cityIndex: number) {
    this.areas[cityIndex].expanded = !this.areas[cityIndex].expanded;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  async changePhoto(e: any) {
    const file = e.target.files[0];
    const fileSizeKB = file.size / 1024;
    const maxSizeKB = 500;

    if (fileSizeKB > maxSizeKB) {
      this.isImgSizeValid = true;
      return;
    } else {
      this.isImgSizeValid = false;
      const fileName = `${this.userForm.value.email}.${file.name
        .split(".")
        .pop()}`;
      const filePath = `userAvatar/${fileName}`;
      await uploadBytesResumable(ref(this.storage, filePath), file);
      const fileUrl = await getDownloadURL(ref(this.storage, filePath));
      this.userForm.patchValue({
        img: fileUrl,
      });
    }
  }

  removePhoto() {
    this.userForm.value.img = "assets/add-user/dummyProfile.jpg";
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.UserPermissionService.addUser({
        ...this.userForm.value,
        allowedAreas: this.allowedAreas,
        allowedCity: this.allowedCity,
      }).then(() => {
        // Reload the page
        window.location.reload();
      });
      this.closeDialog();
    }
  }

  onCityChange(event: Event, id: any): void {
    this.stopPropagation(event);
    let idNotFound = true;
    for (let i = 0; i < this.allowedCity.length; i++) {
      if (this.allowedCity[i].cityId == id) {
        this.allowedCity[i].active = !this.allowedCity[i].active;
        idNotFound = false;
      }
    }
    if (idNotFound) {
      this.allowedCity.push({
        cityId: id,
        active: true,
      });
    }
  }

  onCheckboxChange(event: Event, id: any, cityID: any): void {
    this.stopPropagation(event);
    let idNotFound = true;
    for (let i = 0; i < this.allowedAreas.length; i++) {
      if (this.allowedAreas[i].cityId == id) {
        this.allowedAreas[i].active = !this.allowedAreas[i].active;
        idNotFound = false;
      }
    }
    if (idNotFound) {
      this.allowedAreas.push({
        areaId: id,
        active: true,
        cityId: cityID,
      });
    }
  }
  isActive(id: any) {
    for (let i = 0; i < this.allowedAreas.length; i++) {
      if (this.allowedAreas[i].areaId == id) {
        return this.allowedAreas[i].active;
      }
    }
  }
  isCityActive(id: any) {
    for (let i = 0; i < this.allowedCity.length; i++) {
      if (this.allowedCity[i].cityId == id) {
        return this.allowedCity[i].active;
      }
    }
  }
}
