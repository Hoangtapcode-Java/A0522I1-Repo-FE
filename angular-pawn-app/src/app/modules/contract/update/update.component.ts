import {Component, OnInit} from '@angular/core';
import {StatusService} from '../../../service/status.service';
import {ContractService} from '../../../service/contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Contract} from '../../../models/contract/Contract';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Status} from '../../../models/status/Status';
import {Customer} from '../../../models/customer/Customer';
import {Category} from '../../../models/category/Category';
import {Product} from '../../../models/product/Product';
import {CategoryServiceService} from '../../../service/category-service.service';
import {ProductServiceService} from '../../../service/product-service.service';
import {CustomerServiceService} from '../../../service/customer-service.service';
import {ContractEditDto} from '../../../dto/ContractEditDto';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  regexNameProduct: string = '^([a-z]+)((\\s{1}[a-z]+){1,})$';
  regexName = '';
  contract: ContractEditDto;
  contractEdit: ContractEditDto;
  editContractForm: FormGroup;
  statuses: Status[] = [];
  categories: Category[] = [];

  constructor(private statusService: StatusService, private contractService: ContractService,
              private categoryService: CategoryServiceService, private productService: ProductServiceService,
              private customerService: CustomerServiceService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        this.contractService.findById(parseInt(id)).subscribe(next => {
          this.contract = next;
          this.ngOnInit();
        }, error => {
        }, () => {

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
      productName: new FormControl(this.contract.productName, [Validators.required, Validators.pattern(this.regexNameProduct)]),
      productId: new FormControl(this.contract.productId),
      category: new FormControl(this.contract.category),
      beginDate: new FormControl(this.contract.beginDate, [Validators.required]),
      endDate: new FormControl(this.contract.endDate, [Validators.required]),
      status: new FormControl(this.contract.status)
    }, {validators: this.checkEndDate});
  }


  editContract() {
    this.contractEdit = this.editContractForm.value;
    console.log('Start edit');
    console.log(this.contractEdit);
    this.contractService.editContract(this.contractEdit).subscribe(next => {
      this.router.navigateByUrl('/contract');
      console.log('Success');
    }, error => {
      console.log(error);
    });
  }

  private findAllCategory() {
    this.categoryService.findAll().subscribe(next => {
      console.log(next);
      this.categories = next;
    });
  }

  private findAllStatus() {
    this.statusService.findAll().subscribe(next => {
      console.log(next);
      this.statuses = next;
    });
  }

  checkEndDate(control: any): any {
    const beginDate = control.controls.beginDate.value;
    const endDate = control.controls.endDate.value;
    return endDate > beginDate ? null : {invalid: true};
  }
}
