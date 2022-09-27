import React, { useState } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import '../css/signup.css'
import   { ReactComponent as Illustration } from "../assets/signup.svg"
import { Button, TextField, Typography } from '@mui/material'



const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  return (
    <>
      <AuthForm>
        <div className='login-container'>
          <div className="illustration-login">
            <Illustration/>
          </div>
          <h3>Login</h3>
          <form className='login-form'>
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
            <Button variant='outlined'>
              Login
            </Button>
            <div className='login-options'>
              <Button size="small">
                Forget Password?
              </Button>
              <div>
                <span>Don't have an account</span>
                <Button size="small">
                  Signup
                </Button>
              </div>
            </div>    
          </form>
        </div>
      </AuthForm>
    </>
  )
}

export default Login
