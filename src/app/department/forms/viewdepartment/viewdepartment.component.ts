import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { DepartmentModel } from '../../models/departmentemodel';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-viewdepartment',
  templateUrl: './viewdepartment.component.html',
  styleUrls: ['./viewdepartment.component.css']
})
export class ViewdepartmentComponent implements OnInit {

  constructor(private departmentService: DepartmentService,
    private router: Router,) { }

  departmentList: DepartmentModel[];

  //For Pagination
  p: number = 1;
  pageSize = 9;
  pageSizes = [9, 25, 50, 100];

  ngOnInit(): void {
    this.getDepartmentList();
  }

  getDepartmentList() {
    this.departmentService.viewDepartment()
      .subscribe(
        (data) => {
          this.departmentList = data;
        });
  }

  updateDepartment(department:DepartmentModel){
    console.log(department)

    this.departmentService.setUpdateDepartment(department);
    this.router.navigate(["/newdepartment"]);
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.p = 1;
    this.getDepartmentList();
  }



}
