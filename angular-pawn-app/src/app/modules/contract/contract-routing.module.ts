import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ContractComponent} from './contract.component';
import {ListComponent} from './list/list.component';
import {CreateComponent} from './create/create.component';
import {UpdateComponent} from './update/update.component';
import {ReturnItemsComponent} from './return-items/return-items.component';
// @ts-ignore



const routes: Routes = [{
  path: 'contract', component: ContractComponent, children: [
    {
      path: '', component: ListComponent
    },
    {
      path: 'create', component: CreateComponent
    },
    {
      path: 'update', component: UpdateComponent
    },
    {
      path: 'return', component: ReturnItemsComponent
    },
    {
      path: 'update/:id', component: UpdateComponent
    }
  ]
}];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule {
}
