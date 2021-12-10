import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentModel } from 'src/app/department/models/departmentemodel';
import { DepartmentService } from 'src/app/department/services/department.service';
import { NotificationService } from 'src/app/services/notification.service';
import { EmployeeModel } from '../../models/employeemodel';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-newemployee',
  templateUrl: './newemployee.component.html',
  styleUrls: ['./newemployee.component.css']
})
export class NewemployeeComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService ,
    private departmentService: DepartmentService,
    private router: Router,
    private notifyService: NotificationService) { }

    employeeList: EmployeeModel[];
    departmentList: DepartmentModel[];

    updateEmpObj:EmployeeModel;
    title = "New Employee";

  createEmployeeForm: FormGroup;
  buttonValue;
  ngOnInit(): void {
    this.buttonValue = "Save"
    this.createEmployeeForm = this.fb.group({
      firstNameControl: ['', [Validators.required ,Validators.minLength(3)]],
      lastNameControl: ['', [Validators.required ,Validators.minLength(3)]],
      emailControl: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phoneNoControl: ['', [Validators.required,Validators.pattern(/(^[0-9]+[-]*[0-9]+[-]*[0-9]+[-]*[0-9]+[-]*[0-9]+$)/)]],
      hireDateControl: ['', Validators.required],
      salaryControl: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      departmentControl: ['', Validators.required],
      managerControl: [''],
      
    });

    this.updateEmpObj = this.employeeService.getUpdateEmployee();
    if (this.updateEmpObj != null) {
      this.buttonValue = "Update";
      this.title = "Edit Employee";
      this.createEmployeeForm.patchValue({
        firstNameControl: this.updateEmpObj.firstname,
        lastNameControl: this.updateEmpObj.lastname,
        emailControl: this.updateEmpObj.email,
        phoneNoControl: this.updateEmpObj.phonenumber,
        hireDateControl: this.updateEmpObj.hiredate,
        salaryControl: this.updateEmpObj.salary,

      });
      this.employeeService.setUpdateEmployee(null); 
    }

    this.getEmployeeList();
    this.getDepartmentList();
  }

  get f() {
    return this.createEmployeeForm.controls;
  }

  getEmployeeList() {
    this.employeeService.viewEmployee()
      .subscribe(
        (data) => {
          this.employeeList = data;
          this.loadManagerForUpdate();
        });
  }

  loadManagerForUpdate() {
    if (this.employeeList && this.updateEmpObj && this.updateEmpObj.managerid) {
      for (let count = 0; count < this.employeeList.length; count++) {
        if (this.employeeList[count].employeeid == this.updateEmpObj.managerid) {
          this.createEmployeeForm.patchValue({
            managerControl: this.employeeList[count]
          });
        }
      }
    }
  }

  getDepartmentList() {
    this.departmentService.viewDepartment()
      .subscribe(
        (data) => {
          this.departmentList = data;
          this.loadDepartmentForUpdate();
        });
  }

  loadDepartmentForUpdate() {
    if (this.departmentList && this.updateEmpObj && this.updateEmpObj.department) {
      for (let count = 0; count < this.departmentList.length; count++) {
        if (this.departmentList[count].departmentid == this.updateEmpObj.department.departmentid) {
          this.createEmployeeForm.patchValue({
            departmentControl: this.departmentList[count]
          })
        }
      }
    }
  }

  getEmployeeForSave(): EmployeeModel {
    let empId = null;
    if(this.updateEmpObj){
      empId = this.updateEmpObj.employeeid;
    }
    let emp: EmployeeModel = {
      employeeid:empId,
      firstname: this.f.firstNameControl.value,
      lastname: this.f.lastNameControl.value,
      email: this.f.emailControl.value,
      phonenumber: this.f.phoneNoControl.value,
      hiredate: this.f.hireDateControl.value,
      salary: this.f.salaryControl.value,
      managerid: this.f.managerControl.value.employeeid,
      department: this.f.departmentControl.value,
    };
    return emp;
  }

  saveEmployee(){
    let emp: EmployeeModel = this.getEmployeeForSave();
    console.log(emp)
    if (this.buttonValue == "Save") {
      this.employeeService.createEmployee(emp).subscribe(
        (data) => {
          let message = "Employee saved successfully"
          this.notifyService.showSuccess(message, "");
          this.resetValues();
          this.router.navigate(["/viewemployee"]);
        },
        (error) => {
          let message = "Error"
          this.notifyService.showError(message, "");
        }
      );
    }else if (this.buttonValue == "Update") {
      this.employeeService.updateEmployee(emp).subscribe(
        (data) => {
          let message = "Employee updated successfully"
          this.notifyService.showSuccess(message, "");
          this.resetValues();
          this.router.navigate(["/viewemployee"]);
        },
        (error) => {
          let message = "Error"
          this.notifyService.showError(message, "");
        }
      );
    }
  }


  CancelEmployee(){
    this.router.navigate(["/viewemployee"]);
  }


  resetValues() {
   this.getEmployeeList();
   this.getDepartmentList();
    
    this.createEmployeeForm.reset({
     
      firstNameControl: [''],
      lastNameControl: [''],
      emailControl: [''],
      phoneNoControl: [''],
      hireDateControl: ['' ],
      salaryControl: ['' ],
      departmentControl: [''],
      managerControl: [''],
    });
   
  }

}
