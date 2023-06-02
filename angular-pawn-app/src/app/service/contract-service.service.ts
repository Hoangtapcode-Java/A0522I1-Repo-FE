import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Contract } from '../models/contract/Contract';

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {
// ThuongVTH

  constructor(private httpClient: HttpClient) { }

  saveContract(contract: Contract): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/api/contract", contract); 
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Xử lí lỗi khi có lỗi mạng hoặc lỗi xử lí trên client-side
      console.error('Lỗi xảy ra:', error.error.message);
    } else {
      // Xử lí lỗi từ phía server
      console.error(
        `Mã lỗi từ server: ${error.status}, ` +
        `Thông báo lỗi: ${error.error}`);
    }
    // Trả về một Observable với thông tin lỗi
    return throwError('Đã xảy ra lỗi, vui lòng thử lại sau');
  }
}
