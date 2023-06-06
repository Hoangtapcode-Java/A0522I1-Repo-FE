import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmployeeInforDTO} from "../models/employee/EmployeeInforDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private  httpClient: HttpClient) {
  }

  findByIdEmployee(): Observable<EmployeeInforDTO> {
    return this.httpClient.get<EmployeeInforDTO>("http://localhost:8080/api/employees/id");
  }

  updateEmployeeInfor(eployeeInfor: EmployeeInforDTO): Observable<any> {
    return this.httpClient.put("http://localhost:8080/api/employees/save", eployeeInfor);
  }

}
