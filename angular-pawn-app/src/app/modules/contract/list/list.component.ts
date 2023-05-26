import {Component, HostListener, OnInit} from '@angular/core';
import {Contract} from "../../../models/contract/Contract";
import {ContractService} from "../../../service/contract.service";
import {StatusService} from "../../../service/status.service";
import {Status} from "../../../models/status/Status";
import {BehaviorSubject} from "rxjs";

// @ts-ignore
declare const Swal: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  isSearchFormActive: boolean = false;
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
  totalPage: number = 0;
  totalElement: number = 0;
  contracts: Contract[];
  statuses: Status[];

  constructor(private contractService: ContractService, private statusService: StatusService) {

  }

  ngOnInit(): void {
    this.findAllContract();
    this.findAllStatus();
  }

  findAllContract() {
    this.contractService.findAll().subscribe(next => {
      this.contracts = next.content;
      this.page = next.number;
      this.totalPage= next.totalPage;
      this.totalElement = next.totalElement;
    });
  }

  findAllStatus() {
    this.statusService.findAll().subscribe(next=> {
      this.statuses = next;
    })
  }

  searchContract(customerName: string, productName: string, beforeDate: string, afterDate: string, status: string) {
    this.contractService.searchContract(customerName, productName, beforeDate, afterDate, status).subscribe(next => {
      console.log(customerName, productName, beforeDate, afterDate, status);
      this.contracts = next.content;
      this.page = next.number;
      this.totalPage= next.totalPage;
      this.totalElement = next.totalElement;
    });
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
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
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
}
