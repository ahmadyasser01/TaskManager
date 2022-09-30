import React, { useEffect, useState } from 'react'
import  { useContext } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import '../css/signup.css'
import   { ReactComponent as Illustration } from "../assets/signup.svg"
import { Alert, Button, TextField, Typography } from '@mui/material'
import { AuthContext } from '../context/Auth'
import API from '../utils/API'
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const { user,login,logout ,auth} = useContext(AuthContext);
  const [alert,setAlert] = useState(0); // zero means no alert 1 means success 2 means error
  const [msg,setMsg] = useState("")
  let navigate = useNavigate();


  const HandleSubmit = async (e)=>
  {
    setAlert(0)
    e.preventDefault();
    const res = await API.login({email,password});
    console.log(res)
    if(res.status === 'Success'   ){
      if(res?.data?.verified)
      {
        login(res.data);
      setEmail('');
      setPassword('');
      setTimeout(() =>navigate('/board'),500)
      }
      else {
        setAlert(2)
        setMsg(res.data);
        
      }
    }
    else{
       setAlert(2)
       setMsg(res.message);
    }
  }
  useEffect(()=>{
    console.log(auth);
    if(auth&&user.verified) navigate('/board');
  },[])

  return (
    
    <>  
      <AuthForm>
        <div className='login-container'>
          <div className="illustration-login">
            <Illustration/>
          </div>
          <h3>Login</h3>
          {
            alert!==0&&<Alert severity={alert===1 ? "success":"error"} color={alert===1 ? "success":"error"}>
            {msg}
          </Alert>
          }
          <form className='login-form' onSubmit={HandleSubmit}>
            <TextField
              onChange={e=>setEmail(e.target.value)}
              value={email}
              id='email'
              variant='outlined'
              placeholder='Email'
              autoComplete='off'
              sx={{padding:"2px"}}
              />
            <TextField
              onChange={e=>setPassword(e.target.value)}
              value={password}
              type='password'
              id='password'
              variant='outlined'
              placeholder='Password'
              autoComplete='off'
              sx={{padding:"2px"}}
              />
            <Button variant='outlined' type="submit">
              Login
            </Button>
            <div className='login-options'>
              <Button size="small" onClick={()=>navigate('/forgetpassword')}>
                Forgot Password?
              </Button>
              <div>
                <span>Don't have an account</span>
                <Button size="small" onClick={()=>navigate('/signup')}>
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
