import React, { useEffect,useContext } from 'react'
import { Navigate } from 'react-router-dom';
import API from '../utils/API';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/Auth'
import { TaskContext } from '../context/Tasks';
import Navbar from '../components/Nav/Navbar';
import List from '../components/List/List';
import "../css/board.css" 
import {DragDropContext} from 'react-beautiful-dnd'
import { PopupContext } from '../context/Popup'
import Popup from '../components/Popup/Popup';
import { Alert } from '@mui/material';




const Board = () => {
  let navigate = useNavigate();
  const { user, auth} = useContext(AuthContext);
  const {open,  handleClose,update,selected,taskId} = useContext(PopupContext)
  const {  HandleTasks,HandleLists,data,setData,listOrder} = useContext(TaskContext);

  useEffect(()=>{
  },[])

  const getAllTasks = async ()=>{
    const res = await API.getAllTasks();
    HandleTasks(res.data);
    HandleLists(res.data);
  }
  useEffect(()=>{
    getAllTasks();
    if(!auth) navigate('/login')
    if(!user.verified) {
      setTimeout(()=>{
        
      },100)
    }
    return ()=>{
    HandleTasks([])
    HandleLists([])
    }
  },[])

  const onDragEnd = result =>
  {
    const {destination , source, draggableId} = result;
    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;
    const start = data.lists[source.droppableId]
    const end = data.lists[destination.droppableId]
    if(start === end){
      const newTasksId = Array.from(start.tasks);
      newTasksId.splice(source.index, 1);
      newTasksId.splice(destination.index, 0, draggableId);

      const newList ={
        ...start,
        tasks: newTasksId
      }
      setData(prev=>{
        return {
          ...prev,
          lists:{...prev.lists,[newList.id]:newList}
        }
      })

      
    }
    else{
      const startTasksId = Array.from(start.tasks);
      startTasksId.splice(source.index,1);
      const newStart = {
        ...start,
        tasks:startTasksId
      }
      const endTasksId = Array.from(end.tasks);
      endTasksId.splice(destination.index,0,draggableId)
      const newEnd ={
        ...end,
        tasks:endTasksId
      }
      setData(prev=>{
        return {
          ...prev,
          lists:{...prev.lists
            ,[newStart.id]:newStart,
            [newEnd.id]:newEnd
          }
        }
      })
    const id = data.tasks[draggableId]._id;
    API.updateTask(id,{status:destination.droppableId})
    }

  }



  return (
    <>

      {auth&&user.verified?
  <DragDropContext onDragEnd={onDragEnd}>
  <div className='board'>
    <Navbar/>
      <div className='board-container'>
        { listOrder.map(id =>
        { if(data['lists'] ===undefined) return;
          const list = data['lists'][id];
          const tasks = list.tasks.map(taskId => data.tasks[taskId]);
          return  <List key={list.id} tasks={tasks} list={list}/> 
        }
          
        )}
      </div>
      <Popup open={open} handleClose={handleClose} update={update} selected={selected}  taskId={taskId} />


  </div>
</DragDropContext>:<Alert severity="success" color="info">
            "Please Verify Your email first"
          </Alert>


}
      
      
    </>

  )
}

export default Board
