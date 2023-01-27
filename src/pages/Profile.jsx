import React from 'react'
import { useState,useEffect } from 'react'
import { getAuth,updateProfile } from 'firebase/auth'
import { useNavigate,Link } from 'react-router-dom'
import { db } from '../firebase.config'
import { updateDoc,collection,getDocs,query,where,deleteDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from '../component/ListingItem'
import { toast } from 'react-toastify'
import Spinner from '../component/Spinner'


const Profile = () => {
  const [user,setUser]= useState(null)
  const [changeDetails,setChangeDetails]=useState(false)
  const [listing,setListing]=useState(null)
  const [loading,setLoading]=useState(true)
  const auth=getAuth()
  const [formData,setFormData]=useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })
  const { name,email }=formData
  const navigate=useNavigate()

 
  

  useEffect(()=>{
    setUser(auth.currentUser)
  },[])


  useEffect(()=>{
    const fetchUserListing=async()=>{
      const listingRef=collection(db,'listing'
        )
        const q=query(listingRef,where('userRef', '==' , auth.currentUser.uid))

        const querySnap=await getDocs(q)
        const listings=[]
        querySnap.forEach((doc)=>{
          return listings.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setListing(listings)
        setLoading(false)
    }

    fetchUserListing()

  },[auth.currentUser.uid])

const onLogout=()=>{
  auth.signOut()
  navigate('/')
}

const onSubmit=async(e)=>{
 
  try {
    if(auth.currentUser.displayName !== name){
      await updateProfile(auth.currentUser,{
        displayName:name
      })
    }

    //update in firestoe
    const userRef=doc(db,'users',auth.currentUser.uid)
    await updateDoc(userRef,{name,})
    
  } catch (error) {
    toast.error('bad user credential')
    
  }

}
const onChange=(e)=>{
  setFormData((prevState)=>({
    ...prevState,
    [e.target.id]:e.target.value
  }))
}

const onDelete=async(listingId)=>{
  if(window.confirm('are you sure you want to delete ??')){
    await deleteDoc(doc(db,'listing',listingId))

    const updateListings=listing.filter((listing)=>
    listing.id != listingId)
    setListing(updateListings)
    console.log('successfully delete update')
  }

}
if(loading){return <Spinner/>}

  return (
   <div className='profile'>
    <header className='profileHeader'>
      <p className='pageHeader'>My profile</p>
      <button type='button' className='logOut' onClick={onLogout}>LogOut</button>
    </header>
    <main>
      <div className='profileDetailsHeader'>
        <p className='profileDetailsText'>Personal Details</p>


        <p className='changePersonalDetails'
        onClick={()=>{changeDetails && onSubmit()
        setChangeDetails((prevState)=>!prevState)}}
        >{changeDetails?'done':'change'}</p>
      </div>
      <div className='profileCard'>
        <form onSubmit={onSubmit}>
          <input type="text" id='name' className={!changeDetails?'profileName':'profileNameActive'} 
          disabled={!changeDetails}
          value={name}
          onChange={onChange}/>
          

          <input type="text" id='email' className={!changeDetails?'profileEmail':'profileEmailActive'} 
          disabled={!changeDetails}
          value={email}
          onChange={onChange}/>
        
        </form>

      </div>
      <Link to='/create-listing' className='createListing' >
        <img src={homeIcon} alt="home" />
        <p>sell or rent Your Home</p>
        <img src={arrowRight} alt="arrowright" />
      </Link>
    </main>

    {!loading && listing?.length >0 && (<>
    <p className='listingText'>Your Listing</p>
    <ul className='listingList'>
      {listing.map((listing)=>(
        <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={()=>onDelete(listing.id)}/>
      ))}

    </ul>
    </>)}
   </div>

   
  )
}

export default Profile