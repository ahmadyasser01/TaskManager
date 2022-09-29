import React, { useEffect, useState } from 'react'
import  { useContext } from 'react'
import AuthForm from '../components/AuthForm/AuthForm'
import '../css/signup.css'
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import   { ReactComponent as Illustration } from "../assets/signup.svg"
import API from '../utils/API';
import { AuthContext } from '../context/Auth'
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmpassword,setConfirmPassword] = useState("");
  const [alert,setAlert] = useState(0); // zero means no alert 1 means success 2 means error
  const [msg,setMsg] = useState("")
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
        setAlert(1)
        setMsg("Signup successful, An email will be sent to verify your account")
        /**
         * TODO: SHOW MESSAGE TO USER
         */
        //**navigate to login */
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
          {
            alert!==0&&<Alert severity="success" color="info">
            {msg}
          </Alert>
          }
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
              <span>Have an account</span>
              <Button size="small"  onClick={()=>navigate('/login')}>
                Login
              </Button>
            </div>   

          </form>
        </div>
      </AuthForm>
    </>
  )
}

export default Signup
