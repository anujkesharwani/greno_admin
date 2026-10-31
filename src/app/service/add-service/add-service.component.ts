import { DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NotificationService } from "src/app/Shared/core/notification.service";
import { StorageService } from "src/app/Shared/core/storage/storage.service";
import { Category } from "../category.structure";
import { CategorizedService, Service, Variant } from "../service.structure";
import { ServiceService } from "../service.service";
import { TaxesService } from "src/app/service/taxes/taxes.service";
import { CouponsService } from "src/app/service/coupons/coupons.service";
import { Coupon } from "src/app/service/coupons/coupons.structure";
import { Tax } from "src/app/service/taxes/taxes.structure";
import EditorJS from "@editorjs/editorjs";
import { Subject, debounceTime } from "rxjs";
import Fuse from "fuse.js";
import { extendedCategory } from "../service.component";
import { ServiceCatalogue } from "src/app/service-catalogues/service-category.structure";
const RawTool = require("@editorjs/raw");
const Checklist = require("@editorjs/checklist");
const List = require("@editorjs/list");
const Embed = require("@editorjs/embed");
const Quote = require("@editorjs/quote");
const Header = require("@editorjs/header");
@Component({
  selector: "app-add-service",
  templateUrl: "./add-service.component.html",
  styleUrls: ["./add-service.component.scss"],
})
export class AddServiceComponent {
  serviceForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    image: new FormControl("", []),
    video: new FormControl(""),
    enabled: new FormControl(""),
    hsnCode: new FormControl("", [Validators.required]),
    reviewEditable: new FormControl("", [Validators.required]),
    allowReviews: new FormControl(""),
    taxes: new FormControl(""),
    discounts: new FormControl(""),
  });
  blogEditor: EditorJS | undefined;
  selectedDiscounts: Coupon[] = [];
  availableDiscounts: Coupon[] = [];
  selectedServices: CategorizedService[] = [];
  availableServices: CategorizedService[] = [];
  filteredDiscounts: Coupon[] = [];
  filteredServices: CategorizedService[] = [];
  discountSearchSubject: Subject<string> = new Subject<string>();
  serviceSearchSubject: Subject<string> = new Subject<string>();
  discountFuseInstance: Fuse<Coupon> = new Fuse([], { keys: ["name"] });
  serviceFuseInstance: Fuse<CategorizedService> = new Fuse([], {
    keys: ["name"],
  });
  discounts: Coupon[] = [];
  taxes: Tax[] = [];
  operation: "add" | "edit" = "add";
  variants: Variant[];
  @Input() data:
    | {
        mode: "add" | "edit";
        mainCategory: Category;
        subCategory: Category;
        service: Service;
        categories: extendedCategory[];
        catalogue: ServiceCatalogue;
      }
    | undefined;
  constructor(
    private serviceService: ServiceService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private taxesService: TaxesService,
    private couponService: CouponsService
  ) {
    this.instantiateData();
    this.couponService.getCoupons().then((res) => {
      this.discounts = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Coupon;
      });
      this.discountFuseInstance.setCollection(this.discounts);
    });
    this.taxesService.getTaxes().then((res) => {
      this.taxes = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Tax;
      });
    });

    this.discountSearchSubject.pipe(debounceTime(600)).subscribe((val) => {
      this.filteredDiscounts = this.discountFuseInstance
        .search(val)
        .map((res) => {
          return res.item;
        });
    });
    this.serviceSearchSubject.pipe(debounceTime(600)).subscribe((val) => {
      this.filteredServices = this.serviceFuseInstance
        .search(val)
        .map((res) => {
          return res.item;
        });
    });
    this.serviceService.updateServiceComp.subscribe(() => {
      // recheck everything and reload
      this.instantiateData();
      this.ngOnInit();
      setTimeout(() => {
        if (this.blogEditor) this.blogEditor.destroy();
        if (this.data?.service?.description.blocks.length) {
          this.blogEditor = new EditorJS({
            holder: "blogEditor",
            tools: {
              raw: RawTool,
              checklist: {
                class: Checklist,
                inlineToolbar: true,
              },
              list: {
                class: List,
                inlineToolbar: true,
                config: {
                  defaultStyle: "unordered",
                },
              },
              data: this.data?.service?.description,
              header: Header,
              embed: Embed,
              quote: Quote,
            },
            minHeight: 100,
            placeholder: "Enter description here",
          });
        } else {
          this.blogEditor = new EditorJS({
            holder: "blogEditor",
            tools: {
              raw: RawTool,
              checklist: {
                class: Checklist,
                inlineToolbar: true,
              },
              list: {
                class: List,
                inlineToolbar: true,
                config: {
                  defaultStyle: "unordered",
                },
              },
              header: Header,
              embed: Embed,
              quote: Quote,
            },
            minHeight: 100,
            placeholder: "Enter description here",
          });
        }
      }, 100);
    });
  }

  instantiateData() {
    if (this.data?.categories) {
      // convert this.data.services to categorized services
      this.availableServices = [];
      this.data.categories.forEach((category) => {
        category.subCategories.forEach((subCategory) => {
          subCategory.services.forEach((service) => {
            this.availableServices.push({
              ...service,
              subCategory: {
                id: subCategory.id,
                name: subCategory.name,
              },
              category: {
                id: category.id,
                name: category.name,
              },
            });
          });
        });
      });

      this.serviceFuseInstance.setCollection(this.availableServices);
    }
  }

  ngOnInit(): void {
    if (this.data?.mode == "edit") {
      this.operation = "edit";
      this.serviceForm.patchValue(this.data.service);
      this.variants = this.data.service.clothes || [];
    } else {
      this.operation = "add";
      this.serviceForm.patchValue({
        enabled: true,
        reviewEditable: true,
        allowReviews: true,
        name: "",
        image: "",
        video: "",
        hsnCode: "",
        taxes: [],
        discounts: [],
      });
      // reset all variables
      this.variants = [];
      this.selectedDiscounts = [];
      this.selectedServices = [];
    }
  }

  async addService() {
    if (!this.data) return;
    let data = {
      ...this.serviceForm.value,
      variants: this.variants,
      discount: this.selectedDiscounts,
      services: this.selectedServices,
      description: await this.blogEditor?.save(),
    };
    this.serviceService
      .addService(this.data.catalogue.id, data as Service)
      .then(() => {
        // this.dialogRef.close();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  updateService() {
    if (!this.data) return;
    this.serviceService
      .updateService(this.data.catalogue.id, this.serviceForm.value as Service)
      .then(() => {
        // this.dialogRef.close();
        this.notificationService.presentSuccessToast(
          "Service Updated successfully"
        );
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  handleSubmit() {
    if (this.serviceForm.errors == null) {
      if (this.operation === "add") {
        this.addService();
      } else {
        this.updateService();
      }
    } else {
      this.notificationService.presentErrorToast(
        "Please fill all the required fields"
      );
    }
  }

  addVariant() {
    this.variants.push({
      name: "",
      cost: 0,
      image: "",
      enabled: true,
      id: Date.now().toString(),
    });
  }

  close() {
    // this.dialogRef.close();
  }

  async selectImage() {
    let res = await this.storageService.selectImage(true);
    if (res) {
      this.serviceForm.patchValue({
        image: res,
      });
    }
  }

  async selectVideo() {
    let res = await this.storageService.selectVideo();
    if (res) {
      this.serviceForm.patchValue({
        video: res,
      });
    }
  }

  haveSelectedCoupon(event: any) {
    if (event?.option?.value) this.selectedDiscounts.push(event.option.value);
  }

  haveSelectedService(event: any) {
    if (event?.option?.value) this.selectedServices.push(event.option.value);
  }

  returnBlank(data: any) {
    return "";
  }
}
