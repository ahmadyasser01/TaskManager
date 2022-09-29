import React, { useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { PopupContext } from '../../context/Popup';
import "../../css/board.css" 
import Popup from '../Popup/Popup';

const Card = ({task,index,list}) => {
  const {open, handleOpen,setUpdate,setTaskId,setSelected} = useContext(PopupContext)


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
            
          <div className='priority' >{task.priority}</div>
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
