import React from 'react'
import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { setDoc,doc,serverTimestamp } from 'firebase/firestore';
import { Link,useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { db } from '../firebase.config';
import OAuth from '../component/OAuth';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData,setFormData]=useState({
    email:'',
    password:'',
    name:''
  })
  const navigate=useNavigate()
  const {email,password,name }=formData
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
    const auth = getAuth();
    const userCredential= await createUserWithEmailAndPassword(auth, email, password)
    const user=userCredential.user
    updateProfile(auth.currentUser,{
      displayName:name,
    })
    
    
    navigate('/')
    console.log(user)
    //save to firedata base
    const formDateCopy={...formData}
    formDateCopy.timestamp=serverTimestamp()
    await setDoc(doc(db,"users",user.uid),formDateCopy)
    


    
  } catch (error) {
    toast.error('somthing went wrong with registration')
    
  }

 }


  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Welcom Back!!</p>
      </header>
      <form onSubmit={onSubmit}>
      <input type="text" className='nameInput' placeholder='Name' id='name'value={name} onChange={onChange} />

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
        <div className='signUpBar'>
          <p className='signUpText'>sign-Up</p>
          <button className='signUpButton'>
            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
          </button>
        </div>
      </form>
      <OAuth/>
      <Link to='/sign-in' className='registerLink'>Sign in instead </Link>
      <br />
      <br />
      <br />
    </div>
  )
}

export default Signup