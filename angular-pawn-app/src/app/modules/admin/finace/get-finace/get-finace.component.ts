// @ts-ignore
import { Component, OnInit } from '@angular/core';
import {Finace} from "../../../../models/finace/Finace";
import {FinaceService} from "../../../../service/finace.service";



@Component({
  selector: 'app-get-finace',
  templateUrl: './get-finace.component.html',
  styleUrls: ['./get-finace.component.css']
})
export class GetFinaceComponent implements OnInit {
  finance : Finace
  constructor(private financeService : FinaceService) {
    this.showFinance();
  }
  ngOnInit(): void {

  }
  showFinance(){
    this.financeService.getFinace().subscribe(next=>{
      this.finance = next
    })
  }

}
