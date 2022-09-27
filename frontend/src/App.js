import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Board from './pages/Board'
import { useEffect } from 'react';
import { AuthContext } from './context/Auth'
import  { useContext } from 'react'
import { useNavigate } from "react-router-dom";

import API from './utils/API';
function App() {
  const { user,login,logout ,auth} = useContext(AuthContext);

  const getUser = async ()=>{
    const res = await API.getUser();
    if(res.status === 'Success')
    {
      login(res);
    }
    console.log(res);
  }
  useEffect(()=>{
    console.log('====================================');
    console.log("test");
    console.log('====================================');
    getUser();

  },[])
  return (
    <div>
      {console.log(user)}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path='/board' element={<Board/>}/>
      </Routes>
    </div>
  );
}

export default App;
