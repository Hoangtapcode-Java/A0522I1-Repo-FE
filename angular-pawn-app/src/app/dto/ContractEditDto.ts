import {Category} from '../models/category/Category';
import {Status} from "../models/status/Status";

export interface ContractEditDto {
  id?: number;
  contractCode?: string;
  customerName?: string;
  customerId?: number;
  productName?: string;
  productId?: number;
  category?: Category;
  beginDate?: string;
  endDate?: string;
  status?: Status;
}
