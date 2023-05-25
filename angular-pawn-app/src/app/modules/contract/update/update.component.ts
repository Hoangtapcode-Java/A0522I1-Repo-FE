import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contract} from "../../../models/Contract";
import {ContractServiceService} from "../../../service/contract-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerServiceService} from "../../../service/customer-service.service";
import {ProductServiceService} from "../../../service/product-service.service";
import {Customer} from "../../../models/Customer";
import {Product} from "../../../models/Product";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

}
