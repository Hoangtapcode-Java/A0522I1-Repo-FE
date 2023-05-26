import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from '../models/contract/Contract';

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {

  constructor(private httpClient: HttpClient) { }

  saveContract(contract: Contract): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/api/contract", contract); 
  }
}
