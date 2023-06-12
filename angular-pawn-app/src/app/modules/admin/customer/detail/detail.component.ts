import { Component, OnInit } from '@angular/core';
import {catchError, map, startWith} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CustomerServiceService} from "../../../../service/customer-service.service";
import {CustomerList} from "../../../../models/customer/CustomerList";
import {ApiResponse} from "../../../../dto/customerDTO/api-response";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
// Customer
  customerDetailState$: Observable<{
    appState: string;
    appData?: ApiResponse<CustomerList>;
    error?: HttpErrorResponse;
  }>;
  responseDetailSubject = new BehaviorSubject<ApiResponse<CustomerList>>(null);

  constructor(
    private customerService: CustomerServiceService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((next) => {
      const id = next.get("id");
      if (id != null) {
        this.fetchCustomerDetail(id);
      }
    });
  }

  ngOnInit(): void {}

  fetchCustomerDetail(id: any) {
    this.customerDetailState$ = this.customerService
      .findByIdHuy(parseInt(id))
      .pipe(
        map((response: ApiResponse<CustomerList>) => {
          console.log(response);
          this.responseDetailSubject.next(response);
          return { appState: "APP_LOADED", appData: response };
        }),
        startWith({
          appState: "APP_LOADED",
          appData: this.responseDetailSubject.value,
        }),
        catchError((error: HttpErrorResponse) =>
          of({ appState: "APP_ERROR", error })
        )
      );
  }
}
