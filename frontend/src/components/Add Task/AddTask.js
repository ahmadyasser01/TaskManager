import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { PopupContext } from '../../context/Popup'
import { TaskContext } from '../../context/Tasks'
import API from '../../utils/API'

const AddTask = ({selected}) => {
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [priority,setPriority] = useState(null);
  const {data,setData} = useContext(TaskContext);
  const { handleClose} = useContext(PopupContext)

  const HandleSubmit = async (e)=>{
    e.preventDefault();

    if(!title || !description || priority===null) return;
    const res = await API.createTask({title,description,priority:priority,status:selected})
    if(res.status === 'Success'){
      // if request was successful add task to the data context to add new card
      const newTask  = res.data;
      const newTasks = Array.from(data.lists[selected].tasks)
      newTasks.push(newTask.title);
      const newList = {
        ...data.lists[selected],
        tasks:newTasks
      }
      const newTasksObj = {
        ...data.tasks,
        [newTask.title]: newTask
      }
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

  
  return (
    <div className='add-task-popup'>
      <form onSubmit={(e)=>HandleSubmit(e)}>
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
        <TextField
              value={selected}
              disabled
              id='status'
              variant='standard'
              placeholder='description'
              autoComplete='false'
              sx={{padding:"2px"}}
        />
        <Button variant='outlined' type="submit">
          Add Task
        </Button>
      
      </form>
    </div>
  )
}

export default AddTask
