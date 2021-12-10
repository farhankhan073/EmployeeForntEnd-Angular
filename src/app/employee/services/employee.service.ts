import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { EmployeeModel } from '../models/employeemodel';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employee: EmployeeModel;
  constructor(private _httpClient: HttpClient) { }

  createEmployee(employee:EmployeeModel) : Observable<EmployeeModel>{
    let _url = "http://localhost:9090/hr/saveemployee";
    return this._httpClient.post<EmployeeModel>(_url,employee).pipe(catchError(this.errorHandler));
  }

  updateEmployee(employee:EmployeeModel) {
    let _url = "http://localhost:9090/hr/updateemployee";
    return this._httpClient.put<EmployeeModel>(_url,employee).pipe(catchError(this.errorHandler));
  }

  deleteEmployee(employee:EmployeeModel) {
    let _url = "http://localhost:9090/hr/deleteemployee"+ "/" + employee.employeeid;
    return this._httpClient.delete<EmployeeModel>(_url).pipe(catchError(this.errorHandler));
  }

  viewEmployee(): Observable<EmployeeModel[]> {
    let _url = "http://localhost:9090/hr/getemployee";
    return this._httpClient.get<EmployeeModel[]>(_url).pipe(catchError(this.errorHandler));

  }

  setUpdateEmployee(employee: EmployeeModel) {

    this.employee = employee;

  }

  getUpdateEmployee(): EmployeeModel {
    return this.employee;
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.error.message || error.error.message);
  }
}

