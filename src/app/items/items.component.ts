import { Component } from "@angular/core";
import { ItemService } from "./item.service";

import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ServiceComponent } from "../service/service.component";
import { ConfirmationDialogComponent } from "../Shared/dialog/dialog.component";
import Utils from "../Shared/shared-services/util";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "../Shared/core/notification.service";
import { AreaWiseCatalogueService } from "../area-wise-catalogue/area-wise-catalogue.service";
import { AddCityComponent } from "../area-wise-catalogue/modal/add-city/add-city.component";
import { AddItemComponent } from "./add-item/add-item.component";
import { Subscription } from "rxjs/internal/Subscription";
import { extendedAreas } from "../area-wise-catalogue/area-wise-catalogue.structure";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"],
})
export class ItemsComponent {
  serviceCatalogues: any = [];
  utils = Utils;

  roles: any[] = [];
  roleId: any;

  constructor(
    private itemService: ItemService,
    private dialog: MatDialog,
    private http: HttpClient,
    private notification: NotificationService,
    private areaService: AreaWiseCatalogueService,
    private areaWiseCatalogueService: AreaWiseCatalogueService
  ) {
    // this.getCatalogues();
  }

  ngOnInit() {
    this.getRole();
  }

  get activeCount() {
    return this.serviceCatalogues.filter((slot: any) => slot.active).length;
  }

  get useCount() {
    return 0;
  }

  openAddItemModal() {
    this.dialog
      .open(AddItemComponent, {
        height: "45vh",
        width: "40vw",
        maxWidth: "95vw",
      })
      .afterClosed()
      .subscribe(() => {
        this.getRole();
      });
  }

  // getRole() {
  //   this.roles = [];
  //   this.itemService.getRole().then((roles: any) => {
  //     roles.docs.map((role: any) => {
  //       this.roles.push({ ...role.data(), id: role.id });
  //     });
  //   });
  //   console.log(this.roles);
  // }

  getRole() {
    
    this.itemService.getRole().then((snapshot: any) => {
      
      this.roles = [];
      snapshot.docs.forEach((doc:any) => {
        this.roles.push({...doc.data(), id:doc.id})
      })
    });
    
  }


  async deletePermission(itemName: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: "Are you sure?" },
    });
    (dialogRef as MatDialogRef<ConfirmationDialogComponent>)
      .afterClosed()
      .subscribe(async (result: any) => {
        if (result) {
          await this.itemService.deleteRole(itemName).then(() => {
            this.getRole();
          });
        } else {
        }
      });
  }

  editRole(role: any) {
    this.dialog
      .open(AddItemComponent, {
        data: { ...role },
        width: "40vw",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.getRole();
        } else {
          this.getRole();
        }
      });
  }
}