import {Component, HostListener, OnInit} from '@angular/core';
import {ContractServiceService} from '../../../service/contract-service.service';
import {Contract} from '../../../models/contract/Contract';
import {formatDate} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {convertUpdateArguments} from '@angular/compiler/src/compiler_util/expression_converter';

declare const Swal: any;

@Component({
  selector: 'app-return-items',
  templateUrl: './return-items.component.html',
  styleUrls: ['./return-items.component.css']
})
export class ReturnItemsComponent implements OnInit {
  isSearchFormActive = false;
  contract: Contract[] = [];
  contracts: Contract;
  payment: number;
  price: number;
  page = 0;
  totalPages: number[] = [];
  totalPage = 0;
  nameCustomer = '';
  nameProduct = '';
  contractCode = '';
  dateBegin = '';
  showErrors = false;
  reactiveForm: FormGroup;

  toggleFormSearch(event: MouseEvent): void {
    event.stopPropagation();
    this.isSearchFormActive = !this.isSearchFormActive;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const formSearchElement = document.querySelector('.form-search');
    const searchBoxElement = document.querySelector('.searchBox');
    const isOutsideFormSearch =
      formSearchElement &&
      !formSearchElement.contains(event.target as HTMLElement);
    const isInsideSearchBox =
      searchBoxElement &&
      searchBoxElement.contains(event.target as HTMLElement);
    if (this.isSearchFormActive && isOutsideFormSearch && !isInsideSearchBox) {
      this.isSearchFormActive = false;
    }
  }

  constructor(private contractService: ContractServiceService, private route: Router) {
    this.contractService.getAll(this.page, this.nameCustomer, this.nameProduct, this.dateBegin, this.contractCode).subscribe(next => {
      if (next.content != null) {
        this.contract = next.content;
        this.totalPage = next.totalPages;
        for (let j = 0; j < this.totalPage; j++) {
          this.totalPages.push(j);
        }
      }
      this.getNewForm();
    });
  }

  ngOnInit(): void {
    // this.contractService.getAll(this.page, this.nameCustomer, this.nameProduct, this.dateBegin, this.contractCode).subscribe(next => {
    //   if (next.content != null) {
    //     this.contract = next.content;
    //     this.totalPage = next.totalPages;
    //     for (let j = 0; j < this.totalPage; j++) {
    //       this.totalPages.push(j);
    //     }
    //   }
    //   this.getNewForm();
    // });
  }

  getSearch(nameProduct: string, nameCustomer: string, dateBegin: string, contractCode: string) {
    console.log(dateBegin);
    this.page = 0;
    this.contractService.getAll(this.page, nameCustomer, nameProduct, dateBegin, contractCode).subscribe(next => {
      if (next.content != null) {
        this.contract = next.content;
        this.totalPage = next.totalPages;
        this.totalPages = [];
        console.log(this.totalPage);
        for (let j = 0; j < this.totalPage; j++) {
          this.totalPages.push(j);
        }
      }
    });
  }

  selectContract(id: number) {
    this.contractService.getById(id).subscribe(next => {
      console.log(next);
      this.contracts = next;
      if (this.contracts.status.id != 3) {
        this.payment = this.contracts.product.price * this.contracts.interest;
        this.price = this.contracts.product.price;
        const dateField = document.getElementById('inputDateReturn') as HTMLInputElement;
        const defaultDate = new Date(Date.now());
        const year = defaultDate.getFullYear();
        const month = String(defaultDate.getMonth() + 1).padStart(2, '0');
        const day = String(defaultDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        dateField.value = formattedDate;
        this.getForm();
      } else {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Hợp đồng này đã được thanh toán',
          icon: 'error',
          confirmButtonText: 'Đồng ý'
        });
        // this.page = 0;
        // this.contractService.getAll(this.page, this.nameCustomer, this.nameProduct, this.dateBegin, this.contractCode).subscribe(next => {
        //   if (next.content != null) {
        //     this.contract = next.content;
        //     // this.totalPage = next.totalPages;
        //   }
        // });
      }
    });
  }

  update() {
    console.log(this.reactiveForm.value);
    console.log(this.reactiveForm.valid);
    if (this.reactiveForm.valid) {
      this.contractService.updateById(this.reactiveForm.value, this.reactiveForm.value.id).subscribe(next => {
        this.getNewForm();
        this.contractService.getAll(this.page, this.nameCustomer, this.nameProduct, this.dateBegin, this.contractCode).subscribe(next => {
          if (next.content != null) {
            this.contract = next.content;
          }
        });
      });
      this.showErrors = false;
      console.log(this.showErrors);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Thanh toán thành công! Vui lòng kiểm tra email'
      });
    } else {
      this.showErrors = true;
      Swal.fire({
        title: 'Lỗi!',
        text: 'Vui lòng chọn hợp đồng trước khi thanh toán',
        icon: 'error',
        confirmButtonText: 'Đồng ý'
      });
      console.log(this.showErrors);
    }
  }

  getForm() {
    this.reactiveForm = new FormGroup({
      id: new FormControl(this.contracts.id),
      contractCode: new FormControl(this.contracts.contractCode),
      beginDate: new FormControl(this.contracts.beginDate),
      endDate: new FormControl(this.contracts.endDate),
      customer: new FormControl(this.contracts.customer.name),
      interest: new FormControl(this.contracts.interest),
      product: new FormControl(this.contracts.product.name)
    });
  }
  getNewForm() {
    this.reactiveForm = new FormGroup({
      id: new FormControl(),
      contractCode: new FormControl('', [Validators.required]),
      beginDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      customer: new FormControl('', [Validators.required]),
      interest: new FormControl('', [Validators.required]),
      product: new FormControl('', [Validators.required])
    });
    this.price = null;
    this.payment = null;
  }

  nextPage() {
    // @ts-ignore
    this.page++;
    // @ts-ignore
    this.contractService.getAll(this.page, this.nameCustomer, this.nameProduct, this.dateBegin, this.contractCode).subscribe(next => {
      this.contract = next.content;
      console.log(this.page);
    });
  }

  previousPage() {
    this.page--;
    this.contractService.getAll(this.page, this.nameCustomer, this.nameProduct, this.dateBegin, this.contractCode).subscribe(next => {
      this.contract = next.content;
    });
  }

  accessPage(page: number) {
    this.page = page;
    this.contractService.getAll(this.page, this.nameCustomer, this.nameProduct, this.dateBegin, this.contractCode).subscribe(next => {
      this.contract = next.content;
    });
  }
}
