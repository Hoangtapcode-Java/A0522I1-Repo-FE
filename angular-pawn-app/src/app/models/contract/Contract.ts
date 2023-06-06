import {Customer} from '../customer/Customer';
import {Status} from '../status/Status';
import {Category} from "../category/Category";
import {Product} from "../product/Product";
import {Employee} from "../employee/Employee";

// ThuongVTH
export interface Contract {
  id?: number;
  contractCode?: string;
  beginDate?: string;
  customer?: Customer;
  endDate?: string;
  employee?: Employee;
  status?: Status;
  interest?: number;
  product?: Product;
  isFlag?: boolean;
}
