import {Component, HostListener, OnInit} from '@angular/core';
import {Product} from "../../../models/Product";
import {ProductServiceService} from "../../../service/product-service.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // p = 2;
  // mess: string;
  page =0;
  totalPage=0;
  totalElement=0;
  products : Product []=[];

  constructor(private productServiceService : ProductServiceService) {

  }




  ngOnInit(): void {
    this.productServiceService.getAllProduct().subscribe(next =>{
      console.log(next)
      this.products = next.content;
      this.page = next.number;
      this.totalPage= next.totalPage;
      this.totalElement = next.totalElement;
    });
  }


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
  isSearchFormActive: boolean = false;
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


