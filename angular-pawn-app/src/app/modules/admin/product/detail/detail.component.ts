import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {Contract} from "../../../../models/contract/Contract";
import {Image} from "../../../../models/image/Image";
import {ProductServiceService} from "../../../../service/product-service.service";
import {ImageServiceService} from "../../../../service/image-service.service";



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  contract: Contract;
  contract_id: String;
  imgs: Image[]

  constructor(private active: ActivatedRoute, private serviceProduct: ProductServiceService, private imgService: ImageServiceService) {

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

  getAllImg() {
    this.imgService.getAllImg().subscribe(next => {
      this.imgs = next
    })
  }

  ngOnInit(): void {
    this.getContractById();
    this.getAllImg();

  }
}
