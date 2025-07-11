import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignComponent } from './design/design.component';
import { CustomersComponent } from './customers/customers.component';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'table'
  },
  {
    path: 'design',
    component: DesignComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'table',
    component: TableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
