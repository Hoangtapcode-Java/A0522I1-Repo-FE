import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contract} from "../models/contract/Contract";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  API_KEY_PRODUCT = 'http://localhost:8080/api/products'

  constructor(private httpClient : HttpClient) { }

  // @ts-ignore
  getContractNotPay(nameCustomer: string, categoryName: string, page: number) : Observable<any>{
    // @ts-ignore
    return this.httpClient.get(this.API_KEY_PRODUCT+"?namecustomer="+nameCustomer+"&categoryname="+categoryName+"&page="+page)
  }
  // @ts-ignore
  getProductNotPayById(id : Number) : Observable<Contract>{
    return this.httpClient.get("http://localhost:8080/api/products/"+id)
  }


}
