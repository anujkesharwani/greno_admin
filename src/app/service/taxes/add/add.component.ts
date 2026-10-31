import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Tax } from "../taxes.structure";
import { TaxesService } from "../taxes.service";
import { NotificationService } from "src/app/Shared/core/notification.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent {
  mode: "edit" | "add" = "add";
  serviceCatalogueId: string;
  taxForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    rate: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    active: new FormControl(false),
  });

  constructor(
    @Inject(DIALOG_DATA)
    private dialogData: {
      mode: "add" | "edit";
      serviceCatalogueId: string;
      tax: Tax;
    },
    private taxService: TaxesService,
    private dialogRef: DialogRef,
    private alertify: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.dialogData.mode == "edit" && this.dialogData.tax) {
      this.taxForm.patchValue(this.dialogData.tax);
    }
    this.serviceCatalogueId = this.dialogData.serviceCatalogueId;
  }

  close() {
    this.dialogRef.close();
  }

  handleSubmit() {
    if (this.dialogData.mode == "add") {
      this.addTax();
    } else {
      this.updateTax();
    }
  }

  addTax() {
    this.taxService
      .addTax({
        ...this.taxForm.value,
        serviceCatalogueID: this.serviceCatalogueId,
      })
      .then(() => {
        this.taxForm.reset();
        this.dialogRef.close();
      })
      .catch((err) => {
        this.alertify.presentToast(err.message);
      });
  }

  updateTax() {
    if (this.dialogData.tax.id) {
      this.taxService
        .updateTax(this.dialogData.tax.id, this.taxForm.value)
        .then(() => {
          this.taxForm.reset();
          this.dialogRef.close();
        })
        .catch((err) => {
          this.alertify.presentToast(err.message);
        });
    }
  }
}
