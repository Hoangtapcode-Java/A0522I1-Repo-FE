import { Component, OnInit } from '@angular/core';
import {StatusService} from "../../../service/status.service";
import {ContractService} from "../../../service/contract.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Contract} from "../../../models/contract/Contract";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Status} from "../../../models/status/Status";
import {Customer} from "../../../models/customer/Customer";
import {Category} from "../../../models/category/Category";
import {Product} from "../../../models/product/Product";
import {CategoryServiceService} from "../../../service/category-service.service";
import {ProductServiceService} from "../../../service/product-service.service";
import {CustomerServiceService} from "../../../service/customer-service.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  contract: Contract;
  contractEdit: Contract;
  editContractForm: FormGroup;
  statuses: Status[] = [];
  customers: Customer[] = [];
  categories: Category[] = [];
  products: Product[] = [];

  constructor(private statusService: StatusService, private contractService: ContractService,
              private categoryService: CategoryServiceService, private productService: ProductServiceService,
              private customerService: CustomerServiceService, private activatedRoute: ActivatedRoute, private router: Router ) {
    this.activatedRoute.paramMap.subscribe(next=> {
      const id = next.get('id');
      if (id != null) {
        this.contractService.findById(parseInt(id)).subscribe(next=> {
            this.contract = next;
            this.getFormEdit();
        })
      }
    })
  }

  ngOnInit(): void {
    this.findAllCustomer();
    this.findAllCategory();
    this.findAllProduct();
    this.findAllStatus();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }


  private getFormEdit() {
    this.editContractForm = new FormGroup({
      id: new FormControl(this.contract.id),
      contractCode: new FormControl(this.contract.contractCode),
      beginDate: new FormControl(this.contract.beginDate, [Validators.required]),
      endDate: new FormControl(this.contract.endDate, [Validators.required]),
      customer: new FormControl(this.contract.customer, [Validators.required]),
      employee: new FormControl(this.contract.employee),
      status: new FormControl(this.contract.status, [Validators.required]),
      interest: new FormControl(this.contract.interest),
      product: new FormControl(this.contract.product, [Validators.required]),
      isFlag: new FormControl((false))
    });
  }

  editContract() {
    this.contractEdit = this.editContractForm.value;
    console.log("Start edit")
    console.log(this.contractEdit);
    this.contractService.editContract(this.contractEdit).subscribe(next => {
      this.router.navigateByUrl('/contract');
      console.log("Success")
    }, error => {
      console.log(error);
    });
  }

  private findAllCustomer() {

  }

  private findAllCategory() {

  }

  private findAllProduct() {

  }

  private findAllStatus() {
    this.statusService.findAll().subscribe(next => {
      this.statuses = next;
    })
  }
}
