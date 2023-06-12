import {Component, HostListener, OnInit} from '@angular/core';
<<<<<<< HEAD
import {ProductServiceService} from "../../../../service/product-service.service";
import {CategoryServiceService} from "../../../../service/category-service.service";
import {Category} from "../../../../models/category/Category";
import Swal from "sweetalert2";
=======
import {ProductServiceService} from '../../../../service/product-service.service';
import {CategoryServiceService} from '../../../../service/category-service.service';
import {Category} from '../../../../models/category/Category';
import Swal from 'sweetalert2';
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

<<<<<<< HEAD
  contracts: any
  categories: Category[] = []
  page: number = 0;
  totalPages: number[] = [];
  totalPage: number = 0;
  nameCustomer: string = "";
  categoryName: string = "";
  currentPage: number = 0;
  isSearchFormActive: boolean = false;
=======
  contracts: any;
  categories: Category[] = [];
  page = 0;
  totalPages: number[] = [];
  totalPage = 0;
  nameCustomer = '';
  categoryName = '';
  currentPage = 0;
  isSearchFormActive = false;
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02

  constructor(private productService: ProductServiceService, private categoryService: CategoryServiceService) {
  }

  getAllProduct() {
<<<<<<< HEAD
    this.productService.getContractNotPay("", "", 0).subscribe(next => {
      this.contracts = next.content;
      this.totalPage = next.totalPages
      this.currentPage = next.number
      for (let j = 0; j < this.totalPage; j++) {
        this.totalPages.push(j)
      }
      console.log(next);
      console.log(this.contracts)
      console.log(this.totalPages)
      console.log('currentPage', this.currentPage)
    })
=======
    this.productService.getContractNotPay('', '', 0).subscribe(next => {
      this.contracts = next.content;
      this.totalPage = next.totalPages;
      this.currentPage = next.number;
      for (let j = 0; j < this.totalPage; j++) {
        this.totalPages.push(j);
      }
      console.log(next);
      console.log(this.contracts);
      console.log(this.totalPages);
      console.log('currentPage', this.currentPage);
    });
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
  }


  ngOnInit(): void {
<<<<<<< HEAD
    this.getAllCategory()
    this.getAllProduct()
=======
    this.getAllCategory();
    this.getAllProduct();
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
  }


  getAllCategory() {
    this.categoryService.findAll().subscribe(next => {
<<<<<<< HEAD
      this.categories = next
      console.log(this.categories)
    })
=======
      this.categories = next;
      console.log(this.categories);
    });
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
  }

  search(nameCustomer: string, categoryName: string) {
    const specialCharPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    this.nameCustomer = nameCustomer;
    this.categoryName = categoryName;
<<<<<<< HEAD
    console.log(nameCustomer, categoryName)
    this.page = 0
=======
    console.log(nameCustomer, categoryName);
    this.page = 0;
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
    if (specialCharPattern.test(this.nameCustomer) || this.nameCustomer.length > 24) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Chuổi không được chứa kí tự đặc biệt và lớn hơn 24 kí',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000  // Adjust the duration of the alert (in milliseconds) as needed
      });
    } else {
      // @ts-ignore
      this.productService.getContractNotPay(this.nameCustomer, this.categoryName, this.page).subscribe(next => {
<<<<<<< HEAD
        console.log(next)
        this.contracts = next.content;
        this.totalPage = next.totalPages;
        this.currentPage = next.number
        this.totalPages = []
        console.log('currentPage', this.currentPage)
        for (let j = 0; j < this.totalPage; j++) {
          this.totalPages.push(j)
        }
        console.log(this.totalPages)
        console.log(this.contracts)

      })
=======
        console.log(next);
        this.contracts = next.content;
        this.totalPage = next.totalPages;
        this.currentPage = next.number;
        this.totalPages = [];
        console.log('currentPage', this.currentPage);
        for (let j = 0; j < this.totalPage; j++) {
          this.totalPages.push(j);
        }
        console.log(this.totalPages);
        console.log(this.contracts);

      });
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
    }
  }

  nextPage() {
    // @ts-ignore
<<<<<<< HEAD
    this.page++
    // @ts-ignoretự
    this.productService.getContractNotPay(this.nameCustomer, this.categoryName, this.page).subscribe(next => {
      this.contracts = next.content;
      this.currentPage = next.number
      console.log(this.page)
    })
  }

  previousPage() {
    this.page--
    this.productService.getContractNotPay(this.nameCustomer, this.categoryName, this.page).subscribe(next => {
      this.contracts = next.content;
      this.currentPage = next.number
    })
=======
    this.page++;
    // @ts-ignoretự
    this.productService.getContractNotPay(this.nameCustomer, this.categoryName, this.page).subscribe(next => {
      this.contracts = next.content;
      this.currentPage = next.number;
      console.log(this.page);
    });
  }

  previousPage() {
    this.page--;
    this.productService.getContractNotPay(this.nameCustomer, this.categoryName, this.page).subscribe(next => {
      this.contracts = next.content;
      this.currentPage = next.number;
    });
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02

  }


  accessPage(page: number) {
<<<<<<< HEAD
    this.page = page
    this.productService.getContractNotPay(this.nameCustomer, this.categoryName, page).subscribe(next => {
      this.contracts = next.content;
      this.currentPage = next.number
    })
=======
    this.page = page;
    this.productService.getContractNotPay(this.nameCustomer, this.categoryName, page).subscribe(next => {
      this.contracts = next.content;
      this.currentPage = next.number;
    });
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02

  }

  toggleFormSearch($event: MouseEvent) {
    event.stopPropagation();
    this.isSearchFormActive = !this.isSearchFormActive;
<<<<<<< HEAD
  };

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    const formSearchElement = document.querySelector(".form-search");
    const searchBoxElement = document.querySelector(".searchBox");
=======
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const formSearchElement = document.querySelector('.form-search');
    const searchBoxElement = document.querySelector('.searchBox');
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
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

}
