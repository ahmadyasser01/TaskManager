import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import API from '../utils/API';
import { useNavigate } from "react-router-dom";

const Verify = () => {
    let navigate = useNavigate();
    const {token} = useParams();
    const verify = async ()=>{
        const res = await API.verifyAccount(token);
        console.log(res)
        if(res.status === "Success"){
            navigate('/login');
        }
    }
    useEffect(()=>{
        verify(); 
    },[]);
  return (
    <div>
      Verified
    </div>
  )
}

export default Verify
