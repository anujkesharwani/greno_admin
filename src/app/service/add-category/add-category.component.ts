import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../category.service';
import { NotificationService } from 'src/app/Shared/core/notification.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Category } from '../category.structure';
import { StorageService } from 'src/app/Shared/core/storage/storage.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  iconsList: any = []
  formSubmitted = false;
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl('', ),
    name: new FormControl('', [Validators.required]),
    image: new FormControl(null, [requiredImageValidator()]),
    icon: new FormControl('', [this.data.type == 'mainCategory' ? Validators.required : Validators.min(0)]),
    enabled: new FormControl('', []),
  });
  discounts: any[] = [];
  taxes: any[] = [];
  operation: 'add' | 'edit' = 'add';
  variants: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private dialogRef: DialogRef,
    private storageService: StorageService,
    @Inject(DIALOG_DATA)
    // private data: {
    //   mode: 'add' | 'edit';
    //   type: 'mainCategory' | 'subCategory';
    //   category: Category;
    //   mainCategory: Category;
    // }
    public data:any

  ) {
    
  }

  ngOnInit(): void {
    // this.restructureForCategory(this.data.)
    this.getIconList();
    if (this.data?.mode == 'edit') {
      this.operation = 'edit';
      this.categoryForm.patchValue(this.data.category);
      // this.variants = this.data.category.variants || [];
    } else {
      this.operation = 'add';
    }
  }

  getIconList() {
    this.categoryService.getIcons().then((data) => {
      data.docs.map((icons) => {
        if (icons.id === 'category') {
          this.iconsList = icons.data();
        }
      });
    });
  }

  addCategory() {
    let data = {
      ...this.categoryForm.value,
      variants: this.variants,
    };
    if (this.data.type == 'mainCategory') {
      this.categoryService
        .addCategory(this.data.catalogue.id, data as Category)
        .then(() => {
          this.notificationService.presentSuccessToast(
            'Category added successfully'
          );
          this.dialogRef.close();
        })
        .catch((err) => {
          console.log('Error', err);
        });
    } else {
      this.categoryService
        .addSubCategory(this.data.catalogue.id, data as Category, this.data.mainCategory.id)
        .then(() => {
          this.dialogRef.close();
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
  }

  updateCategory() {
   this.categoryForm.controls['id'].setValue(this.data.category.id);
    if (this.data.type == 'mainCategory') {
      this.categoryService
        .updateCategory(this.data.catalogue.id, this.categoryForm.value as Category)
        .then(() => {
          this.notificationService.presentSuccessToast(
            'category updated successfully'
          );
          this.dialogRef.close();
        })
        .catch((err) => {
          console.log('Error', err);
        });
    } else {
      this.categoryService
        .updateSubCategory2(
          this.data.catalogue.id,
          this.categoryForm.value as Category,
          this.data.category.mainCategoryId,
          this.data.category.id
        )
        .then(() => {
          this.notificationService.presentSuccessToast(
            'category updated successfully'
          );
          this.dialogRef.close();
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
  }

  handleSubmit() {
    this.formSubmitted = true;
    if (this.categoryForm.valid) {
      if (this.operation === 'add') {
        this.addCategory();
      } else {
        this.updateCategory();
      }
    }
    // else {
    //   this.notificationService.presentErrorToast(
    //     'Please fill all the required fields'
    //   );
    // }
  }

  addVariant() {
    this.variants.push({
      name: '',
      price: 0,
      description: '',
    });
  }

  close() {
    this.dialogRef.close();
  }

  async selectImage() {
    let res = await this.storageService.selectImage();
    if (res) {
      this.categoryForm.patchValue({
        image: res,
      });
    }
  }
}

export function requiredImageValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.parent) {
      const imageControl = control.parent.get('image');
      if (imageControl && !imageControl.value) {
        return { required: true };
      }
    }
    return null;
  };
}
