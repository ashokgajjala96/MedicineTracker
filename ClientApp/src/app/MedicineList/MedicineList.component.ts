import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

export interface MedicineData {
  name: string;
  brand: string;
  price: number;
  Quantity: number;
  expDate: Date;
  notes: string;
}

@Component({
  selector: 'app-medicinelist',
  templateUrl: './MedicineList.component.html',
  styleUrls: ['./MedicineList.component.css']
})
export class MedicineListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Name', 'Brand', 'Price', 'Quantity', 'ExpDate'];
  dataSource: MatTableDataSource<MedicineData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private appService: AppService, private router: Router,  private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.appService.getMedicineList().subscribe((res: any) => {
      alert('success');
      this.spinner.hide();
      const medicineList = JSON.parse(JSON.stringify(res));
      medicineList.map(medicine => {
        const toDate = new Date().getTime();
        const dueDate = new Date(medicine.expDate).getTime();
        const daysDiff = (dueDate - toDate) / (1000 * 3600 * 24);
        medicine['backgroundColor'] =  daysDiff < 30 ? 'red' : medicine.quantity < 10 ? 'yellow' : '';
    });

      this.dataSource = new MatTableDataSource(medicineList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      error => {
        alert('error');
      });
  }

  ngOnInit() {

    // GET Call for medicineList
    // this.appService.getMedicineList().subscribe((res: any) => {
    //   alert('success');
    //   this.dataSource = new MatTableDataSource(res);
    // },
    //   error => {
    //     alert('error');
    //   });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewMedicine(medicineId): void {
    this.router.navigate(['/view-medicine', medicineId]);
  }
}


/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }