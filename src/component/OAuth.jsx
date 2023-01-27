import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { getAuth,signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import { doc,setDoc,getDoc,serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'


const OAuth = () => {
    const location=useLocation()
    const navigate=useNavigate()

    const onGoogleClick=async()=>{
        try {
            const auth=getAuth()
            const provider=new GoogleAuthProvider()
            const result=await signInWithPopup(auth,provider)
            const user=result.user
            const docRef=doc(db,'users',user.uid)
            const docSnap=await getDoc(docRef)
            if(!docSnap.exists()){
                await setDoc(doc(db,'users',user.uid),{
                    name:user.displayName,
                    email:user.email,
                    timestamp:serverTimestamp()
                })
            }
            navigate('/')
            
        } catch (error) {
            console.log('coult not authorised with google')
            
        }
    }

  return (
    <div className='socialLogin'>
        <p>sign {location.pathname==='/sign-up'?'up':'in'} with</p>
        <button className='socialIconDiv' onClick={onGoogleClick}>
            <img src={googleIcon} alt="google" className='socialIconImg'  />
        </button>
    </div>
  )
}

export default OAuth