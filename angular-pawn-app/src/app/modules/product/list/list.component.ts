import {Component, HostListener, OnInit} from '@angular/core';
import {ProductServiceService} from "../../../service/product-service.service";

import {ImageServiceService} from "../../../service/image-service.service";
import {CategoryServiceService} from "../../../service/category-service.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Contract} from "../../../models/contract/Contract";
import {Category} from "../../../models/category/Category";
import {Image} from "../../../models/image/Image";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contracts: Contract[] = [];
  categorys: Category[] = []
  page: number = 0;
  imgs: Image[] = [];
  totalPages: number[] = [];
  totalPage: number;
  nameCustomer : string = "";
  categoryId : string = "";
  isSearchFormActive: boolean = false;
  constructor(private productService: ProductServiceService, private imgService: ImageServiceService, private categoryService: CategoryServiceService) {

  }

  getAllProduct() {
    this.productService.getContractNotPay("", "", 0).subscribe(next => {
      this.contracts = next;
      console.log(this.contracts)
      console.log(this.totalPages)
    })
  }


  getAllImg() {
    this.imgService.getAllImg().subscribe(next => {
      this.imgs = next
    })
  }



  ngOnInit(): void {
    this.getAllImg()
    this.getAllCategory()
    this.getAllProduct()
    this.getTotalPage();

  }

 

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(next => {
      this.categorys = next
    })
  }

  search(nameCustomer :string,categoryId : string) {
    this.nameCustomer = nameCustomer;
    this.categoryId = categoryId
    console.log(nameCustomer,categoryId)
    // @ts-ignore
    this.productService.getContractNotPay(this.nameCustomer, this.categoryId, 0).subscribe(next => {
      this.contracts = next;
    })
  }

  nextPage() {
    // @ts-ignore
    this.page++
    // @ts-ignore
    this.productService.getContractNotPay(this.nameCustomer, this.categoryId, this.page).subscribe(next => {
      this.contracts = next;
    })
  }

  previousPage() {
    this.page--
    this.productService.getContractNotPay(this.nameCustomer, this.categoryId, this.page).subscribe(next => {
      this.contracts = next;
    })

  }


  accessPage(page: number) {
    this.page = page
    this.productService.getContractNotPay(this.nameCustomer, this.categoryId, page).subscribe(next => {
      this.contracts = next;
    })

  }
  getTotalPage() {
    this.productService.getTotalPage("","").subscribe(next => {
      // @ts-ignore
      this.totalPage = next
      for (let j = 0; j < this.totalPage; j++) {
        this.totalPages.push(j)
      }
      console.log(this.totalPages)
      console.log(this.totalPage)
    })
  }

  toggleFormSearch($event: MouseEvent) {
    event.stopPropagation();
    this.isSearchFormActive = !this.isSearchFormActive;
  };
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
}
