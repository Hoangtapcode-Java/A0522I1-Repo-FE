import {Category} from "../category/Category";

export interface Product {
  id?:number,
  name?:string,
  price?:number,
  category?:Category
}
