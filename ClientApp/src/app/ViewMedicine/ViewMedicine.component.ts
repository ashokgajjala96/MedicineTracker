import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-view-medicine',
  templateUrl: './ViewMedicine.component.html',
  styleUrls: ['./ViewMedicine.component.css']
})

export class ViewMedicineComponent implements OnInit {
  medicineId: string;
  medicineInfo: any;
  medicine: FormGroup;
  showDateValidation: boolean;
  minDateStart: Date;
  @ViewChild('closeModel', { static: true }) public closeModel: ElementRef;
  constructor(private _activatedRoute: ActivatedRoute, private service: AppService, private router: Router,
    private fb: FormBuilder, private spinner: NgxSpinnerService) {
    const currentDate = new Date();
    this.minDateStart = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000);
  }
  ngOnInit(): void {
    this.medicineId = this._activatedRoute.snapshot.paramMap.get('medicineId');
    this.medicine = this.fb.group({
      name: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      expDate: [null, [Validators.required]],
      notes: [null, [Validators.required]],
    });
    this.GetMedicine();
  }
  GetMedicine() {
    this.service.getMedicine(this.medicineId).subscribe((res: any) => {
      this.medicineInfo = res;
      this.medicine.patchValue(this.medicineInfo);
      this.spinner.hide();
    });
  }
  UpdateMedicine() {
    this.spinner.show();
    const madicineData = {
      id: this.medicineId,
      name: this.medicine.get('name').value,
      brand: this.medicine.get('brand').value,
      price: this.medicine.get('price').value,
      quantity: this.medicine.get('quantity').value,
      expDate: this.medicine.get('expDate').value,
      notes: this.medicine.get('notes').value,
    };
    this.service.UpdateMedicine(this.medicineId, madicineData).subscribe((res: any) => {
      alert('successfully added medicine');
      this.closeModel.nativeElement.click();
      this.GetMedicine();
    }, error => {
      alert(error);
      this.closeModel.nativeElement.click();
    });
  }

  dateFilter: (date: Date | null) => void =
    (date: Date | null) => {
      const toDate = new Date().getTime();
      const dueDate = new Date(date).getTime();
      const daysDiff = (dueDate - toDate) / (1000 * 3600 * 24);
      this.showDateValidation = daysDiff > 30 ? false : true;
    }
}
