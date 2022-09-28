import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import "../../css/board.css" 
import Popup from '../Popup/Popup';

const Card = ({task,index}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Draggable draggableId={task.title} index={index}>
      {
        (provided,snapshot)=> (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className='card-container'
            onClick={()=> handleOpen()}
          >
            
          <div className='priority' >{task.priority}</div>
          <h4>{task.title}</h4>
          <p>lorem ipsum</p>
          </div>
        )
      }
      </Draggable>
      <Popup open={open} handleClose={handleClose}/>
    </>
  )
}

export default Card
