import {Category} from "./Category";

export interface Product {
  checked: boolean;
  isSelected: any;
  id?:number,
  name?:string,
  price?:number,
  category?:Category;
}
