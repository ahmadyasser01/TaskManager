import React, { useEffect,useContext } from 'react'
import { Navigate } from 'react-router-dom';
import API from '../utils/API';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/Auth'
import { TaskContext } from '../context/Tasks';
import Navbar from '../components/Nav/Navbar';
import List from '../components/List/List';
import "../css/board.css" 


const Board = () => {
  let navigate = useNavigate();
  const { user,login,logout ,auth} = useContext(AuthContext);
  const {tasks, lists, HandleData,setTasks} = useContext(TaskContext);

  const getAllTasks = async ()=>{
    const res = await API.getAllTasks();
    console.log('====================================');
    console.log(res);
    console.log('====================================');
     setTasks(res.data);
  
  }
  useEffect(()=>{
    if(!auth) navigate('/login')
    if(!user.verified) navigate('/login')
    getAllTasks();
    
  },[])
  return (
    <>

      {auth&&
        <div className='board'>
          <Navbar/>
          <div className='board-container'>
            {lists.map(list =>(
              <List/> 
            ))}
          </div>

        </div>
      }
    </>

  )
}

export default Board
