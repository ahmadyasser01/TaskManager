import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import '../css/signup.css'
import   { ReactComponent as Illustration } from "../assets/signup.svg"
import AuthForm from '../components/AuthForm/AuthForm'

const ForgetPassword = () => {
  const [email,setEmail] = useState("")

  return (
    <>
      <AuthForm>
        <div className='forget-container'>
          <div className="illustration-login">
              <Illustration/>
          </div>
          <h3>Forget Password?</h3>
          <form className='forget-form'>
            <TextField
              onChange={e=>setEmail(e.target.value)}
              value={email}
              id='email'
              variant='outlined'
              placeholder='Email'
              autoComplete='false'
              sx={{padding:"2px"}}
            />
            <Button variant='outlined'>
                SEND Email
            </Button> 
          </form>
        </div>
      </AuthForm>
    </>
  )
}

export default ForgetPassword
