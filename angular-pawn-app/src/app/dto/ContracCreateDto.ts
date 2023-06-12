import {Category} from "../models/category/Category";
import {Status} from "../models/status/Status";
import {Customer} from "../models/customer/Customer";

export interface ContractCreateDto {
  nameProduct?:string,
  category?:Category,
  status?:Status,
  imgPath?:any,
  price?:number,
  interest?:number,
  beginDate?:string,
  endDate?:string,
  username?:string,
  customer?:Customer
}
