import React, { useContext, useEffect, useState } from 'react'
import Card from '../Card/Card'
import "../../css/board.css" 
import { Button, TextField, Typography } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'
import { PopupContext } from '../../context/Popup'


const List = ({tasks,list}) => {
  const {open, handleOpen, handleClose,update,setUpdate,setSelected,selected,taskId} = useContext(PopupContext)

  return (
    <div className='list-container'>
              <h3>{list.title}</h3>        
        <Droppable droppableId={list.id}>
          {
            provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='cards-container'
              >
                {tasks.length>0 &&
                 tasks.map((task,index) =>(
                  <Card task={task} index={index} key={task._id} update={update} setUpdate={setUpdate} list={list.title}/>))
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
        <div className='Add-task'>
            <Button onClick={()=>{
              setSelected(list.title)
              setUpdate(false);
              handleOpen()
            }}>Add Task</Button>

        </div>

    </div>
  )
}

export default List
