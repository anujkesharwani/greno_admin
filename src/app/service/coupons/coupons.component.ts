import { Dialog } from "@angular/cdk/dialog";
import { Component, Input, OnInit } from "@angular/core";
import { catchError, of, tap } from "rxjs";
import { NotificationService } from "src/app/Shared/core/notification.service";
import { ConfirmationDialogService } from "src/app/Shared/shared-services/modal-service.service";
import { AddComponent } from "./add/add.component";
import { CouponsService } from "./coupons.service";
import { Coupon } from "./coupons.structure";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-coupons",
  templateUrl: "./coupons.component.html",
  styleUrls: ["./coupons.component.scss"],
})
export class CouponsComponent implements OnInit {
  @Input() serviceCatalogueId: string;
  constructor(
    private dialog: Dialog,
    private couponsService: CouponsService,
    private confirmDialog: ConfirmationDialogService,
    private notify: NotificationService,
    private matDialog: MatDialog
  ) {}
  coupons: Coupon[] = [];
  filterCoupons: Coupon[] = [];
  protected searchcoupon: string = "";

  ngOnInit(): void {
    this.getCoupons();
  }

  onAddCouponClicked() {
    const dialogRef = this.matDialog.open(AddComponent, {
      data: { mode: "add", serviceCatalogueId: this.serviceCatalogueId },
    });
    dialogRef
      .afterClosed()
      .pipe(
        tap((result) => {
          if (result === "add") {
            this.notify.presentSuccessToast("Coupon added successfully", 4000);
            this.getCoupons();
          }
        }),
        catchError(() => {
          this.notify.presentErrorToast("Oh !! something went wrong", 4000);
          return of("error");
        })
      )
      .subscribe();
  }

  protected onSearchCoupons(): void {
    const search = this.searchcoupon.trim().toLowerCase();
    if (this.searchcoupon.trim() === "") {
      this.coupons = this.filterCoupons;
      return;
    }
    this.filterCouponOnSearch(search);
  }

  protected onEditCouponClicked(coupon: Coupon) {
    const dialogRef = this.matDialog.open(AddComponent, {
      data: { mode: "edit", coupon },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((result) => {
          if (result === "edit") {
            this.notify.presentSuccessToast(
              "Coupon updated successfully",
              4000
            );
            this.getCoupons();
          }
        }),
        catchError(() => {
          this.notify.presentErrorToast("Oh !! something went wrong", 4000);
          return of("error");
        })
      )
      .subscribe();
  }

  protected onDeleteCouponClicked(coupon: Coupon) {
    const message = `Are you sure you want to delete the ${coupon.name} coupon ?`;
    const dialogRef = this.confirmDialog.openConfirmationDialog(message);
    dialogRef
      .afterClosed()
      .pipe(
        tap((result) => {
          if (result) {
            this.couponsService
              .deleteCoupon(coupon.id)
              .pipe(
                tap(() => {
                  this.getCoupons();
                  this.notify.presentSuccessToast(
                    "Coupon deleted successfully",
                    4000
                  );
                }),
                catchError((error) => {
                  this.notify.presentErrorToast(
                    "Something went wrong please try again.",
                    4000
                  );
                  return of(error);
                })
              )
              .subscribe();
          }
        })
      )
      .subscribe();
  }

  private getCoupons() {
    this.couponsService.getCoupons().then((res) => {
      this.coupons = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Coupon;
      });
      this.filterCoupons = [...this.coupons];
    });
  }

  private filterCouponOnSearch(search: string): void {
    this.coupons = this.coupons.filter((coupons) => {
      const name = coupons.name?.toLowerCase();
      const amount = coupons.amount?.toString();
      const maxUsesPerUserDaily = coupons.maxUsesPerUserDaily?.toString();
      const description = coupons.description?.toString();
      const maxUsesPerUserWeekly = coupons.maxUsesPerUserWeekly?.toString();
      const type = coupons.type?.toString();
      const minimumRequiredAmount = coupons.minimumRequiredAmount?.toString();
      const maximumDiscountAmount = coupons.maximumDiscountAmount?.toString();

      return (
        name?.startsWith(search) ||
        description?.startsWith(search) ||
        amount?.startsWith(search) ||
        maxUsesPerUserDaily?.startsWith(search) ||
        maxUsesPerUserWeekly?.startsWith(search) ||
        minimumRequiredAmount?.startsWith(search) ||
        maximumDiscountAmount?.startsWith(search) ||
        type?.startsWith(search)
      );
    });
  }
}
