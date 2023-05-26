import {Status} from "../status/Status";
import { Category } from "../category/Category";
import { Customer } from "../customer/Customer";

export interface Contract {
  nameProduct?:string,
  category?:Category,
  status?:Status,
  imgPath?:string,
  price?:number,
  interest?:number,
  beginDate?:string,
  endDate?:string,
  username?:string,
  customer?:Customer
}
