import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contract} from "../models/contract/Contract";
import {Category} from "../models/category/Category";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<any> {
      return this.httpClient.get<GetResponse>("http://localhost:8080/api/contracts");
  }

  editContract(contract: any, customerNameEdit: string, productNameEdit: string, categoryEdit: Category): Observable<any> {
    return this.httpClient.put<Contract>("http://localhost:8080/api/contracts/" + contract.id, contract );
  }

  findById(id: any): Observable<Contract> {
    return this.httpClient.get<Contract>("http://localhost:8080/api/contracts/" + id);
  }
  deleteContract(id: any): Observable<Contract> {
    return this.httpClient.delete<Contract>("http://localhost:8080/api/contracts/" + id);
  }

  searchContract(customerName: string, productName: string, beforeDate: string, afterDate: string, status: string): Observable<any> {
    return this.httpClient.get<GetResponse>("http://localhost:8080/api/contracts/search?customerName=" + customerName
      + "&productName=" + productName + "&beforeDate=" + beforeDate + "&afterDate=" + afterDate + "&status=" + status);
  }
}

interface GetResponse {
  content:Contract[];
  number:number;
  totalPage:number;
  totalElement:number;
}
