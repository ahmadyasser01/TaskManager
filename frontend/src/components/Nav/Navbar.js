import React from 'react'
import './navbar.css'
import {Button} from '@mui/material'
import API from '../../utils/API'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const HandleLogout = async ()=>{
    const {status} =await API.logout();
    console.log('====================================');
    console.log();
    console.log('====================================');
    if(status === 'Success'){
      navigate('/')
    }
  }
  return (
    <div className='navbar'>
      <h1>Task Manager</h1>
      <Button onClick={HandleLogout}>Logout</Button>
    </div>
  )
}

export default Navbar
