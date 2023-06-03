import {Customer} from "./Customer";
import {Product} from "./Product";
import {Category} from "./Category";
import {Status} from "./Status";

export interface Contract {
  id?:number,
  beginDate?:string,
  endDate?:string,
  customer?:Customer,
  category?:Category,
  interest?:number,
  employeeId?:number,
  product?:Product,
  isFlag?:boolean,
  status : Status,
}
