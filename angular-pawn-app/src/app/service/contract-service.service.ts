import { Injectable } from '@angular/core';
import {Contract} from "../models/Contract";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/Customer";

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {
  contracts : Contract []=[];
  constructor(private httpClient : HttpClient) { }
  getAllContract(): Observable<any>{
    return this.httpClient.get<GetReponse>("http://localhost:8080/api/contracts")
  }
  updateById(contract, idContract: number): Observable<any> {
    return this.httpClient.put<any>("http://localhost:8080/api/contracts" + idContract, contract);
  }
  findContractById(id : string) : Observable<Contract>{
   return this.httpClient.get("http://localhost:8080/api/contracts/"+id);
  }
  resetContracts(): void {
    this.contracts = [];
  }

}
interface GetReponse {
  content:Customer[];
  number:number;
  totalPage:number;
  totalElement:number;
}
