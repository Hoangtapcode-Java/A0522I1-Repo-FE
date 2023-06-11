import {Employee} from '../employee/Employee';

export interface Article {
  id?: number,
  title?: string,
  image?: string,
  content?: string,
  datePublic?: string;
  employeeId?: Employee;
  isFlag?: boolean;
  employee?: Employee;
  img?: string;
  publicDate?: string
}
