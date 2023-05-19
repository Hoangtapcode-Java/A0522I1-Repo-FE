import {Employee} from "../employee/Employee";

export interface User{
  username?:string,
  password?:string,
  employeeId?:Employee,
  isFlag?:boolean
}
