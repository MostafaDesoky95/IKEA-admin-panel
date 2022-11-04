import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ICustomer } from 'src/app/Models/icustomer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  httpOption;
  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,Authorization: 'my-auth-token'
      })
    };
  }


  getAllCustomers(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>(`${environment.api}/Customer/Get`)
  }

  getCustomerByID(ID: number): Observable<ICustomer> {
    return this.httpClient.get<ICustomer>(`${environment.api}/Customer/GetByID?ID=${ID}`)
  }

 
  updateProduct(prdID: number, UpdatedPrd: ICustomer) {

  }

  deleteProduct(prdID: number) {

  }
}