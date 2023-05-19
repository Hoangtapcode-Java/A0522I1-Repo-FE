import {Employee} from "../employee/Employee";

export interface Article {
  id?:number,
  title?:string,
  image?:string,
  content?:string,
  datePublic?:string,
  employeeId?:number,
  isFlag?:boolean,
  isFeature?:boolean
}
