import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Board from './pages/Board'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path='/board' element={<Board/>}/>
      </Routes>
    </div>
  );
}

export default App;
