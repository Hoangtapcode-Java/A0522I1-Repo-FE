import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContractRoutingModule} from './contract-routing.module';
import {ContractComponent} from './contract.component';
import {CreateComponent} from './create/create.component';
import {ListComponent} from './list/list.component';
import {UpdateComponent} from './update/update.component';
import {DeleteComponent} from './delete/delete.component';
import {ReturnItemsComponent} from './return-items/return-items.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ContractComponent, CreateComponent, ListComponent, UpdateComponent, DeleteComponent, ReturnItemsComponent],
    imports: [
        CommonModule,
        ContractRoutingModule,
        FormsModule
    ]
})
export class ContractModule {
}
