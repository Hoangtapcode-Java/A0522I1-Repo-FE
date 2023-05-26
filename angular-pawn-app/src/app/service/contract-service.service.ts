import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contract} from '../models/contract/Contract';

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {
  private baseUrl = 'http://localhost:8080/api/contract';

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, nameCustomer: string, nameProduct: string, dateBegin: string, contractCode: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '?page=' + page + '&contractCode=' +
      contractCode + '&nameCustomer=' + nameCustomer + '&nameProduct=' + nameProduct + '&beginDate=' + dateBegin);
  }

  getById(idContract: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/' + idContract);
  }

  updateById(contract, idContract: number): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + '/' + idContract, contract);
  }

  getSearch(nameCustomer: string, nameProduct: string, dateBegin: string, contractCode: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '?contractCode='
      + contractCode + '&nameCustomer=' + nameCustomer + '&nameProduct=' + nameProduct + '&beginDate=' + dateBegin);
  }
}
