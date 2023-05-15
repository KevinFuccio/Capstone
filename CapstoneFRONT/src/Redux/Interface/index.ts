//STATE interfaces
export interface MyState {
  user: Registration;
}

export interface ProductsState {
  products: Products[];
}

//OBJECT interfaces
// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   family_name: string;
//   given_name: string;
// }

export interface Roles {
  id: number;
  roleName: string;
}
export interface Cart {
  productsItems: Products[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}
export interface Registration {
  id: number;
  username: string;
  accessToken: string;
  tokenType: string;
  roles: Roles[];
  cart: Cart;
  address: Address[];
}
export interface Products {
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  productCategory: {};
  quantityInStock: number;
  cartQuantity:number;
}
export interface Address {
  id: number;
  city: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  region: string;
}
export interface ModifyCartPayload {
  obj: Products;
  optionValue: string;
}
export interface CartActionPayload {
  cartSumAmount: number;
  cartSumQuantity: number;
  
}