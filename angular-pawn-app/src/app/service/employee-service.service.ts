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
    return this.httpClient.get<EmployeeInforDTO>("http://localhost:8080/api/employees/id", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDb25ndGFuMjEiLCJpYXQiOjE2ODU2NDI2MDAsImV4cCI6MTY4NTcyOTAwMH0.lhzGPiGitOHt2RotLFrSDci2lBSlVClOKUI8FaCyjYI8JJq3Svj_ZpnF0zj6wuijmWkrYnO08eTwuhm7jzzt-Q",
      }
    });
  }

  updateEmployeeInfor(eployeeInfor: EmployeeInforDTO): Observable<any> {
    return this.httpClient.put("http://localhost:8080/api/employees/save", eployeeInfor, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDb25ndGFuMjEiLCJpYXQiOjE2ODU2NDI2MDAsImV4cCI6MTY4NTcyOTAwMH0.lhzGPiGitOHt2RotLFrSDci2lBSlVClOKUI8FaCyjYI8JJq3Svj_ZpnF0zj6wuijmWkrYnO08eTwuhm7jzzt-Q",
      }
      });
  }

}
