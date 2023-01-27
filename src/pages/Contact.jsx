import React from 'react'
import { useParams,useSearchParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { doc,getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const Contact = () => {
    const params=useParams()
    const [message,setMessage]=useState('')
    const [landlord,setLandlord]=useState(false)
    const [name,setname]=useState(null)
    const [email,setEmail]=useState(null)
 
    const [searchParams,setSearchParams]=useSearchParams()
    

    useEffect(()=>{
      const getLandlord=async()=>{
        const docRef=doc(db,'users',params.landlordId)
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
           
            setLandlord(true)
            setname(docSnap.data().name)
            setEmail(docSnap.data().email)
            
        }
        else{
            toast.error('could not get landlord data')
        }
      

      }
      getLandlord()
    },[params.landlordId])
    const onChange=(e)=>{setMessage(e.target.value)}
    

  return (
    <div className='pageContainer'>
        <header>
            <p className='pageHeader'>Contact Landlord</p>
        </header>
        {landlord == true && (
            <main>
            <div className='contactLandLord'>
                <p className='landLordName'>Contact {name}</p>
            </div>
        </main>

        )}

        <form className='messageForm'>
            <div className='messageDiv'>
                <label htmlFor="message" className='messageLabel'>Message</label>
                <textarea name="message" id="message"  value={message} onChange={onChange}></textarea> </div>

                <a href={`mailto:${email}?subject=${searchParams.get('listingName')}`}>
                    <button type='button' className='primaryButton'>send message</button>
                </a>
        </form>
            
        
    </div>
  )
}

export default Contact