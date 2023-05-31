import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {ContractRoutingModule} from './contract-routing.module';
import {ContractComponent} from './contract.component';
import {CreateComponent} from './create/create.component';
import {ListComponent} from './list/list.component';
import {UpdateComponent} from './update/update.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReturnItemsComponent} from './return-items/return-items.component';


@NgModule({
    declarations: [ContractComponent, CreateComponent, ListComponent, UpdateComponent,ReturnItemsComponent],
    exports: [
        ContractComponent
    ],
    imports: [
        CommonModule,
        ContractRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]

})
export class ContractModule {
}
