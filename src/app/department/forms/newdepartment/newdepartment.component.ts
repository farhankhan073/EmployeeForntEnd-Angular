import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/app/employee/models/employeemodel';
import { EmployeeService } from 'src/app/employee/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { DepartmentModel } from '../../models/departmentemodel';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-newdepartment',
  templateUrl: './newdepartment.component.html',
  styleUrls: ['./newdepartment.component.css']
})
export class NewdepartmentComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService ,
    private departmentService: DepartmentService,
    private router: Router,
    private notifyService: NotificationService) { }

    employeeList: EmployeeModel[];
    departmentList: DepartmentModel[];

    updateDeptObj:DepartmentModel;
    title = "New Department";

  createDepartmentForm: FormGroup;
  buttonValue;
  ngOnInit(): void {
    this.buttonValue = "Save"
    this.createDepartmentForm = this.fb.group({
      departmentNameControl: ['', Validators.required ],
      managerControl: [''],
     
      
    });

    this.updateDeptObj = this.departmentService.getUpdateDepartment();
    if (this.updateDeptObj != null) {
      this.buttonValue = "Update";
      this.title = "Edit Department";
      this.createDepartmentForm.patchValue({
        departmentNameControl: this.updateDeptObj.departmentname,
      });
      this.departmentService.setUpdateDepartment(null); 
    }

    this.getEmployeeList();
    this.getDepartmentList();
  }

  get f() {
    return this.createDepartmentForm.controls;
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
    if (this.employeeList && this.updateDeptObj && this.updateDeptObj.managerid) {
      for (let count = 0; count < this.employeeList.length; count++) {
        if (this.employeeList[count].employeeid == this.updateDeptObj.managerid) {
          this.createDepartmentForm.patchValue({
            managerControl: this.employeeList[count]
          })
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
    if (this.departmentList && this.updateDeptObj && this.updateDeptObj.departmentid) {
      for (let count = 0; count < this.departmentList.length; count++) {
        if (this.departmentList[count].departmentid == this.updateDeptObj.departmentid) {
          this.createDepartmentForm.patchValue({
            departmentControl: this.departmentList[count]
          })
        }
      }
    }
  }

  getDepartmentForSave(): DepartmentModel {
    let deptId = null;
    if(this.updateDeptObj){
      deptId = this.updateDeptObj.departmentid;
    }
    let dept: DepartmentModel = {
      departmentid:deptId,
      departmentname: this.f.departmentNameControl.value,
      managerid: this.f.managerControl.value.employeeid,
      
    };
    return dept;
  }

  saveDepartment(){
    let dept: DepartmentModel = this.getDepartmentForSave();
    console.log(dept)
    if (this.buttonValue == "Save") {
      this.departmentService.createDepartment(dept).subscribe(
        (data) => {
          let message = "Department saved successfully"
          this.notifyService.showSuccess(message, "");
          this.resetValues();
          this.router.navigate(["/viewdepartment"]);
        },
        (error) => {
          let message = "Error"
          this.notifyService.showError(message, "");
        }
      );
    }else if (this.buttonValue == "Update") {
      this.departmentService.updateDepartment(dept).subscribe(
        (data) => {
          let message = "Department updated successfully"
          this.notifyService.showSuccess(message, "");
          this.resetValues();
          this.router.navigate(["/viewdepartment"]);
        },
        (error) => {
          let message = "Error"
          this.notifyService.showError(message, "");
        }
      );
    }
  }


  CancelDepartment(){
    this.router.navigate(["/viewdepartment"]);
  }


  resetValues() {
   this.getEmployeeList();
   this.getDepartmentList();
    
    this.createDepartmentForm.reset({
     
      departmentNameControl: [''],
      managerControl: [''],
      
    });
   
  }

}
