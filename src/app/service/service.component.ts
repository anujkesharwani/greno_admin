import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Dialog } from "@angular/cdk/dialog";
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import EditorJS from "@editorjs/editorjs";
import Fuse from "fuse.js";
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  map,
  startWith,
} from "rxjs";
import { NotificationService } from "../Shared/core/notification.service";
import { StorageService } from "../Shared/core/storage/storage.service";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { CategoryService } from "./category.service";
import { Category } from "./category.structure";
import { CouponsService } from "./coupons/coupons.service";
import { Coupon } from "./coupons/coupons.structure";
import { ServiceService } from "./service.service";
import { CategorizedService, Service, Variant } from "./service.structure";
import { TaxesService } from "./taxes/taxes.service";
import { Tax } from "./taxes/taxes.structure";
import { DataProviderService } from "../core/data-provider.service";
import { TagsService } from "./tags.service";
import { Tags } from "./tags.structure";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { ServiceCatalogue } from "../service-catalogues/service-category.structure";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ServiceCatalogueService } from "../service-catalogues/service-catalogue.service";
import { ConfirmationDialogComponent } from "../Shared/dialog/dialog.component";
import { ItemService } from "../items/item.service";
const RawTool = require("@editorjs/raw");
const Checklist = require("@editorjs/checklist");
const List = require("@editorjs/list");
const Embed = require("@editorjs/embed");
const Quote = require("@editorjs/quote");
const Paragraph = require("@editorjs/paragraph");
const Header = require("@editorjs/header");

