import {Employee} from "../employee/Employee";

export interface Article {
  id?:number,
  title?:string,
  img?:string,
  content?:string,
  publicDate?:string,
  employee?: Employee,
  isFlag?:boolean,
  isFeature?:boolean
}
