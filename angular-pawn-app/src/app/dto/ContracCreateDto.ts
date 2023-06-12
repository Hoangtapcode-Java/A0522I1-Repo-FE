<<<<<<< HEAD
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
=======
import {Category} from '../models/category/Category';
import {Status} from '../models/status/Status';
import {Customer} from '../models/customer/Customer';

export interface ContractCreateDto {
  nameProduct?: string;
  category?: Category;
  status?: Status;
  imgPath?: any;
  price?: number;
  interest?: number;
  beginDate?: string;
  endDate?: string;
  username?: string;
  customer?: Customer;
>>>>>>> b5979ed4c7eb5a5525afe4fe39bfa86ce06bba02
}
