import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignComponent } from './design/design.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'design'
  },
  {
    path: 'design',
    component: DesignComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
