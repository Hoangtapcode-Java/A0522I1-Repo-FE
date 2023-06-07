import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';


const routes: Routes = [{
  path: 'admin', component: AdminComponent, children: [
    {
      path: 'article', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
    }, {
      path: 'employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
    }, {
      path: 'contract', loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule)
    }, {
      path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
    }, {
      path: 'finace', loadChildren: () => import('./finace/finace.module').then(m => m.FinaceModule)
    }, {
      path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
