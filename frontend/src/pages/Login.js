import React, { useState } from 'react'
import  { useContext } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import '../css/signup.css'
import   { ReactComponent as Illustration } from "../assets/signup.svg"
import { Button, TextField, Typography } from '@mui/material'
import { AuthContext } from '../context/Auth'
import API from '../utils/API'
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const { user,login,logout ,auth} = useContext(AuthContext);
  let navigate = useNavigate();


  const HandleSubmit = async (e)=>
  {

    e.preventDefault();
    const res = await API.login({email,password});
    console.log(res)
    if(res.status === 'Success' && res?.data ){
      login(res.data);
      navigate('/board')
      setEmail('');
      setPassword('');
    }
    else{
      /**
       * TODO: Handle login failure
       */
    }
  }
  return (
    
    <>  
      {auth?navigate('/board'):
      <AuthForm>
        <div className='login-container'>
          <div className="illustration-login">
            <Illustration/>
          </div>
          <h3>Login</h3>
          <form className='login-form' onSubmit={HandleSubmit}>
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
            <Button variant='outlined' type="submit">
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
      }
    </>

    
      
  )
}

export default Login
