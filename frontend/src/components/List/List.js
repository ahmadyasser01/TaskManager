import React from 'react'
import Card from '../Card/Card'
import "../../css/board.css" 
import { Button, TextField, Typography } from '@mui/material'
import { Droppable } from 'react-beautiful-dnd'


const List = ({tasks,list}) => {
  return (
    <div className=''>
              <h3>{list.title}</h3>        
        <Droppable droppableId={list.id}>
          {
            provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className='list-container'
              >
                {
                 tasks.map((task,index) =>(<Card task={task} index={index} key={task._id} />))
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
        

        <div className='Add-task'>
            <Button>Add Task</Button>
        </div>

    </div>
  )
}

export default List
