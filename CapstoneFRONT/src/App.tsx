import { useEffect, useState } from 'react';
import './App.scss';
import { RootState } from './Redux/Store';
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from 'jwt-decode';
import { USER} from './Redux/ActionTypes';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import MainPage from './Components/MainPageComponent/MainPage';
import Register from './Components/RegisterComponent/Register';
import Login from './Components/LoginComponent/Login';
import Cart from './Components/CartComponent/Cart';
declare const google: any;

function App() {
  // const [utente,setUtente] = useState({
  //   id:"",
  //   name:"",
  //   email:"",
  //   family_name:"",
  //   given_name:""
  // });
  // const user = useSelector((state:RootState)=> state.user);
  // const dispatch = useDispatch();
  // let buttonClick = document.getElementById('ciao')
  
  // function handleCallbackResponse(response:any){
   
  //   console.log(response.credential)

  //   let user:User = jwtDecode(response.credential);
    
  //    myfetch(user).then((data)=>{
  //     setUtente({
  //       id:data,
  //       name: user.name,
  //       email: user.email,
  //       family_name: user.family_name,
  //       given_name: user.given_name
  //     })
  //    });
  // }
  
  // useEffect(()=>{
  //   dispatch({
  //     type: USER,
  //     payload: utente
  //   })
  // },[utente])

  // useEffect(()=>{
    
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:"494859266688-5hjingpssjnvej2gobsjccmrbil4mh1h.apps.googleusercontent.com",
  //     callback: handleCallbackResponse
  //   })
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     {theme: "outline",size:"large"}
  //   )
  //     buttonClick?.addEventListener('click',function(){
  //       console.log("ciao");
  //     });
  // },[buttonClick]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/register'element={<Register/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/cart'element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
