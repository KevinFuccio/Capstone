export interface User{
    id:string
    name:string,
    email:string
    family_name:string,
    given_name:string
}
export interface MyState{
    user: User
}