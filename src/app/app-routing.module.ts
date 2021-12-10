import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { NewdepartmentComponent } from './department/forms/newdepartment/newdepartment.component';
import { ViewdepartmentComponent } from './department/forms/viewdepartment/viewdepartment.component';
import { NewemployeeComponent } from './employee/forms/newemployee/newemployee.component';
import { ViewemployeeComponent } from './employee/forms/viewemployee/viewemployee.component';

const routes: Route[] = [
  {path: 'newemployee', component:NewemployeeComponent},
  {path: 'viewemployee', component:ViewemployeeComponent},
  {path: 'newdepartment', component:NewdepartmentComponent},
  {path: 'viewdepartment', component:ViewdepartmentComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
