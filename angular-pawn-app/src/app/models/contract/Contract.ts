import {Customer} from "../customer/Customer";
import {Status} from "../status/Status";
import {Employee} from "../employee/Employee";
import {Product} from "../product/Product";

export interface Contract {
  id?:number,
  beginDate?:string,
  endDate?:string,
  customerId?:Customer,
  statusId?:Status,
  interest?:number,
  employeeId?:Employee,
  productID?:Product,
  isFlag?:boolean
}
