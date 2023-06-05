import {Customer} from '../customer/Customer';
import {Status} from '../status/Status';
import {Employee} from '../employee/Employee';
import {Product} from '../product/Product';

export interface Contract {
  id?:number,
  contractCode?:string,
  beginDate?:string,
  endDate?:string,
  customer?:Customer,
  status?:Status,
  interest?:number,
  employee?:Employee,
  product?:Product,
  isFlag?:boolean
}
