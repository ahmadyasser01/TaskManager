import React, { useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { PopupContext } from '../../context/Popup';
import "../../css/board.css" 

const Card = ({task,index,list}) => {
  const {open, handleOpen,setUpdate,setTaskId,setSelected} = useContext(PopupContext)
  const priority = 
    {
      0:"low-priority",
      1:"medium-priority",
      2:"high-priority"
    }


  return (
    <>
      <Draggable draggableId={task._id} index={index}>
      {
        (provided,snapshot)=> (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className='card-container'
            onClick={()=> {
              setUpdate(true)
              handleOpen();
              setTaskId(task._id)
              setSelected(list)
            }
              }
          >
          <div className={`${priority[task.priority]} priority`} >{priority[task.priority]}</div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          </div>
        )
      }
      </Draggable>
    </>
  )
}

export default Card
