import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { AddItemService } from "./add-item.service";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  Storage,
} from "@angular/fire/storage";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"],
})
export class AddItemComponent {
  employeeForm: FormGroup = new FormGroup({
    itemName: new FormControl("", [Validators.required]),
    img: new FormControl("assets/add-user/dummyProfile.jpg"),
    id: new FormControl(),
  });

  constructor(
    private dialog: MatDialog,
    private addItemService: AddItemService,
    private storage: Storage,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  roles: any[] = [];
  isImgSizeValid: boolean = false;

  ngOnInit() {
    this.getRole();
    if (this.data) {
      this.employeeForm.setValue(this.data);
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  async addItem() {
    if (!this.employeeForm.valid) {
      return;
    }

    this.addItemService.addItem(this.employeeForm.value);
    this.employeeForm.reset();
    this.closeDialog();
  }

  getRole() {
    this.roles = [];
    this.addItemService.getRole().then((roles: any) => {
      roles.docs.map((role: any) => {
        this.roles.push({ roleDetail: role.data(), id: role.id });
      });
    });
  }

  // Photo changing TS file
  async changePhoto(e: any) {
    const file = e.target.files[0];
    const fileSizeKB = file.size / 1024;
    const maxSizeKB = 500;

    if (fileSizeKB > maxSizeKB) {
      this.isImgSizeValid = true;
      return;
    } else {
      this.isImgSizeValid = false;
      const fileName = `${this.employeeForm.value.itemName}.${file.name
        .split(".")
        .pop()}`;
      const filePath = `userAvatar/${fileName}`;
      await uploadBytesResumable(ref(this.storage, filePath), file);
      const fileUrl = await getDownloadURL(ref(this.storage, filePath));
      this.employeeForm.patchValue({
        img: fileUrl,
      });
    }
  }

  removePhoto() {
    this.employeeForm.value.img = "assets/add-user/dummyProfile.jpg";
  }
}