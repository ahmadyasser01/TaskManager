import React, { useState } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import '../css/signup.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import   { ReactComponent as Illustration } from "../assets/signup.svg"


const Signup = () => {
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirmpassword,setConfirmPassword] = useState("")

  return (
    <>
      <AuthForm>
        <div className='signup-container'>
          <div className='illustration-login'>
            <Illustration/>
          </div>
          <h3>Sign up</h3>
          <form className='signup-form'>
            <TextField
              onChange={e => setUsername(e.target.value)}
              value={username}
              id='username'
              variant='outlined'
              placeholder='Username'
              autoComplete='false'
              sx={{padding:"2px"}}
               />
            <TextField
              onChange={e=>setEmail(e.target.value)}
              value={email}
              id='email'
              variant='outlined'
              placeholder='Email'
              autoComplete='false'
              sx={{padding:"2px"}}
               />
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
              Sign up
            </Button> 
            <div className='login-options'>
              <span>Don't have an account</span>
              <Button size="small">
                Signup
              </Button>
            </div>   

          </form>
        </div>
      </AuthForm>
    </>
  )
}

export default Signup
