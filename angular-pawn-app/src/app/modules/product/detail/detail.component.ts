import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductServiceService} from "../../../service/product-service.service";
import { Contract } from 'src/app/models/contract/Contract';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  contract : Contract ;
  contract_id : String;

  constructor(private active : ActivatedRoute,private serviceProduct : ProductServiceService) {

  }

  getContractById() {
    this.active.paramMap.subscribe(next => {
      this.contract_id = next.get('id');
      console.log(next.get('id'))
      console.log(this.contract_id);
      // @ts-ignore
      this.serviceProduct.getProductNotPayById(parseInt(this.contract_id)).subscribe(next => {
        this.contract = next;
        console.log(this.contract)
      });
    });
  }

  ngOnInit(): void {
    this.getContractById()
  }

}
