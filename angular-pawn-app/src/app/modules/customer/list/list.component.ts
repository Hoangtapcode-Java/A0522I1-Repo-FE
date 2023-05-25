import { Component, OnInit } from '@angular/core';
import {CustomerServiceService} from "../../../service/customer-service.service";
import {Customer} from "../../../models/Customer";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 page =0;
 totalPage=0;
 totalElement=0;
  customers : Customer[]=[];
  selectedName: string;
  constructor(private customerServiceService : CustomerServiceService) {

  }

  ngOnInit(): void {
    this.customerServiceService.getAllCustomer().subscribe(next =>{
      console.log(next)
      this.customers = next.content;
      this.page = next.number;
      this.totalPage= next.totalPage;
      this.totalElement = next.totalElement;
    });
  }
  selectItem(item: any) {
    this.selectedName = item.name;
    console.log('Selected name:', this.selectedName);
  }

}
