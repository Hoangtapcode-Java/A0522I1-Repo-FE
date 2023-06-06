import {Component, HostListener, OnInit} from '@angular/core';
import {Contract} from "../../../../models/contract/Contract";
import {Status} from "../../../../models/status/Status";
import {ContractService} from "../../../../service/contract.service";
import {StatusService} from "../../../../service/status.service";
import {Title} from "@angular/platform-browser";

declare const Swal: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  customerName: string = '';
  productName: string = '';
  beforeDate: string = '';
  afterDate: string = '';
  statusSearch: string = '';
  isSearchFormActive: boolean = false;
  isSearch: boolean = false;

  toggleFormSearch(event: MouseEvent): void {
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
  };

  page: number = 0;
  totalPage: number[] = [];
  totalElement: number = 0;
  contracts: Contract[];
  statuses: Status[];

  constructor(private contractService: ContractService, private statusService: StatusService,private title:Title) {

  }

  ngOnInit(): void {
    this.findAllContract();
    this.findAllStatus();
    this.title.setTitle("Danh sách hợp đồng")
  }

  findAllContract() {
    this.contractService.findAll(0).subscribe(next => {
      this.contracts = next.content;
      this.page = next.number;
      this.totalElement = next.totalElement;
      this.totalPage =[];
      for (let i = 0; i < next.totalPages; i++) {
        this.totalPage.push(i);
      }
      this.isSearch = false;
    });

  }

  findAllStatus() {
    this.statusService.findAll().subscribe(next => {
      this.statuses = next;
    })
  }

  searchContract(customerName: string, productName: string, beforeDate: string, afterDate: string, status: string, page: number) {
    this.setValueKeySearch(customerName,productName,beforeDate,afterDate,status);
    this.contractService.searchContract(customerName, productName, beforeDate, afterDate, status, page).subscribe(next => {
      this.contracts = next.content;
      this.page = next.number;
      this.totalElement = next.totalElement;
      this.isSearch = true;
      this.totalPage =[];
      for (let i = 0; i < next.totalPages; i++) {
        this.totalPage.push(i);
      }
    });
  }

  searchContractPage(customerName: string, productName: string, beforeDate: string, afterDate: string, status: string, page: number) {
    this.contractService.searchContract(customerName, productName, beforeDate, afterDate, status, page).subscribe(next => {
      this.contracts = next.content;
      this.page = next.number;
      this.totalElement = next.totalElement;
      this.isSearch = true;
    });
  }

  setValueKeySearch(customerName: string, productName: string, beforeDate: string, afterDate: string, status: string) {
    this.customerName = customerName;
    this.productName = productName;
    this.afterDate = afterDate;
    this.beforeDate = beforeDate;
    this.statusSearch = status;
  }

  deleteContractById(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn swal2-confirm btn-customer-switch",
        cancelButton: "btn swal2-cancel btn-customer-switch",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Bạn có chắc muốn xoá hợp đồng?",
        text: "Không thể khôi phục nếu xoá!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Huỷ!",
        reverseButtons: false,
      })
      .then((result) => {
        console.log(result);
        if (result.value) {
          this.contractService.deleteContract(id).subscribe(() => {
            this.findAllContract();
          });

          Swal.fire("Đã Xóa!", "Trường này đã bị loại bỏ.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Đã hủy!", "Trường này vẫn an toàn.", "error");
        }
      });
  };

  nextPage() {
    this.page++;
    if (this.isSearch) {
      this.searchContractPage(this.customerName, this.productName, this.beforeDate, this.afterDate, this.statusSearch, this.page);
    } else {
      this.contractService.findAll(this.page).subscribe(next => {
        this.contracts = next.content;
      })
    }
  }


  previousPage() {
    this.page--;
    if (this.isSearch) {
      this.searchContractPage(this.customerName, this.productName, this.beforeDate, this.afterDate, this.statusSearch, this.page);
    } else {
      this.contractService.findAll(this.page).subscribe(next => {
        this.contracts = next.content;
      })
    }
  }


  accessPage(page: number) {
    this.page = page
    if (this.isSearch) {
      this.searchContractPage(this.customerName, this.productName, this.beforeDate, this.afterDate, this.statusSearch, this.page);
    } else {
      this.contractService.findAll(page).subscribe(next => {
        this.contracts = next.content;
      })
    }
  }
}
