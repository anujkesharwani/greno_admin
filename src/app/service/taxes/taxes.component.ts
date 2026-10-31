import { Dialog } from "@angular/cdk/dialog";
import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom, tap } from "rxjs";
import { NotificationService } from "src/app/Shared/core/notification.service";
import { ConfirmationDialogService } from "src/app/Shared/shared-services/modal-service.service";
import { AddComponent } from "./add/add.component";
import { EditTaxComponent } from "./edit/edit-tax/edit-tax.component";
import { TaxesService } from "./taxes.service";
import { Tax } from "./taxes.structure";

@Component({
  selector: "app-taxes",
  templateUrl: "./taxes.component.html",
  styleUrls: ["./taxes.component.scss"],
})
export class TaxesComponent {
  @Input() serviceCatalogueId: string;
  taxes: Tax[] = [];
  searchTax: string = "";
  filteredTax: Tax[] = [];
  activeTax: any;
  constructor(
    private taxService: TaxesService,
    private dialog: Dialog,
    private dialogService: ConfirmationDialogService,
    private notify: NotificationService,
    private mDialog: MatDialog
  ) {}

  ngOnInit() {
    this.getTaxes();
  }

  async getTaxes() {
    this.taxes = (await this.taxService.getTaxes()).docs.map((tax: any) => {
      if (tax.active == true) {
        this.activeTax = tax.id;
      }
      return { ...tax.data(), id: tax.id } as Tax;
    });
    this.filteredTax = this.taxes;
  }

  async addTax() {
    await firstValueFrom(
      this.dialog.open(AddComponent, {
        data: { mode: "add", serviceCatalogueId: this.serviceCatalogueId },
      }).closed
    );
    this.getTaxes();
  }

  deleteTax(tax: Tax) {
    const message = `Are you sure? you want to delete the tax ${tax.name}?`;
    const dialogRef = this.dialogService.openConfirmationDialog(message);
    dialogRef
      .afterClosed()
      .pipe(
        tap((result) => {
          if (result) {
            try {
              this.taxService.deleteTax(tax.id).then(() => {
                this.getTaxes();
                this.notify.presentSuccessToast(
                  "Taxes deleted successfully",
                  4000
                );
              });
            } catch (error) {
              console.error("delete API call failed:", error);
            }
          } else {
          }
        })
      )
      .subscribe();
  }

  openEditDialog(item: Tax) {
    const dialogRef = this.mDialog.open(EditTaxComponent, { data: { item } });
    dialogRef
      .afterClosed()
      .pipe(
        tap((result) => {
          if (result === "save") {
            try {
              this.getTaxes();
              this.notify.presentSuccessToast(
                "Taxes updated successfully",
                4000
              );
            } catch (error) {
              this.notify.presentErrorToast(
                "Offo !! something went wrong",
                4000
              );
              console.error("delete API call failed:", error);
            }
          } else {
          }
        })
      )
      .subscribe();
  }

  onSearch(): void {
    const search = this.searchTax.trim().toLowerCase();
    if (this.searchTax.trim() === "") {
      // If search input is empty, show all items
      this.filteredTax = this.taxes;
    } else {
      this.filteredTax = this.filteredTax.filter((item) => {
        const itemName = item.name.toLowerCase();
        const itemRate = item.rate.toString();
        const itemType = item.type.toLowerCase();
        return (
          itemName.startsWith(search) ||
          itemRate.startsWith(search) ||
          itemType.startsWith(search)
        );
      });
    }
  }

  async changeTaxStatus(id: any, status: boolean) {
    await this.taxService.changeTaxStatus(id, status);
    await this.getTaxes();
  }
}
