import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { EmployeeModel } from '../../models/employeemodel';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css']
})
export class ViewemployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private notifyService: NotificationService,
    private router: Router,) { }

  employeeList: EmployeeModel[];

  //For Pagination
  p: number = 1;
  pageSize = 9;
  pageSizes = [9, 25, 50, 100];

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeService.viewEmployee()
      .subscribe(
        (data) => {
          this.employeeList = data;
        });
  }

  updateEmployee(employee:EmployeeModel){
    this.employeeService.setUpdateEmployee(employee);
    this.router.navigate(["/newemployee"]);
  }

  deleteEmployee(employee:EmployeeModel){
    this.employeeService.deleteEmployee(employee)
      .subscribe(
        (data) => {
          let message = "Employee deleted successfully"
          this.notifyService.showSuccess(message, "");
          this.getEmployeeList();
        },
        (error) => {
          let message = "Error"
          this.notifyService.showError(message, "");
        });
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.p = 1;
    this.getEmployeeList();
  }
}
