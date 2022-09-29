import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Board from './pages/Board'
import { useEffect, useState } from 'react';
import { AuthContext } from './context/Auth'
import  { useContext } from 'react'
import { useNavigate } from "react-router-dom";

import API from './utils/API';
import { LinearProgress } from '@mui/material';
import Verify from './pages/Verify';
function App() {
  const { user,login,logout ,auth} = useContext(AuthContext);
  const [isLoading,setIsLoading] = useState(true);

  const getUser = async ()=>{
    const res = await API.getUser();
    if(res.status === 'Success')
    {
      if(res.data.verified)
        login(res.data);
    }
    setIsLoading(false);
  }
  useEffect(()=>{
    getUser();

  },[])
  return (
    <div>
      {
        isLoading?<LinearProgress color="secondary" />:
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgetPassword' element={<ForgetPassword/>}/>
          <Route path='/resetPassword/:token' element={<ResetPassword/>}/>
          <Route path='/board' element={<Board/>}/>
          <Route path='/verify/:token' element={<Verify/>}/>


        </Routes>
      }
     
    </div>
  );
}

export default App;
