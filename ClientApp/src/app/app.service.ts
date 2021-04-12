import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public baseUrlStirng: string;
  constructor(private https: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrlStirng = baseUrl;
  }

  /**
  * GET Call for Dahsboard Provision Call
  */
  public getMedicineList() {
    return this.https.get(this.baseUrlStirng + 'api/Medicinetracker/GetMedicineList');
  }

  /**
   * GET Call for Provisons with respect to userId
   * @param medicineId;
   */
  public getMedicine(medicineId: string) {
    let params = new HttpParams();
    params = params.append('medicineId', medicineId);

    return this.https.get(this.baseUrlStirng + 'api/Medicinetracker/getMedicine', { params });
  }

  public CreateMedicine(data): Observable<any> {
    return this.https.post(`${this.baseUrlStirng}api/Medicinetracker/CreateMedicine`, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError((error: Response) => throwError(error))
      );
  }

  public UpdateMedicine(medicineId: string, data): Observable<any> {
    return this.https.put(`${this.baseUrlStirng}api/Medicinetracker/UpdateMedicine?medicineId=${medicineId}`, data)
      .pipe(
        map((res: Response) => {
          return res;
        }),
        catchError((error: Response) => throwError(error))
      );
  }
}
