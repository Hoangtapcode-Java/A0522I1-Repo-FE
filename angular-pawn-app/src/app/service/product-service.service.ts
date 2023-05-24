import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contract} from "../models/contract/Contract";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  API_KEY_PRODUCT = 'http://localhost:8080/api/products'
  API_KEY_TOTALPAGE = 'http://localhost:8080/api/products/totalpages'

  constructor(private httpClient : HttpClient) { }

  // @ts-ignore
  getContractNotPay(nameCustomer: string, categoryId: string, page: number) : Observable<any>{
    // @ts-ignore
    return this.httpClient.get(this.API_KEY_PRODUCT+"?namecustomer="+nameCustomer+"&categoryid="+categoryId+"&page="+page)
  }
  // @ts-ignore
  getProductNotPayById(id : Number) : Observable<Contract>{
    return this.httpClient.get("http://localhost:8080/api/products/"+id)
  }
   // @ts-ignore
  // getTotalPage(nameCustomer: string, categoryId: string) : Observable<number>{
  //  // @ts-ignore
  //   return this.httpClient.get(this.API_KEY_TOTALPAGE+"?namecustomer="+nameCustomer+"&categoryid="+categoryId)
  // }

}
