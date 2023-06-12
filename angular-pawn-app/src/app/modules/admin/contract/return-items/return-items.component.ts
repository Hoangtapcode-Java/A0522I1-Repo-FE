import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContractService} from '../../../../service/contract.service';
import {Contract} from '../../../../models/contract/Contract';



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
  totalPage = 0;
  nameCustomer = '';
  nameProduct = '';
  contractCode = '';
  dateBegin = '';
  reactiveForm: FormGroup;
  currentPage: number;
  dateReset: string;
  beginDate = '';
  endDate = '';

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

  constructor(private contractService: ContractService, private route: Router) {
  }

  ngOnInit(): void {
    this.contractService.getAll().subscribe(next => {
      console.log(next);
      if (next.content != null) {
        this.contract = next.content;
        this.currentPage = next.number;
        this.totalPage = next.totalPages;
        console.log(this.currentPage);
      }
      this.getNewForm();
    });
  }

  getSearch(nameProduct: string, nameCustomer: string, dateBegin: string, contractCode: string, pageNumber: number = 0) {
    this.contractService.getAll(pageNumber, nameCustomer, nameProduct, dateBegin, contractCode).subscribe(next => {
      if (next.content != null) {
        this.contract = next.content;
        this.currentPage = pageNumber;
        this.totalPage = next.totalPages;
        console.log(this.currentPage);
      }
    });
  }
  formatDate(date: any): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate.toString();
  }
  convertDate(date: any): string {
    const array: [] = date.split('-');
    // @ts-ignore
    const dateConvert = array[2] + '/' + array[1] + '/' + array[0];
    return dateConvert;
  }

  selectContract(id: number) {
    this.contractService.getById(id).subscribe(next => {
      console.log(next);
      this.contracts = next;
      if (this.contracts.status.id !== 3) {
        this.payment = this.contracts.product.price * this.contracts.interest;
        this.price = this.contracts.product.price;
        const defaultDate = new Date(Date.now());
        this.dateReset = this.formatDate(defaultDate);
        this.getForm();
        this.beginDate = this.convertDate(this.contracts.beginDate);
        this.endDate = this.convertDate(this.contracts.endDate);
      } else {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Hợp đồng này đã được thanh toán',
          icon: 'error',
          confirmButtonText: 'Đồng ý'
        });
        this.ngOnInit();
      }
    });
  }

  update() {
    // console.log(this.reactiveForm.value);
    // console.log(this.reactiveForm.valid);
    if (this.reactiveForm.valid) {
      this.contractService.updateById(this.reactiveForm.value, this.reactiveForm.value.id).subscribe(next => {
        this.getNewForm();
        // tslint:disable-next-line:max-line-length
        this.contractService.getAll(this.currentPage, this.nameCustomer, this.nameProduct, this.dateBegin, this.contractCode).subscribe(next => {
          if (next.content != null) {
            this.contract = next.content;
          }
        });
      });
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
      Swal.fire({
        title: 'Lỗi!',
        text: 'Vui lòng chọn hợp đồng trước khi thanh toán',
        icon: 'error',
        confirmButtonText: 'Đồng ý'
      });
      this.ngOnInit();
    }
  }

  getForm() {
    this.reactiveForm = new FormGroup({
      id: new FormControl(this.contracts.id),
      contractCode: new FormControl(this.contracts.contractCode),
      // beginDate: new FormControl(this.contracts.beginDate),
      // endDate: new FormControl(this.contracts.endDate),
      customer: new FormControl(this.contracts.customer.name),
      interest: new FormControl(this.contracts.interest),
      product: new FormControl(this.contracts.product.name)
    });
  }

  getNewForm() {
    this.reactiveForm = new FormGroup({
      id: new FormControl(),
      contractCode: new FormControl('', [Validators.required]),
      // beginDate: new FormControl('', [Validators.required]),
      // endDate: new FormControl('', [Validators.required]),
      customer: new FormControl('', [Validators.required]),
      interest: new FormControl('', [Validators.required]),
      product: new FormControl('', [Validators.required])
    });
    this.price = null;
    this.payment = null;
    this.dateReset = '';
    this.endDate = '';
    this.beginDate = '';
  }

  goToNextOrPreviousPage(
    nameProduct: string, nameCustomer: string, dateBegin: string, contractCode: string, direction?: string,
  ): void {
    console.log('currentPage: ' + this.currentPage);
    this.getSearch(nameProduct, nameCustomer, dateBegin, contractCode,
      direction === 'backward' ? this.currentPage + 1
        : this.currentPage - 1
    );
  }

  reset() {
    this.ngOnInit();
  }
}
