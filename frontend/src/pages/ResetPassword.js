import React, { useState } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import '../css/signup.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import   { ReactComponent as Illustration } from "../assets/signup.svg"
import { useNavigate } from "react-router-dom";
import API from '../utils/API';

const ResetPassword = () => {
  let navigate = useNavigate();
  const [password,setPassword] = useState("");
  const [confirmpassword,setConfirmPassword] = useState("");

  const HandleSubmit = async (e)=>{
    e.preventDefault();
    if(password !== confirmpassword) 
    {
      /**
       * TODO: Handle error message
       */
    }
    const res = await API.ResetPassword(password);
    if (res.status === "Success" ){
      navigate('/login')
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
        <div className='reset-container'>
          <div className="illustration-login">
              <Illustration/>
          </div>
          <h3>Forget Password?</h3>
          <form className='reset-form' onSubmit={HandleSubmit}>
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
