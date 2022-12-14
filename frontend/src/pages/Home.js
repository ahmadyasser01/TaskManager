import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import '../css/home.css'
import AssignmentIcon from '@mui/icons-material/Assignment';
import hero from '../assets/Group.png'
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const { user,login,logout ,auth} = useContext(AuthContext);
  let navigate = useNavigate();

  return (
    <div className='home'>
      <div className='home-container'>
        <div className='home-logo-container'>
          <AssignmentIcon/>
          <h2>Task Manager</h2>
        </div>
        <main className='home-main'>
          <section className='main-left'>
            <h1 className='hero-text'>
              Manage Your Personal Tasks Easily
            </h1>
            <p>
              fast and simply way to manage your Personal tasks
            </p>
            <Button 
            sx={{backgroundColor:"#FF3366", color:"#FFF"}}
            onClick={()=> navigate('/signup')}
            >Sign up</Button>
          </section>
          <section className='main-right'>
            <img 
              src={hero}
            />
          </section>
        </main>
        <footer>
            created By AY
        </footer>

      </div>
    </div>
  )
}

export default Home
