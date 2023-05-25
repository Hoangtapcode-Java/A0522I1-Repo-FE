import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ArticleModule} from "./modules/article/article.module";
import {CategoryModule} from "./modules/category/category.module";
import {ContractModule} from "./modules/contract/contract.module";
import {CustomerModule} from "./modules/customer/customer.module";
import {EmployeeModule} from "./modules/employee/employee.module";
import {ImageModule} from "./modules/image/image.module";
import {ProductModule} from "./modules/product/product.module";
import {RoleModule} from "./modules/role/role.module";
import {StatusModule} from "./modules/status/status.module";
import {UserModule} from "./modules/user/user.module";
import {UserHasRoleModule} from "./modules/user-has-role/user-has-role.module";
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ArticleModule,
    CategoryModule,
    ContractModule,
    CustomerModule,
    EmployeeModule,
    ImageModule,
    ProductModule,
    RoleModule,
    StatusModule,
    UserModule,UserHasRoleModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
