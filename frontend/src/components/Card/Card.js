import React, { useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import "../../css/board.css" 

const Card = ({task,index}) => {
  useEffect(()=>{
    console.log(task);
  },[])
  return (
    <Draggable draggableId={task.title} index={index}>
    {
      (provided,snapshot)=> (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className='card-container'
        >
          
        <div className='priority'>{task.priority}</div>
        <h4>{task.title}</h4>
        <p>lorem ipsum</p>
        </div>
      )
    }
      
    </Draggable>
  )
}

export default Card
