import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AreaWiseCatalogueService } from "../../area-wise-catalogue.service";
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Dialog } from "@angular/cdk/dialog";
import { NotificationService } from "src/app/Shared/core/notification.service";
import Utils from "src/app/Shared/shared-services/util";

@Component({
  selector: "app-add-city",
  templateUrl: "./add-city.component.html",
  styleUrls: ["./add-city.component.scss"],
})
export class AddCityComponent implements OnInit {
  cityAddForm: FormGroup = this.formBuilder.group({
    state: ["", [Validators.required]],
    city: ["", [Validators.required]],
    active: [false],
  });
  states: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private dialog: Dialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private areaWiseCatalogueService: AreaWiseCatalogueService
  ) {
    this.data.data.map((state: any) => {
      if (state.active) {
        this.states[state.id] = state.state;
      }
    });
  }

  ngOnInit(): void {}

  addCity() {
    this.areaWiseCatalogueService
      .addCityInState(this.cityAddForm.value.state, {
        active: this.cityAddForm.value.active,
        name: this.cityAddForm.value.city,
      })
      .then((response: any) => {
        this.notificationService.presentSuccessToast("Area added successfully");
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
