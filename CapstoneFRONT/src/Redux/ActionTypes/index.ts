
import {Registration } from "../Interface";
import axio from "../../api/axio";



export const PRODUCT_FETCH_ALL="api/products/all";
export const USER = "USER";
export const SHOPPING_ADD= "SHOPPING_ADD";
export const PRODUCTS = "PRODUCTS";
export const CART_ADD ="CART_ADD";
export const CART_REMOVE ="CART_REMOVE";
export const CART_MODIFY ="CART_MODIFY";
export const TOT_CART="TOT_CART";
export const CART_CLEAR ="CART_CLEAR"

let url= "http://localhost:8080/api/auth/register"


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
export const registerFetch= async(body:Registration)=>{

    let res = await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(body)
    })
  
}
export const fetchProducts = async()=>{

  try {
      const response = await axio.get(PRODUCT_FETCH_ALL,
          );
         
          
      return response.data
      
  } catch (error) {
      
  }

}