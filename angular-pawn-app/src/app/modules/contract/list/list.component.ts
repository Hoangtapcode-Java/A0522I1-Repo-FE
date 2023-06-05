import {Component, HostListener, OnInit} from '@angular/core';
import {Contract} from "../../../models/Contract";
import {ContractServiceService} from "../../../service/contract-service.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductServiceService} from "../../../service/product-service.service";
import {Customer} from "../../../models/Customer";
import {Product} from "../../../models/Product";
import {CustomerServiceService} from "../../../service/customer-service.service";
import {Observable} from "rxjs";
import {Category} from "../../../models/Category";
import {Status} from "tslint/lib/runner";
declare const Swal: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor() {

  }






  ngOnInit(): void {

  }


}
