import { DepartmentModel } from "src/app/department/models/departmentemodel";


export class EmployeeModel {

     employeeid:string;
     firstname:string;
     lastname:string;
     email:string;
     phonenumber:string;
     hiredate:string;
     salary:string;
     managerid :string;
     department :DepartmentModel;
}
