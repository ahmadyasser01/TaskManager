import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import API from '../utils/API';
import { useNavigate } from "react-router-dom";
import '../css/verify.css'
const Verify = () => {

    let navigate = useNavigate();
    const {token} = useParams();
    const [msg,setMsg] = useState('Verfying...')
    const verify = async ()=>{
        const res = await API.verifyAccount(token);
        console.log(res)
        if(res.status === "Success"){
            navigate('/login');
        }
        else
        {
          setMsg(res.message);
          navigate('/login');

        }
    }
    useEffect(()=>{
        verify(); 
    },[]);
  return (
    <div className='verify'>
      <h1>{msg}</h1>
    </div>
  )
}

export default Verify
