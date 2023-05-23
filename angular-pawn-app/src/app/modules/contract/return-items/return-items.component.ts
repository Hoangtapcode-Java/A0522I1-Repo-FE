import {Component, HostListener, OnInit} from '@angular/core';
import {ContractServiceService} from '../../../service/contract-service.service';
import {Contract} from '../../../models/contract/Contract';

@Component({
  selector: 'app-return-items',
  templateUrl: './return-items.component.html',
  styleUrls: ['./return-items.component.css']
})
export class ReturnItemsComponent implements OnInit {
  isSearchFormActive = false;
  contract: Contract[] = [];
  page = 0;
  nameCustomer = '';
  nameProduct = '';
  contractCode = '';
  dateBegin = '';
  totalPage: number;

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

  constructor(private contractService: ContractServiceService) {
    this.contractService.getAll(this.page, this.nameCustomer, this.nameProduct, this.dateBegin, this.contractCode).subscribe(next => {
      this.contract = next.content;
    });
  }

  ngOnInit(): void {
  }

  getSearch(nameProduct: string, nameCustomer: string, beginDate: string, contractCode: string) {
    this.contractService.getAll(this.page, nameCustomer, nameProduct, beginDate, contractCode).subscribe(next => {
      this.contract = next.content;
    });
  }
}
