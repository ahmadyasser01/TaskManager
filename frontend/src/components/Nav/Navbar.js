import React, { useContext } from 'react'
import './navbar.css'
import {Button} from '@mui/material'
import API from '../../utils/API'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/Auth';
import { TaskContext } from '../../context/Tasks';

const Navbar = () => {
  const { user,login,logout ,auth} = useContext(AuthContext);
  const {tasks, lists, HandleData,HandleTasks,HandleLists,data,setData,listOrder} = useContext(TaskContext);


  let navigate = useNavigate();
  const HandleLogout = async ()=>{
    const {status} =await API.logout();

    if(status === 'Success'){
      logout();
      navigate('/');
    }
  }
  return (
    <div className='navbar'>
      <h1> Blue Task Manager</h1>
      <Button onClick={HandleLogout}>Logout</Button>
    </div>
  )
}

export default Navbar
