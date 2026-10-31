import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { BookingService } from "src/app/core/booking.service";
import { NotificationService } from "src/app/Shared/core/notification.service";
import { StorageService } from "src/app/Shared/core/storage/storage.service";
import Utils from "src/app/Shared/shared-services/util";

@Component({
  selector: "app-add-items",
  templateUrl: "./add-items.component.html",
  styleUrls: ["./add-items.component.scss"],
})
export class AddItemsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddItemsComponent>,
    private bookingService: BookingService,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) {}
  filteredItems: any[] = [];
  currentService: any;
  subTotal: number = 0;

  ngOnInit() {
    this.filteredItems = this.data.services[0].selectedItems;
    this.currentService = this.data.services[0];
    this.filteredItems.map((item) => {
      this.subTotal += item.cost * item.quantity;
    });
  }

  async searchClothes(e: any) {
    const searchValue = e.target.value;
    console.log(searchValue);
    console.log(this.currentService);
    if (searchValue && searchValue.trim() !== "") {
      this.filteredItems = this.currentService.clothes.filter((item: any) =>
        item.name?.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else this.filteredItems = this.currentService.selectedItems;
  }

  async setCurrService(service: any) {
    await this.data.services.map((service: any) => {
      if (service.id === this.currentService.id)
        service.selectedItems = this.filteredItems;
    });
    this.filteredItems = service?.selectedItems;
    this.currentService = service;
  }

  removeByAttr(arr: any[], attr: string | number, value: any) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  increaseQuant(item: any) {
    item.quantity = item["quantity"]! + 1;
    this.subTotal += item.cost;
    this.filteredItems.map((preItem) => {
      if (preItem?.name === item.name)
        this.removeByAttr(this.filteredItems, "name", item.name);
      this.removeByAttr(this.currentService.selectedItems!, "name", item.name);
    });
    this.filteredItems.push(item);
    this.currentService.selectedItems?.push(item);
  }

  decreaseQuant(item: any) {
    if (item.quantity === 0) return;
    item.quantity = item["quantity"]! - 1;
    this.subTotal -= item.cost;
    this.filteredItems.map((preItem) => {
      if (preItem?.name === item.name)
        this.removeByAttr(this.filteredItems, "name", item.name);
      this.removeByAttr(this.currentService.selectedItems!, "name", item.name);
    });
    this.filteredItems.push(item);
    this.currentService.selectedItems?.push(item);
  }

  async bookNow() {
    await this.bookingService
      .saveItems(
        this.data.currentUser.userId,
        this.data.id,
        this.data,
        this.subTotal
      )
      .then(() => {
        this.bookingService.updateBooking(
          this.data.currentUser.userId,
          this.data.id,
          Utils.stageMaster.inProgress.key,
          this.data.isDelivery
        );
        this.dialogRef.close({ res: true });
        this.notificationService.presentSuccessToast(
          "Items Updated Succesfully"
        );
      });
  }
}
