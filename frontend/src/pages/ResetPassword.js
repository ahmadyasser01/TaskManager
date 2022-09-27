import React, { useState } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import '../css/signup.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import   { ReactComponent as Illustration } from "../assets/signup.svg"

const ResetPassword = () => {
  const [password,setPassword] = useState("")
  const [confirmpassword,setConfirmPassword] = useState("")
  return (
    <>
      <AuthForm>
        <div className='reset-container'>
          <div className="illustration-login">
              <Illustration/>
          </div>
          <h3>Forget Password?</h3>
          <form className='reset-form'>
            <TextField
              onChange={e=>setPassword(e.target.value)}
              value={password}
              type='password'
              id='password'
              variant='outlined'
              placeholder='Password'
              autoComplete='false'
              sx={{padding:"2px"}}
            />
            <TextField
              onChange={e=>setConfirmPassword(e.target.value)}
              value={confirmpassword}
              id='confirmpassword'
              type='password'
              variant='outlined'
              placeholder='Confirm Password'
              autoComplete='false'
              sx={{padding:"2px"}}
            /> 
            <Button variant='outlined'>
                Change Password
            </Button> 
          </form>
        </div>
      </AuthForm>
    </>
  )
}

export default ResetPassword
