import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerRegHomeService {


  constructor(private httpClient: HttpClient) { }

  saveCustomerReg(event: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/dangkynhanh', event);
  }
}
