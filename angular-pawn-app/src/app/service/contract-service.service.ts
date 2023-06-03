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
  private flag: boolean;
  constructor(private httpClient : HttpClient) { }
  getAllContract(): Observable<any>{
    return this.httpClient.get<GetReponse>("http://localhost:8080/api/contracts")
  }

  updateContract(contract: Contract,idContract: number): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8080/api/contract/'+ idContract,contract);
  }

  findContractById(id : number) : Observable<any>{
   return this.httpClient.get("http://localhost:8080/api/contracts/"+id);
  }

}
interface GetReponse {
  content:Customer[];
  number:number;
  totalPage:number;
  totalElement:number;
}
