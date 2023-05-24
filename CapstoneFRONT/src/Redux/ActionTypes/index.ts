import { Products, Registration, comment, commmentPost } from "../Interface";
import axio from "../../api/axio";

export const PRODUCT_FETCH_ALL = "api/products/category/";
export const GET_ORDERS = "api/orders/";
export const PRODUCT_FETCH_BY_NAME = "api/products/name/";
export const PRODUCT_FETCH_BY_ID = "api/products/";
export const COMMENT_POST = "api/comments/";
export const USER = "USER";
export const SHOPPING_ADD = "SHOPPING_ADD";
export const PRODUCTS = "PRODUCTS";
export const CART_ADD = "CART_ADD";
export const CART_REMOVE = "CART_REMOVE";
export const CART_MODIFY = "CART_MODIFY";
export const TOT_CART = "TOT_CART";
export const CART_CLEAR = "CART_CLEAR";
export const CART_ADD_FIX ="CART_ADD_FIX"
export const CART_MODIFY_VARIANT = "CART_MODIFY_VARIANT";


let url = "http://localhost:8080/api/auth/register";

export const foodTypeConverter =(product:Products)=>{
  let n = 1;
  if (product.productCategory.name === "FOOD") {
    switch (product.productVariant.variant) {
      case "S":
        n = 10;
        break;
      case "M":
        n = 20;
        break;
      case "L":
        n = 30;
        break;
      default: {
        return n ;
      }
    }
  }
  return n;
}

// export const myfetch = async(params:User) =>{
//     try {
//         let res = await fetch(url,{
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(params),
//           }).then(response => response.json().then(
//             (data) => {
//               return data;
//             }
//           ));
//           return res;
//           ;

//     } catch (error) {

//     }
// }
export const registerFetch = async (body: Registration) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
export const fetchProducts = async (category:string) => {
  try {
    const response = await axio.get(PRODUCT_FETCH_ALL+category);
    return response.data;
  } catch (error) {}
};
export const fetchProductsAll = async () => {
  try {
    const response = await axio.get(PRODUCT_FETCH_BY_ID+"all");
    return response.data;
  } catch (error) {}
};
export const getProductById = async (id: string) => {
  try {
    const response = await axio.get(PRODUCT_FETCH_BY_ID + id);
    return response.data;
  } catch (error) {}
};

export const postComment = async(obj:commmentPost,user:Registration)=>{
  try {
    const response = await axio.post(COMMENT_POST,JSON.stringify(obj),{headers:{"Content-Type":"application/json",Authorization: `Bearer ${user.accessToken}`}})
  } catch (error) {
    console.log(error);
    
    
  }
}
export const getProductByName = async (name: string) => {
  try {
    const response = await axio.get(PRODUCT_FETCH_BY_NAME + name);
    return response.data;
  } catch (error) {}
};

export const calculateTotalRating = (product:Products) => {
  let totalSum = product.comments.reduce((acc,reducer)=>{
    return acc + reducer.valutation
  },0)
  return totalSum;
};
export const calculateStarRating = (product:Products) => {
  const totalSum = calculateTotalRating(product);
  const average = totalSum / product.comments.length;
  const starRating = Math.max(average);
  
  return starRating;
}

export const getOrders = async (id: number) => {
  try {
    const response = await axio.get(GET_ORDERS + id);
    return response.data;
  } catch (error) {}
};