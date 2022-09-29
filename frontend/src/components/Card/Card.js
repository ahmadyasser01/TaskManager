import React, { useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { PopupContext } from '../../context/Popup';
import "../../css/board.css" 
import Popup from '../Popup/Popup';

const Card = ({task,index}) => {
  const {open, handleOpen, handleClose,update,setUpdate} = useContext(PopupContext)


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
            onClick={()=> {
              setUpdate(true)
              handleOpen();}}
          >
            
          <div className='priority' >{task.priority}</div>
          <h4>{task.title}</h4>
          <p>lorem ipsum</p>
          </div>
        )
      }
      </Draggable>
    </>
  )
}

export default Card
