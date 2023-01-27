import React from 'react'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth,sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

const Forgetpassword = () => {
  const [email,setEmail]=useState('')

  const onChange=(e)=>setEmail(e.target.value)

const onSubmit=async(e)=>{
  e.preventDefault()
  try {
    const auth=getAuth()
    await sendPasswordResetEmail(auth,email)
   toast.success('email was send')
    
  } catch (error) {
    toast.error(error)
    
  }


}

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>ForgetPassword</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange}/>

          <Link className='forgetPasswordLink'  to='/sign-in' ></Link>

          <div className='signInbar'>
            <div className='signInBar'>Send Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px'/>

            </button>
          </div>
        </form>
      </main>
    
    </div>
  )
}

export default Forgetpassword