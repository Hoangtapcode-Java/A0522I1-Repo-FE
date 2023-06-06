import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinaceRoutingModule } from './finace-routing.module';
import { FinaceComponent } from './finace.component';
import { GetFinaceComponent } from './get-finace/get-finace.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [FinaceComponent, GetFinaceComponent],
  imports: [
    CommonModule,
    FinaceRoutingModule,
    HttpClientModule
  ]
})
export class FinaceModule { }
