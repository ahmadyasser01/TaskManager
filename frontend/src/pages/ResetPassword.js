import React, { useState } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import '../css/signup.css'
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import   { ReactComponent as Illustration } from "../assets/signup.svg"
import { useNavigate } from "react-router-dom";
import API from '../utils/API';
import { useParams } from 'react-router-dom';


const ResetPassword = () => {
  let navigate = useNavigate();
  const [password,setPassword] = useState("");
  const [confirmpassword,setConfirmPassword] = useState("");
  const {token} = useParams();
  const [alert,setAlert] = useState(0); // zero means no alert 1 means success 2 means error
  const [msg,setMsg] = useState("")


  const HandleSubmit = async (e)=>{
    e.preventDefault();
    if(password !== confirmpassword) 
    {
      console.log("password and confirmpassword are not the same");
      setAlert(2)
      setMsg("password and confirmpassword are not the same")

    }
    const res = await API.resetPassword(password,token);
    console.log(res);
    if (res.status === "Success" ){
      setAlert(2)
      setMsg("password Changed Successfully\n going to login again")
      setTimeout(()=>{
        navigate('/login')

      },3000)


    }
    else{
      setAlert(2)
      setMsg(res.message)
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
          {
            alert!==0&&<Alert severity={alert===1 ? "success":"error"} color={alert===1 ? "success":"error"}>
            {msg}
          </Alert>
          }
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
            <Button variant='outlined' type="submit">
                Change Password
            </Button> 
          </form>
        </div>
      </AuthForm>
    </>
  )
}

export default ResetPassword
