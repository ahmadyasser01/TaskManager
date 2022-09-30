import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import   { ReactComponent as Illustration } from "../assets/notfound.svg"
import { AuthContext } from '../context/Auth';
import '../css/notfound.css'
const NotFound = () => {
    const { user,login,logout ,auth} = useContext(AuthContext);
    let navigate = useNavigate();
    useEffect(() => {
        if(auth && user.verified){
            setTimeout(() => navigate('/board'),2000)
        }
        else {
            setTimeout(() => navigate('/login'),2000)
        }
    },[])
  return (
    <div className='not-found'>
      <Illustration/>
    </div>
  )
}

export default NotFound
