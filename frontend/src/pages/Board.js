import React, { useEffect } from 'react'
import API from '../utils/API';

const Board = () => {
  const getAllTasks = async ()=>{
    const res = await API.getAllTasks();
    console.log('====================================');
    console.log(res);
    console.log('====================================');
  }
  useEffect(()=>{
     getAllTasks();
  },[])
  return (
    <div>
      board
    </div>
  )
}

export default Board
