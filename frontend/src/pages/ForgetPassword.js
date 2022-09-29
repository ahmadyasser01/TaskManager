import { Alert, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import '../css/signup.css'
import   { ReactComponent as Illustration } from "../assets/signup.svg"
import AuthForm from '../components/AuthForm/AuthForm'
import API from '../utils/API'

const ForgetPassword = () => {
  const [email,setEmail] = useState("")
  const [alert,setAlert] = useState(0); // zero means no alert 1 means success 2 means error
  const [msg,setMsg] = useState("")
  const HandleSubmit = async (e)=>{
    e.preventDefault();
    if(email=== "") {
      setAlert(2);
      setMsg("Please enter your email address");
      return;
    }
    const res = await API.forgotPassword(email);
    console.log(res);
    if (res.status === "Success" ){
       setAlert(1);
       setMsg("Reset Token is sent successfully to your email");
    }
    else{
      setAlert(2);
      setMsg("Erorr happened");
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
          {
            alert!==0&&<Alert severity={alert===1 ? "success":"error"} color={alert===1 ? "success":"error"}>
            {msg}
          </Alert>
          }
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
