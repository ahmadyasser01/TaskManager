import React, { useEffect,useContext } from 'react'
import { Navigate } from 'react-router-dom';
import API from '../utils/API';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/Auth'



const Board = () => {
  let navigate = useNavigate();
  const { user,login,logout ,auth} = useContext(AuthContext);

  const getAllTasks = async ()=>{
    const res = await API.getAllTasks();
    console.log('====================================');
    console.log(res);
    console.log('====================================');
  }
  useEffect(()=>{
     getAllTasks();
     if(!auth) navigate('/login')
     if(!user.verified) navigate('/login')
  },[])
  return (
    <>
      {auth&&"board"}
    </>

  )
}

export default Board
