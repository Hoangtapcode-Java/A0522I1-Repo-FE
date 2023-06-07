import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinaceRoutingModule } from './finace-routing.module';
import { GetFinaceComponent } from './get-finace/get-finace.component';


@NgModule({
  declarations: [ GetFinaceComponent],
  imports: [
    CommonModule,
    FinaceRoutingModule
  ]
})
export class FinaceModule { }
