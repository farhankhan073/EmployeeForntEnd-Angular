import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DepartmentModel } from '../models/departmentemodel';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private department: DepartmentModel;
  constructor(private _httpClient: HttpClient) { }

  createDepartment(department:DepartmentModel) : Observable<DepartmentModel>{
    let _url = "http://localhost:9090/hr/savedepartment";
    return this._httpClient.post<DepartmentModel>(_url,department).pipe(catchError(this.errorHandler));
  }

  updateDepartment(department:DepartmentModel) {
    let _url = "http://localhost:9090/hr/updatedepartment";
    return this._httpClient.put<DepartmentModel>(_url,department).pipe(catchError(this.errorHandler));
  }

  

  deleteDepartment(department:DepartmentModel) {
    let _url = "http://localhost:9090/hr/deletedepartment"+ "/" + department.departmentid;
    return this._httpClient.delete<DepartmentModel>(_url).pipe(catchError(this.errorHandler));
  }

  viewDepartment(): Observable<DepartmentModel[]> {
    let _url = "http://localhost:9090/hr/getdepartment";
    return this._httpClient.get<DepartmentModel[]>(_url).pipe(catchError(this.errorHandler));

  }



  setUpdateDepartment(department: DepartmentModel) {

    this.department = department;

  }

  getUpdateDepartment(): DepartmentModel {
    return this.department;
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.error.message || error.error.message);
  }
}
