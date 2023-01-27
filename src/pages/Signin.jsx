import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import OAuth from '../component/OAuth'
import { toast } from 'react-toastify'

const Signin = () => {
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })
  const navigate=useNavigate()
  const {email,password }=formData
  const [showPassword,setShowPassword]=useState(true)
  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value,


    }))

  }

const onSubmit=async(e)=>{
  e.preventDefault()
  try {
    const auth=getAuth()
    const userCredential= await  signInWithEmailAndPassword(auth, email, password)
    if(userCredential.user){
      navigate('/profile')
    }
   

    
  } catch (error) {
    toast.error('bad user credential')
    
  }
}

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcom Back!!</p>
      </header>
      <form onSubmit={onSubmit}>
        <input type="text" className='emailInput' placeholder='Email' id='email'value={email} onChange={onChange} />

        <div className='passwordInputDiv'>
          <input 
          type={showPassword?'text':'password'}
          className='passwordInput'
          placeholder='password'
          id='password'
          value={password}
          onChange={onChange}
          />
          <img src={visibilityIcon} alt="showpassword"
          className='showPassword'
          onClick={()=>setShowPassword((prevState)=>!prevState)} />
          
        </div>
        <Link to='/forgetpassword' className='forgotPasswordLink'>Forget password</Link>
        <div className='signInBar'>
          <p className='signInText'>sign-in</p>
          <button className='signInButton'>
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
          </button>
        </div>
      </form>
      <OAuth/>
      <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
      <br />
      <br />
      <br />
    </div>
  )
}

export default Signin