@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.scss"],
})
export class ServiceComponent implements OnInit, OnDestroy {
  services: any;
  constructor(
    private dataProvider: DataProviderService,
    private dialog: Dialog,
    private categoryService: CategoryService,
    public serviceService: ServiceService,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private taxesService: TaxesService,
    private tagsService: TagsService,
    private couponService: CouponsService,
    private formBuilder: FormBuilder,
    private serviceCatalogueService: ServiceCatalogueService,
    private matDialog: MatDialog,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.couponService.getCoupons().then((res) => {
      this.discounts = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Coupon;
      });
      this.discountFuseInstance.setCollection(this.discounts);
    });
    this.tagsService.getServiceTag().then((res) => {
      const tags = res.docs.map((doc) => {
        this.allTags.push(doc.data()["name"]);
        return {
          id: doc.id,
          name: doc.data()["name"],
        } as Tags;
      });
      this.tagsFuseInstance.setCollection(tags);
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
        })
        .filter((res) => {
          const allCoupons = [
            ...this.selectedDiscounts,
            ...(this.serviceForm.value.discounts || []),
          ].map((item) => {
            return item.id;
          });
          return allCoupons.indexOf(res.id) < 0;
        });
    });
    this.serviceSearchSubject.pipe(debounceTime(600)).subscribe((val) => {
      this.filteredServices = this.serviceFuseInstance
        .search(val)
        .filter((item) => {
          if (
            item.item.id != this.currentService?.id &&
            item.item.subCategory.id === this.currentSubCategory?.id
          ) {
            return item;
          } else {
            return null;
          }
        })
        .map((res) => {
          return res.item;
        });
    });
    this.resetTagsList();
  }
  /*Tags Selection*/
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl("");
  filteredTags: Observable<string[]> | undefined;
  serviceTags: string[] = [];
  allTags: string[] = [];
  items: any[] = [];

  @ViewChild("tagInput") tagInput: ElementRef<HTMLInputElement> | undefined;
  announcer = inject(LiveAnnouncer);
  /*Tags Selection*/

  currentMainCategory: extendedCategory | undefined;
  currentSubCategory: extendedSubCategories | undefined;
  currentService: Service | undefined;
  categories: extendedCategory[] = [];
  currentTab = 0;

  // unsaved changes state
  unsavedChanges: boolean = false;

  // serviceForm variables
  serviceCatalogueForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required]],
    active: [true],
    created: [new Date()],
    id: "",
  });
  serviceForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required]],
    image: ["", [Validators.required]],
    // video: ['', [Validators.required]],
    enabled: [""],
    hsnCode: ["", [Validators.required]],
    costPerKg: [null, [Validators.required]],
    type: [""],
    taxes: ["", [Validators.required]],
    discounts: [""],
    taxType: ["", [Validators.required]],
    color: ["#000"],
    clothes: this.formBuilder.array([]),
    tags: [[]],
  });
  createVariant(): FormGroup {
    return this.formBuilder.group({
      name: ["", Validators.required],
      cost: [0, Validators.required],
      image: ["", Validators.required],
      id: ["", Validators.required],
      enabled: true,
    });
  }

  get activeOnAreas() {
    return 0;
  }

  get variantsArr() {
    return this.serviceForm.get("clothes") as FormArray;
  }
  getControls() {
    return (this.serviceForm.get("clothes") as FormArray).controls;
  }
  addVariant(): void {
    this.variantsArr.push(this.createVariant());
  }
  removeVariant(i: number) {
    this.variantsArr.removeAt(i);
  }
  clearVariant() {
    const arr = <FormArray>this.serviceForm.controls["clothes"];
    arr.controls = [];
  }

  selectedDiscounts: Coupon[] = [];
  availableDiscounts: Coupon[] = [];
  selectedServices: CategorizedService[] = [];
  availableServices: CategorizedService[] = [];
  filteredDiscounts: Coupon[] = [];
  filteredServices: CategorizedService[] = [];
  discountSearchSubject: Subject<string> = new Subject<string>();
  serviceSearchSubject: Subject<string> = new Subject<string>();
  discountFuseInstance: Fuse<Coupon> = new Fuse([], { keys: ["name", "id"] });
  tagsFuseInstance: Fuse<Tags> = new Fuse([], { keys: ["name"] });
  serviceFuseInstance: Fuse<CategorizedService> = new Fuse([], {
    keys: ["name"],
  });
  discounts: Coupon[] = [];
  taxes: Tax[] = [];
  operation: "add" | "edit" | "view" | undefined = undefined;
  allServices: any[] = [];

  addCategory() {
    this.dialog.open(AddCategoryComponent, {
      data: {
        mode: "add",
        type: "mainCategory",
        catalogue: this.serviceCatalogueForm.value,
      },
    });
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.serviceCatalogueForm.setValue({
        name: this.data.name,
        active: this.data.active,
        created: this.data.created,
        id: this.data.id,
      });
      this.getDefaultData();
    }
    this.getServices(this.data.id);
    this.getItem();
  }
  //new
  getServices(catalogueId: any) {
    this.allServices = [];
    this.serviceService.getServices(catalogueId).then((res) => {
      res.docs.map((service) => {
        this.allServices.push({ ...service.data(), id: service.id });
      });
    });
  }

  getItem() {
    this.items = [];
    this.itemService.getRole().then((roles: any) => {
      roles.docs.map((item: any) => {
        this.items.push({ ...item.data(), id: item.id });
      });
    });
  }

  getDefaultData() {
    this.serviceCatalogueService
      .getServiceCatalogueSubscription()
      .subscribe(async (data) => {
        await data.map(async (catalogue) => {
          if (catalogue["id"] === this.serviceCatalogueForm.value.id) {
            this.serviceCatalogueService
              .getCategoriesSubscription(catalogue["id"])
              .subscribe(async (data) => {
                this.categories = [];
                await data.map(async (category) => {
                  let categoryData = category as extendedCategory;
                  categoryData.subCategorySubscription?.unsubscribe();
                  categoryData.subCategorySubscription =
                    await this.serviceCatalogueService
                      .getSubCategoriesSubscription(
                        catalogue["id"],
                        categoryData.id
                      )
                      .subscribe((subCategories) => {
                        categoryData.subCategories = subCategories.map(
                          (subCategory) => {
                            let subCategoryData =
                              subCategory as extendedSubCategories;
                            subCategoryData.serviceSubscription?.unsubscribe();
                            subCategoryData.serviceSubscription =
                              this.serviceCatalogueService
                                .getServicesSubscription(
                                  catalogue["id"],
                                  categoryData.id,
                                  subCategoryData.id
                                )
                                .subscribe((services) => {
                                  subCategoryData.services =
                                    services as Service[];
                                  subCategoryData.services.map(
                                    (item: Service) => {
                                      this.availableServices.push({
                                        ...item,
                                        subCategory: {
                                          id: subCategoryData.id,
                                          name: subCategoryData.name,
                                        },
                                        category: {
                                          id: categoryData.id,
                                          name: categoryData.name,
                                        },
                                      });
                                      this.serviceFuseInstance.setCollection(
                                        this.availableServices
                                      );
                                      return "";
                                    }
                                  );
                                });
                            return subCategoryData;
                          }
                        );
                      });
                  this.categories.push(categoryData);
                });
              });
          }
        });
      });
  }

  selectService(
    mode: "edit" | "add",
    currentService?: Service,
    tabChange = false
  ) {
    if (this.unsavedChanges && !tabChange) {
      if (confirm("Do you want to save the changes?")) {
        if (!this.serviceForm.valid) {
          this.serviceForm.markAllAsTouched();
          this.serviceForm.setErrors({ "Mandatory Fields missing": true });
        }
        this.handleSubmit();
        return;
      }
      this.unsavedChanges = false;
    }

    if (mode == "add") {
      this.serviceTags = [];
      this.currentService = undefined;
      this.operation = "add";
      this.unsavedChanges = true;
      this.serviceForm.patchValue({
        enabled: true,
        costPerKg: null,
        type: true,
        name: "",
        image: "",
        // video: '',
        hsnCode: "",
        taxes: [],
        discounts: [],
        color: "#000",
      });
      this.serviceForm.enable();
      // reset all variables
      // this.variants = [];
      this.selectedDiscounts = [];
      this.selectedServices = [];
    } else if (mode == "edit" && currentService) {
      this.serviceTags = currentService.tags;
      currentService.discounts = currentService.discounts.map((item) => {
        try {
          const coupon = this.discountFuseInstance
            .search(item)
            .filter((coupon) => coupon.item.id === item);
          if (coupon && coupon.length) {
            return coupon[0].item;
          }
        } catch (e) {}
        return null;
      });
      this.currentService = {
        ...currentService,
        description: currentService.description?.blocks.length
          ? currentService.description
          : this.defDesc,
      };
      this.operation = "view";

      this.clearVariant();
      for (let variant of currentService.clothes) {
        let rw = this.createVariant();
        rw.patchValue({
          name: variant.name,
          cost: Number(variant.cost),
          id: variant.id,
          enabled: variant.enabled ? true : false,
        });
        this.variantsArr.push(rw);
      }
      this.serviceForm.patchValue(this.currentService);
      this.serviceForm.disable();
    }
  }

  editService() {
    this.operation = "edit";
    this.serviceForm.enable();
    this.unsavedChanges = true;
  }

  viewService() {
    this.operation = "view";
    this.serviceForm.disable();
  }

  addSubCategory(category: Category) {
    this.dialog.open(AddCategoryComponent, {
      data: {
        mode: "add",
        type: "subCategory",
        mainCategory: category,
        catalogue: this.serviceCatalogueForm.value,
      },
    });
  }

  editCategory(category: Category) {
    this.dialog.open(AddCategoryComponent, {
      data: {
        mode: "edit",
        type: "mainCategory",
        category: category,
        catalogue: this.serviceCatalogueForm.value,
      },
    });
  }

  editSubCategory(subCategory: Category, category: Category) {
    this.dialog.open(AddCategoryComponent, {
      data: {
        mode: "edit",
        type: "subCategory",
        category: { ...subCategory, mainCategoryId: category.id },
        catalogue: this.serviceCatalogueForm.value,
      },
    });
  }

  // addService(mainCategory:Category,subCategory:Category){
  //   this.dialog.open(AddServiceComponent,{data:{mode:'add',mainCategory:mainCategory,subCategory:subCategory,categories:this.categories}})
  // }

  switchVisibility(
    value: boolean,
    category: Category,
    subCategory?: Category,
    serviceId?: string
  ) {
    if (serviceId) {
      this.categoryService.updateService(
        this.serviceCatalogueForm.value.id,
        category.id,
        subCategory?.id || "",
        serviceId,
        { enabled: value }
      );
    } else {
      if (subCategory) {
        subCategory.enabled = value;
        this.categoryService.updateSubCategory2(
          this.serviceCatalogueForm.value.id,
          { enabled: subCategory.enabled } as Category,
          category.id,
          subCategory.id
        );
      } else {
        category.enabled = value;
        this.categoryService.updateCategory(
          this.serviceCatalogueForm.value.id,
          {
            enabled: category.enabled,
            id: category.id,
          } as Category
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.categories.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        subCategory.serviceSubscription?.unsubscribe();
      });
      category.subCategorySubscription?.unsubscribe();
    });
  }

  // serviceForm functions

  defDesc = {
    time: new Date().getTime(),
    version: "2.28.0",
    blocks: [
      {
        data: { text: "&nbsp;" },
        id: "pKVjZrrb_y",
        type: "paragraph",
      },
    ],
  };
  async addService() {
    let data = {
      ...this.serviceForm.value,
      discounts: this.selectedDiscounts,
      tags: this.serviceTags,
    };
    this.dataProvider.loading = false;
    this.serviceService
      .addService(this.serviceCatalogueForm.value.id, data as Service)
      .then(() => {
        this.unsavedChanges = false;
        this.currentService = undefined;
        this.operation = undefined;
        this.notificationService.presentSuccessToast(
          "Service Added successfully"
        );
      })
      .catch((err) => {
        console.log("Error", err);
      })
      .finally(() => {
        this.dataProvider.loading = false;
      });
    this.getServices(this.data.id);
  }

  cancelNewAdd() {
    this.unsavedChanges = false;
    this.currentService = undefined;
    this.operation = undefined;
  }

  async updateService() {

    let data = {
      ...this.currentService,
      ...this.serviceForm.value,
      discounts: [
        ...this.selectedDiscounts,
        ...(this.currentService?.discounts || []),
      ].map((item) => {
        return item.id;
      }),
      services: [
        ...this.selectedServices,
        ...(this.currentService?.services || []),
      ],
      tags: this.serviceTags,
    };
    this.dataProvider.loading = true;
    this.serviceService
      .updateService(this.serviceCatalogueForm.value.id, data)
      .then(() => {
        this.unsavedChanges = false;
        this.notificationService.presentSuccessToast(
          "Service Updated successfully"
        );
        this.selectedServices = [];
        this.selectedDiscounts = [];
        this.currentService = data;
        this.selectService("edit", data);
      })
      .catch((err) => {
        console.log("Error", err);
      })
      .finally(() => {
        this.dataProvider.loading = false;
      });
  }

  handleSubmit() {
    if (this.currentTab === 0) {
      if (
        this.serviceForm.controls["name"].status === "INVALID" ||
        this.serviceForm.controls["hsnCode"].status === "INVALID"
      ) {
        this.notificationService.presentErrorToast(
          "Please fill all the required fields"
        );
        return;
      }
    } else if (this.currentTab === 1) {
      if (this.serviceForm.controls["image"].status === "INVALID") {
        this.notificationService.presentErrorToast(
          "Please upload atleast one Image"
        );
        return;
      }
    } else if (this.currentTab === 2) {
      this.items.map((item) => {
        this.serviceForm.value.clothes.map((cloth: any) => {
          if (cloth.name === item.id) {
            cloth.image = item.img;
            cloth.id = item.id;
            cloth.name = item.itemName;
          }
        });
      });
    }

    if (this.serviceForm.errors == null) {
      if (this.operation === "add") {
        this.addService();
      } else {
        this.updateService();
      }
      const difference = this.serviceTags.filter(
        (x) => !this.allTags.includes(x)
      );
      this.addNewTags(difference);
    } else {
      this.notificationService.presentErrorToast(
        "Please fill all the required fields"
      );
    }
  }

  handleServiceCatalogueSubmit() {
    this.dataProvider.loading = false;
    if (!this.serviceCatalogueForm.value.id) {
      this.serviceCatalogueService
        .addServiceCatalogue(this.serviceCatalogueForm.value)
        .then((data) => {
          this.serviceCatalogueForm.patchValue({
            id: data.id,
          });
          this.getDefaultData();
          this.notificationService.presentSuccessToast(
            "Service Catalogue Added successfully"
          );
        })
        .catch((err) => {
          console.log("Error", err);
        })
        .finally(() => {
          this.dataProvider.loading = false;
        });
    } else {
      this.serviceCatalogueService
        .updateServiceCatalogue(this.serviceCatalogueForm.value)
        .then((data) => {
          this.getDefaultData();
          this.notificationService.presentSuccessToast(
            "Service Catalogue Updated successfully"
          );
        })
        .catch((err) => {
          console.log("Error", err);
        })
        .finally(() => {
          this.dataProvider.loading = false;
        });
    }
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

  // async selectVideo() {
  //   let res = await this.storageService.selectVideo();
  //   if (res) {
  //     this.serviceForm.patchValue({
  //       video: res,
  //     });
  //   }
  // }

  haveSelectedCoupon(event: any) {
    if (event?.option?.value) this.selectedDiscounts.push(event.option.value);
  }

  haveSelectedService(event: any) {
    if (event?.option?.value) this.selectedServices.push(event.option.value);
  }

  returnBlank(data: any) {
    return "";
  }

  onTabChanged(event: any) {
    this.currentTab = event.index;
    this.selectService("edit", this.currentService, true);
  }

  deleteSuggestiveService(index: number, flag: string) {
    if (flag === "CS") {
      if (this.currentService && this.currentService.services) {
        this.currentService.services.splice(index, 1);
      }
    } else {
      this.selectedServices.splice(index, 1);
    }
  }

  deleteDiscounts(index: number, flag: string) {
    if (flag === "CS") {
      if (this.currentService && this.currentService.discounts) {
        this.currentService.discounts.splice(index, 1);
      }
    } else {
      this.selectedDiscounts.splice(index, 1);
    }
  }

  /* Tag Selection */
  addTag(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    if (value) {
      if (!this.serviceTags) {
        this.serviceTags = [];
      }
      this.serviceTags.push(value);
    }
    event.chipInput!.clear();
    this.tagsCtrl.setValue(null);
  }

  removeTag(tag: string): void {
    const index = this.serviceTags.indexOf(tag);
    if (index >= 0) {
      this.serviceTags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
    }
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.serviceTags.push(event.option.viewValue);
    if (this.tagInput) {
      this.tagInput.nativeElement.value = "";
    }
    this.tagsCtrl.setValue(null);
  }

  private _filterTag(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }

  async addNewTags(tags: string[]) {
    if (!tags.length) {
      return;
    }
    const data = tags.map((item) => {
      return { id: "", name: item };
    });
    await this.tagsService.addServiceTags(data);
    this.allTags = [...this.allTags, ...tags];
    this.resetTagsList();
  }

  resetTagsList() {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filterTag(tag) : this.allTags.slice()
      )
    );
  }
  /* Tag Selection */

  closeDialog() {
    this.dialog.closeAll();
  }

  deleteCategory(serviceCatalogId: string, categoryId: string) {
    this.matDialog
      .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
      .afterClosed()
      .subscribe(async (data: any) => {
        if (data) {
          await this.serviceCatalogueService.deleteCategory(
            serviceCatalogId,
            categoryId
          );
          this.notificationService.presentSuccessToast(
            "Category deleted successfully"
          );
          this.getDefaultData();
        }
      });
  }

  deleteSubCategory(
    serviceCatalogueId: string,
    categoryId: string,
    subCategoryId: string
  ) {
    this.matDialog
      .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
      .afterClosed()
      .subscribe(async (data: any) => {
        if (data) {
          await this.serviceCatalogueService.deleteSubCategory(
            serviceCatalogueId,
            categoryId,
            subCategoryId
          );
          this.notificationService.presentSuccessToast(
            "Subcategory deleted successfully"
          );
          this.getDefaultData();
        }
      });
  }

  // deleteService(
  //   serviceCatalogueId: string,
  //   categoryId: string,
  //   subCategoryId: string,
  //   serviceId: string
  // ) {
  //   this.matDialog
  //     .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
  //     .afterClosed()
  //     .subscribe(async (data: any) => {
  //       if (data) {
  //         await this.serviceCatalogueService.deleteService(
  //           serviceCatalogueId,
  //           categoryId,
  //           subCategoryId,
  //           serviceId
  //         );
  //         this.notificationService.presentSuccessToast(
  //           "Service deleted successfully"
  //         );
  //         this.operation = undefined;
  //         this.getDefaultData();
  //       }
  //     });
  // }

  async deleteService(service: any) {
    this.matDialog
      .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
      .afterClosed()
      .subscribe(async (result:any) => {
        if (result) {
          await this.serviceService.deleteService(this.data.id,service.id).then(() => {
            this.getServices(this.data.id);
          });
        } else {
        }
      });
  }
}

export interface extendedCategory extends Category {
  subCategories: extendedSubCategories[];
  subCategorySubscription: Subscription;
}
export interface extendedSubCategories extends Category {
  services: Service[];
  serviceSubscription: Subscription;
}
