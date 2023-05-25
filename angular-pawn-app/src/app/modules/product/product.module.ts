import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [ProductComponent, CreateComponent, ListComponent, UpdateComponent, DeleteComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        FormsModule,
        NgxPaginationModule
    ]
})
export class ProductModule { }
