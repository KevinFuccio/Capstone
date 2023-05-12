//STATE interfaces
export interface MyState{
    user: Registration
}

export interface ProductsState{
    products:Products[]
}


//OBJECT interfaces
export interface User{
    id:string
    name:string,
    email:string
    family_name:string,
    given_name:string
}

export interface Roles{
    id:number,
    roleName:string
}
export interface Registration{
    id:number,
    username:string,
    accessToken:string,
    roles:Roles[],
    cart:Products[],
    address:Address[]
}
export interface Products{
        description:string,
        id:number,
        image:string,
        name:string,
        price:number,
        productCategory:{},
        quantityInStock: number
}
export interface Address{
    id:number;
	city:string;
	streetName:string;
	streetNumber:string;
	postalCode:string;
	region:string;
}

