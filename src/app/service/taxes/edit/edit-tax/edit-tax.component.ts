import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TaxesService } from '../../taxes.service';

@Component({
  selector: 'app-edit-tax',
  templateUrl: './edit-tax.component.html',
  styleUrls: ['./edit-tax.component.scss']
})
export class EditTaxComponent {

  editForm: FormGroup;
  originalData: any; // Store the original data
  dataChanged = false; // Flag to track if data changed
  typeOptions: string[] = ['percentage', 'flat'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { item: any },
    private dialogRef: MatDialogRef<EditTaxComponent>,
    private fb: FormBuilder,
    private taxService:TaxesService
  ) {
    this.originalData = { ...data.item }; 
    this.editForm = this.fb.group({
      name: [data.item.name, Validators.required],
      rate: [data.item.rate, Validators.required],
      type: [data.item.type, Validators.required],
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedData = {
        name: this.editForm.value.name,
        rate: this.editForm.value.rate,
        type: this.editForm.value.type,
      };
        if (updatedData !== null) {
          
          this.taxService.updateTax(this.data.item.id, updatedData).then((res) => {
          });  
        
      } else {
      }
        
      this.dialogRef.close('save');
    }
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }

  private hasDataChanged(updatedData: any): boolean {
    return (
      updatedData.name !== this.originalData.name ||
      updatedData.rate !== this.originalData.rate
    );
  }
}
