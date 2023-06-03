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
  totalPages: number[] = [];
  totalPage: number = 0;
  page: number = 0;
  p = 4;
  idCustomer: number = 0;
  mess: string;
  totalElement = 0;
  contracts: Contract;
  reactiveForm: FormGroup;
  listIdProduct: number[] = [];

  product = '';
  customer = '';
  endDate = '';
  customers: Customer[] = [];
  selectedName: string;
  products: Product[];
  contract: Contract [];
  id: number;
  name = '';
  identityCard = '';
  status: Status[];
  nameCategory = '';
  categorys : Category [];

  toggleFormSearch(event: MouseEvent): void {
    event.stopPropagation();
    this.isSearchFormActive = !this.isSearchFormActive;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    const formSearchElement = document.querySelector(".form-search");
    const searchBoxElement = document.querySelector(".searchBox");
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

  constructor(private contractServiceService: ContractServiceService, private customerServiceService: CustomerServiceService,
              private productServiceService: ProductServiceService) {
    customerServiceService.getAllCustomer(this.page, this.id, this.name, this.identityCard).subscribe(next => {
      if (next.content != null) {
        this.customers = next.content;
        this.totalPage = next.totalPages;
        for (let j = 0; j < this.totalPage; j++) {
          this.totalPages.push(j);
        }
      }
    })
  }

  ngOnInit(): void {

  }

  update() {
    if (this.listIdProduct.length > 0) {
      for (let i = 0; i < this.listIdProduct.length; i++) {
        this.contractServiceService.updateContract(this.contracts, this.listIdProduct[i]).subscribe();
      }
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
        title: 'Thanh Lý thành công'
      });
      return this.resetForm();
    } else {
      Swal.fire({
        title: 'Vui lòng chọn khách hàng và chọn đồ thanh lý',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
    return this.resetForm();
  }


/// customer
  selectItem(customer: Customer) {
    this.selectedName = customer.name;
    this.idCustomer = customer.id;
    this.productServiceService.getProductByCustomer(customer.id).subscribe(next => {
      console.log(next)
      this.products = next;
    });
    const dateField = document.getElementById('ngay-thanh-ly') as HTMLInputElement;
    const defaultDate = new Date(Date.now());
    const year = defaultDate.getFullYear();
    const month = String(defaultDate.getMonth() + 1).padStart(2, '0');
    const day = String(defaultDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    dateField.value = formattedDate;
  }


  ////product
  selectedNames: string[] = [];
  totalPrice: number = 0;

  toggleName(name: string, productId: any) {
    if (this.selectedNames.includes(name)) {
      this.selectedNames = this.selectedNames.filter(n => n !== name);
    } else {
      this.selectedNames.push(name);
      this.listIdProduct.push(productId);
    }

    this.calculateTotal();
  }

  calculateTotal(): number {
    let totalPrice = 0;

    for (let selectedName of this.selectedNames) {
      const product = this.products.find(p => p.name === selectedName);
      if (product) {
        totalPrice += product.price + (product.price * 10 / 100);
      }
    }

    return totalPrice;
  }

  //// customer phan trang
  isSearchFormActive = false;

  nextPage() {
    // @ts-ignore
    this.page++;
    // @ts-ignore
    this.customerServiceService.getAllCustomer(this.page, this.id, this.name, this.identityCard).subscribe(next => {
      this.customers = next.content;
      console.log(this.page);
    });
  }

  previousPage() {
    this.page--;
    this.customerServiceService.getAllCustomer(this.page, this.id, this.name, this.identityCard).subscribe(next => {
      this.customers = next.content;
    });
  }

  accessPage(page: number) {
    this.page = page;
    this.customerServiceService.getAllCustomer(this.page, this.id, this.name, this.identityCard).subscribe(next => {
      this.customers = next.content;
    });
  }

  getSearch(name: string) {
    this.page = 0;

      this.customerServiceService.getSearch(name).subscribe(next => {
        console.log(next);
        this.customers = next.content;
        this.totalPage = next.totalPages;
        this.totalPages = [];
        for (let j = 0; j < this.totalPage; j++) {
          this.totalPages.push(j);
        }
      });
  }

  getSearch1(name : string, price : number , nameCategory : string) {
    this.productServiceService.getSearch1(this.idCustomer,name, price, nameCategory).subscribe(next => {
      console.log(next)
      this.products = next;
    });
  }

  resetForm() {
    this.selectedName = '';
    this.customers = [];
    this.selectedNames = [];
    this.products = [];
    this.totalPrice = 0;
  }


}
