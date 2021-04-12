import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './AddMedicine.component.html',
  styleUrls: ['./AddMedicine.component.css']
})
export class AddMedicineComponent implements OnInit {
  medicine: FormGroup;
  showDateValidation: boolean;
  minDateStart: Date;
  constructor(private fb: FormBuilder, private router: Router, private appService: AppService,  private spinner: NgxSpinnerService) {
    const currentDate = new Date();
    this.minDateStart = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000);
  }
  ngOnInit() {
    this.medicine = this.fb.group({
      name: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      expDate: [null, [Validators.required]],
      notes: [null, [Validators.required]],
    });
  }
  addMedicine() {
    this.spinner.show();
    const madicineData = {
      name: this.medicine.get('name').value,
      brand: this.medicine.get('brand').value,
      price: this.medicine.get('price').value,
      quantity: this.medicine.get('quantity').value,
      expDate: this.medicine.get('expDate').value,
      notes: this.medicine.get('notes').value,
    }
    this.appService.CreateMedicine(madicineData).subscribe((res: any) => {
      alert('successfully added medicine');
      this.spinner.hide();
      this.router.navigateByUrl('');
    }, error => {
      alert(error);
    });
  }
  cancel() {
    this.router.navigateByUrl('');
  }
  dateFilter: (date: Date | null) => void =
    (date: Date | null) => {
      const toDate = new Date().getTime();
      const dueDate = new Date(date).getTime();
      const daysDiff = (dueDate - toDate) / (1000 * 3600 * 24);
      this.showDateValidation = daysDiff > 30 ? false : true;
    }
}
