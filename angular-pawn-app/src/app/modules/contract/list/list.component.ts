import { Component, OnInit } from '@angular/core';
import {Contract} from "../../../models/Contract";
import {ContractServiceService} from "../../../service/contract-service.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductServiceService} from "../../../service/product-service.service";
import {Customer} from "../../../models/Customer";
import {Product} from "../../../models/Product";
import {CustomerServiceService} from "../../../service/customer-service.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  totalPages: number[] = [];
  totalPage: number = 0;

  page: number = 0;

  totalElement=0;
  contracts : Contract ;
  reactiveForm : FormGroup;

  product ='';
  customer ='';
  endDate ='';
  customers : Customer[]=[];
  selectedName: string;
  products : Product []=[];
  constructor(private contractServiceService : ContractServiceService,private customerServiceService : CustomerServiceService,
              private productServiceService : ProductServiceService) {
    customerServiceService.getAllCustomer().subscribe(next=>{
      this.customers=next.content;
      this.page = next.number;
      this.totalPage= next.totalPage;
      this.totalElement = next.totalElement;
    })
    productServiceService.getAllProduct().subscribe(next=>{
      this.products=next.content;
      this.page = next.number;
      this.totalPage= next.totalPage;
      this.totalElement = next.totalElement;
    })
  }

  ngOnInit(): void {

  }
  update() {
    if (this.reactiveForm.valid) {
      this.contractServiceService.updateById(this.reactiveForm.value, this.reactiveForm.value.id).subscribe(next => {
         this.getNewForm();
      });
    }
  }
  selectContract(id: number) {
    this.contractServiceService.findContractById('id').subscribe(next => {
      console.log(next);
      this.contracts = next;
      this.customer = this.contracts.customer.name;
      this.product = this.contracts.customer.name;
      this.totalPrice = this.contracts.product.price;
      this.getForm();
    });
  }


  getForm() {
    this.reactiveForm = new FormGroup({
      selectedName : new FormControl(this.contracts.customer.name),
      selectedNames: new FormControl(this.contracts.product.name),
      totalPrice : new FormControl(this.contracts.product.price),
      endDate : new FormControl(this.contracts.endDate),
    });
  }

  getNewForm() {
    this.reactiveForm = new FormGroup({
      selectedName : new FormControl(''),
      selectedNames : new FormControl(''),
      totalPrice : new FormControl(''),
      endDate : new FormControl(''),
    });
  }
/// customer
  selectItem(item: any) {
    this.selectedName = item.name;
    console.log('Selected name:', this.selectedName);
  }


  ////product
  name: string[] = [];
  selectedNames: string[] = [];
  totalPrice: number = 0;

  toggleName(name: string) {
    if (this.selectedNames.includes(name)) {
      this.selectedNames = this.selectedNames.filter(n => n !== name);
    } else {
      this.selectedNames.push(name);
    }

    this.calculateTotal();
  }

  calculateTotal(): number {
    let totalPrice = 0;

    for (let selectedName of this.selectedNames) {
      const product = this.products.find(p => p.name === selectedName);
      if (product) {
        totalPrice += product.price + (product.price*10/100);
      }
    }

    return totalPrice;
  }

}
