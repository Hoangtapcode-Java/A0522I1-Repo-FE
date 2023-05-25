import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../models/Customer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  customers: Customer []=[];

  constructor(private httpClient : HttpClient) {

  }
  getAllCustomer(): Observable<any>{
    return this.httpClient.get<GetReponse>("http://localhost:8080/api/customers")
  }
  findCustomerById(id : String) : Observable<Customer>{
    return this.httpClient.get<Customer>("http://localhost:8080/api/customers"+id);
  }
}
interface GetReponse {
  content:Customer[];
  number:number;
  totalPage:number;
  totalElement:number;
}
