import React from 'react'
import './AuthForm.css'
const AuthForm = ({children}) => {
  return (
    <div className='parent'>
        <div className='form-container'>
            {children}
        </div>
    </div>
  )
}

export default AuthForm
