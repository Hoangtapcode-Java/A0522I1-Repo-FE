import { Component, OnInit } from '@angular/core';
import {StatusService} from '../../../service/status.service';
import {ContractService} from '../../../service/contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Status} from '../../../models/status/Status';
import {Category} from '../../../models/category/Category';
import {CategoryServiceService} from '../../../service/category-service.service';
import {ProductServiceService} from '../../../service/product-service.service';
import {CustomerServiceService} from '../../../service/customer-service.service';
import {ContractEditDto} from "../../../dto/ContractEditDto";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  regexName: string = "^[a-zA-ZÀ-ỹ]+([ ][a-zA-ZÀ-ỹ]+)*$";
  contract: ContractEditDto;
  contractEdit: ContractEditDto;
  editContractForm: FormGroup;
  statuses: Status[] = [];
  categories: Category[] = [];

  constructor(private statusService: StatusService, private contractService: ContractService,
              private categoryService: CategoryServiceService, private productService: ProductServiceService,
              private customerService: CustomerServiceService, private activatedRoute: ActivatedRoute, private router: Router ) {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        this.contractService.findById(parseInt(id)).subscribe(next => {
          this.contract = next;
        },error => {},() => {

          this.getFormEdit();
        });
      }
    });
  }

  ngOnInit(): void {
    this.findAllCategory();
    this.findAllStatus();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }


  private getFormEdit() {
    this.editContractForm = new FormGroup({
      id: new FormControl(this.contract.id),
      contractCode: new FormControl(this.contract.contractCode),
      customerName: new FormControl(this.contract.customerName, [Validators.required, Validators.minLength(3), Validators.pattern(this.regexName)]),
      customerId: new FormControl(this.contract.customerId),
      productName: new FormControl(this.contract.productName, [Validators.required]),
      productId: new FormControl(this.contract.productId),
      category: new FormControl(this.contract.category),
      beginDate: new FormControl(this.contract.beginDate, [Validators.required]),
      endDate: new FormControl(this.contract.endDate, [Validators.required]),
      status: new FormControl(this.contract.status)
    }, [ this.checkEndDate]);
  }



  editContract() {
    if (this.editContractForm.valid) {
      this.contractEdit = this.editContractForm.value;
      this.contractService.editContract(this.contractEdit).subscribe(next => {
        this.router.navigateByUrl('/contract');
      }, error => {
        console.log(error);
      });
    } else {
      console.log("Invalid")
    }
  }

  private findAllCategory() {
    this.categoryService.findAll().subscribe(next => {
      this.categories = next;
    });
  }

  private findAllStatus() {
    this.statusService.findAll().subscribe(next => {
      this.statuses = next;
    });
  }

  checkEndDate(control: any): any {
    let beginDate = control.controls.beginDate.value;
    let endDate = control.controls.endDate.value;
    return endDate > beginDate ? null : {endDateInvalid: true}
  }
}
