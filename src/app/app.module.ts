import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewemployeeComponent } from './employee/forms/newemployee/newemployee.component';
import { ViewemployeeComponent } from './employee/forms/viewemployee/viewemployee.component';
import { NewdepartmentComponent } from './department/forms/newdepartment/newdepartment.component';
import { ViewdepartmentComponent } from './department/forms/viewdepartment/viewdepartment.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    NewemployeeComponent,
    ViewemployeeComponent,
    NewdepartmentComponent,
    ViewdepartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
