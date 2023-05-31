import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contract} from '../models/contract/Contract';
import {Category} from '../models/category/Category';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private baseUrl = 'http://localhost:8080/api/contracts';

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number = 0, nameCustomer: string = '', nameProduct: string = '', dateBegin: string = '', contractCode: string = ''): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/listSelect' + '?page=' + page + '&contractCode=' +
      contractCode + '&nameCustomer=' + nameCustomer + '&nameProduct=' + nameProduct + '&beginDate=' + dateBegin);
  }

  getById(idContract: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + '/select/' + idContract);
  }

  updateById(contract, idContract: number): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + '/update/' + idContract, contract);
  }

  findAll(page: number): Observable<any> {
    return this.httpClient.get<GetResponse>('http://localhost:8080/api/contracts?page=' + page);
  }

  editContract(contractEditDto: any): Observable<any> {
    return this.httpClient.put<Contract>('http://localhost:8080/api/contracts/' + contractEditDto.id, contractEditDto);
  }

  findById(id: any): Observable<Contract> {
    return this.httpClient.get<Contract>('http://localhost:8080/api/contracts/' + id);
  }

  deleteContract(id: any): Observable<Contract> {
    return this.httpClient.delete<Contract>('http://localhost:8080/api/contracts/' + id);
  }

  searchContract(customerName: string, productName: string, beforeDate: string, afterDate: string, status: string, page: number): Observable<any> {
    return this.httpClient.get<GetResponse>('http://localhost:8080/api/contracts/search?customerName=' + customerName
      + '&productName=' + productName + '&beforeDate=' + beforeDate + '&afterDate=' + afterDate + '&status=' + status + '&page=' + page);
  }
}

interface GetResponse {
  content: Contract[];
  number: number;
  totalPage: number;
  totalElement: number;
}
