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



const Board = () => {
  let navigate = useNavigate();
  const { user,login,logout ,auth} = useContext(AuthContext);
  const {tasks, lists, HandleData,HandleTasks,HandleLists,data,setData,listOrder} = useContext(TaskContext);

  const getAllTasks = async ()=>{
    const res = await API.getAllTasks();
    HandleTasks(res.data);
    HandleLists(res.data);
  }
  useEffect(()=>{
    getAllTasks();
    if(!auth) navigate('/login')
    if(!user.verified) navigate('/login')
  },[])

  const onDragEnd = result =>
  {
    const {destination , source, draggableId} = result;
    if(!destination) return;
    console.log('====================================');
    console.log();
    console.log('====================================');
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;
    const start = data.lists[source.droppableId]
    const end = data.lists[destination.droppableId]
    console.log(start,end,"send");
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

      {auth&&
  <DragDropContext onDragEnd={onDragEnd}>
  <div className='board'>
    <Navbar/>
      <div className='board-container'>
        {listOrder.map(id =>
        {
          const list = data['lists'][id];
          const tasks = list.tasks.map(taskId => data.tasks[taskId]);
          return  <List key={list.id} tasks={tasks} list={list}/> 
        }
          
        )}
      </div>

  </div>
</DragDropContext>


}
      
      
    </>

  )
}

export default Board
