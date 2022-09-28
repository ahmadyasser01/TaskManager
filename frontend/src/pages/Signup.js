import React, { useEffect, useState } from 'react'
import  { useContext } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import '../css/signup.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import   { ReactComponent as Illustration } from "../assets/signup.svg"
import API from '../utils/API';
import { AuthContext } from '../context/Auth'
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmpassword,setConfirmPassword] = useState("");
  let navigate = useNavigate();
  const { user,login,logout ,auth} = useContext(AuthContext);

  useEffect(()=>{
    console.log(auth);
    if(auth) navigate('/board');
  },[])




  const HandleSubmit = async (e)=>{
    e.preventDefault();
    /**
     * TODO: DO FORM VALIDATION IN THE FRONT-END
     */
    if(password !== confirmpassword){
      console.log("password and confirmpassword are not the same");
    }else{
      const res = await API.signup({username,email,password});
      if(res.status === "Success")
      {
        console.log("from signup component res is  ", res);
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        /**
         * TODO: SHOW MESSAGE TO USER
         */
      }
    }
  }

  return (
    <>
      <AuthForm>
        <div className='signup-container'>
          <div className='illustration-login'>
            <Illustration/>
          </div>
          <h3>Sign up</h3>
          <form className='signup-form' onSubmit={(e)=>HandleSubmit(e)}>
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
            <Button variant='outlined' type="submit">
              Sign up
            </Button> 
            <div className='login-options'>
              <span>Don't have an account</span>
              <Button size="small" >
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