import { Button, InputLabel, MenuItem, Select, TextField, } from '@mui/material'
import React, { useContext, useState,useEffect } from 'react'
import { PopupContext } from '../../context/Popup'
import { TaskContext } from '../../context/Tasks'
import API from '../../utils/API'
import DeleteIcon from '@mui/icons-material/Delete';


const UpdateTask = ({taskId,selected}) => {
  
  const [title,setTitle] = useState('')
  const [taskTitle,setTaskTitle] = useState('');
  const [description,setDescription] = useState('')
  const [priority,setPriority] = useState('');
  const {data,setData} = useContext(TaskContext);
  const { handleClose} = useContext(PopupContext)
  const HandleDelete = async ()=>{
    
    const {status} = await API.deleteTask(taskId)
    
    console.log(taskId);
    if(status === 'Success')
    {
      let newTasks = Array.from(data.lists[selected].tasks);
      newTasks= newTasks.filter(task => task !== taskId);

      const newList ={
        ...data.lists[selected],
        tasks:newTasks
      }
      console.log('====================================');
      console.log(newList);
      console.log('====================================');
      const newTasksObj = {
        ...data.tasks
      }
      delete newTasksObj[taskId];
      console.log('====================================');
      console.log(newTasksObj);
      console.log('====================================');
      setData(prev=>{
        return {
          ...prev,
          tasks:newTasksObj,
          lists:{...prev.lists,[selected]:newList},
        }
       })

      

     
      handleClose();
    }

  }
  const getTask = async()=>{
    const {status,data} = await API.getTask(taskId)
    if(status === 'Success')
    {
      console.log(data);
      setTitle(data.title);
      setDescription(data.description);
      setPriority(data.priority);
      setTaskTitle(data.title)
    }

  }
  useEffect(()=>{
   getTask();
  },[])
  const HandleSubmit = async(e)=>{
    e.preventDefault();
    const res = await API.updateTask(taskId, {title,description,priority});

    console.log(res);
    if(res.status === "Success")
    {
      const newTasks = {
        ...data.tasks,
        [res.data._id]:res.data
      }
      setData(prev=>{
        return {
          ...prev,
          tasks:newTasks
          }
      })
      handleClose();
    }
  }
  return (
    <div className='update-task-popup'>
      <div onClick={HandleDelete}><DeleteIcon /></div>
      <form onSubmit={e=>HandleSubmit(e)}>
        <TextField
                onChange={e => setTitle(e.target.value)}
                value={title}
                id='title'
                variant='standard'
                placeholder='title'
                autoComplete='false'
                sx={{padding:"2px"}}
        />
        <TextField
                onChange={e => setDescription(e.target.value)}
                value={description}
                id='description'
                variant='standard'
                placeholder='description'
                autoComplete='false'
                sx={{padding:"2px"}}
        />
        <InputLabel id="demo-simple-select-label">Proirty</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              label="priority"
              onChange={(e)=>{setPriority(e.target.value)}}
          >
            <MenuItem value={0}>Low</MenuItem>
            <MenuItem value={1}>Meduim</MenuItem>
            <MenuItem value={2}>High</MenuItem>
          </Select>
        <Button variant='outlined' type="submit">
          Update Task
        </Button>    
      </form>
    </div>
  )
}

export default UpdateTask
