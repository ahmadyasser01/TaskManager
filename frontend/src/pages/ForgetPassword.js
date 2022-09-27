import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import '../css/signup.css'
import   { ReactComponent as Illustration } from "../assets/signup.svg"
import AuthForm from '../components/AuthForm/AuthForm'
import API from '../utils/API'

const ForgetPassword = () => {
  const [email,setEmail] = useState("")
  const HandleSubmit = async (e)=>{
    e.preventDefault();
    const res = await API.forgotPassword(email);
    if (res.status === "Success" ){
      /**
       * TODO: Handle message
       * 
       */
    }
    else{
      /**
       * TODO: Handle failure of the request
       */
    }

  }

  return (
    <>
      <AuthForm>
        <div className='forget-container'>
          <div className="illustration-login">
              <Illustration/>
          </div>
          <h3>Forget Password?</h3>
          <form className='forget-form' onSubmit={HandleSubmit}>
            <TextField
              onChange={e=>setEmail(e.target.value)}
              value={email}
              id='email'
              variant='outlined'
              placeholder='Email'
              autoComplete='false'
              sx={{padding:"2px"}}
            />
            <Button variant='outlined' type="submit">
                SEND Email
            </Button> 
          </form>
        </div>
      </AuthForm>
    </>
  )
}

export default ForgetPassword
