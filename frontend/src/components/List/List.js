import React from 'react'
import Card from '../Card/Card'
import "../../css/board.css" 
import { Button, TextField, Typography } from '@mui/material'


const List = () => {
  return (
    <div className='list-container'>
        <h3>Title</h3>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <div className='Add-task'>
            <TextField/>
            <Button>Add Task</Button>
        </div>

    </div>
  )
}

export default List
