import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MedicineListComponent } from './MedicineList/MedicineList.component';
import { AddMedicineComponent } from './AddMedicine/AddMedicine.component';
import { ViewMedicineComponent } from './ViewMedicine/ViewMedicine.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MedicineListComponent,
    AddMedicineComponent,
    ViewMedicineComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      { path: '', component: MedicineListComponent, pathMatch: 'full' },
      { path: 'add-medicine', component: AddMedicineComponent },
      { path: 'view-medicine/:medicineId', component: ViewMedicineComponent },
      { path: '**', component: PageNotFoundComponent },
    ]),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    NgxSpinnerModule
  ],
  providers: [NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
