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
  productCategory: {
    id: number;
    name: string;
  };
  productVariant: {
    id: number;
    variant: string;
  };
  comments: comment[];
  quantityInStock: number;
  cartQuantity: number;
}
export interface comment {
  id: number;
  user: Registration;
  comment: string;
  valutation: number;
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
export interface AddPayload {
  object1: Products;
  qty: string;
}
export interface CartActionPayload {
  cartSumAmount: number;
  cartSumQuantity: number;
}
export interface commmentPost {
  user_id: number;
  product_id: number;
  comment: string;
  valutation: number;
}

//interface of PayPal order returned
export interface PaypalInterface {
  id: string;
  intent: string;
  status: string;
  purchase_units: PurchaseUnit[];
  payer: Payer;
  create_time: Date;
  update_time: Date;
  links: Link[];
}

export interface Link {
  href: string;
  rel: string;
  method: string;
}

export interface Payer {
  name: PayerName;
  email_address: string;
  payer_id: string;
  address: PayerAddress;
}

export interface PayerAddress {
  country_code: string;
}

export interface PayerName {
  given_name: string;
  surname: string;
}

export interface PurchaseUnit {
  reference_id: string;
  amount: Amount;
  payee: Payee;
  description: string;
  items: Item[];
  shipping: Shipping;
  payments: Payments;
}

export interface Amount {
  currency_code: string;
  value: string;
  breakdown: Breakdown;
}

export interface Breakdown {
  item_total: Handling;
  shipping: Handling;
  handling: Handling;
  insurance: Handling;
  shipping_discount: Handling;
}

export interface Handling {
  currency_code: string;
  value: string;
}

export interface Item {
  name: string;
  unit_amount: Handling;
  tax: Handling;
  quantity: string;
  image_url: string;
}

export interface Payee {
  email_address: string;
  merchant_id: string;
}

export interface Payments {
  captures: Capture[];
}

export interface Capture {
  id: string;
  status: string;
  amount: Handling;
  final_capture: boolean;
  seller_protection: SellerProtection;
  create_time: Date;
  update_time: Date;
}

export interface SellerProtection {
  status: string;
  dispute_categories: string[];
}

export interface Shipping {
  name: ShippingName;
  address: ShippingAddress;
}

export interface ShippingAddress {
  address_line_1: string;
  address_line_2: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

export interface ShippingName {
  full_name: string;
}
