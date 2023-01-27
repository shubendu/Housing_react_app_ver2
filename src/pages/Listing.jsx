import React from 'react'
import { useParams } from 'react-router-dom'
import {useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { getDoc,doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../component/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const Listing = () => {
   
 
    const auth=getAuth()
    const params=useParams()
    const navigate=useNavigate()
    const [listing,setListing]=useState(null)
   const [loading,setLoading]=useState(true)
   const [shareLinkCopied,setShareLinkCopied]=useState(false)
   const mystyle = {
    backgroundColor: "black",
    borderRadius:'10px',
    display:'block',
    width:'40%',
    height:'30%',

    marginLeft:'auto',
    marginRight:'auto',
   
  
   
  };
   useEffect(()=>{
    const fetchListing=async()=>{
        const docRef=doc(db,'listing',params.listingId)
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
            setListing(docSnap.data())
            setLoading(false)
            console.log(docSnap.data())
        }
    }
    fetchListing()
   },[navigate,params.listingId])

   if(loading){
    return <Spinner/>
   }
    
    
  return (
    <main>
        
        <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
        {listing.imgUrls.map((url,index)=>
        <SwiperSlide key={index}>
            <div className='swiperSliderDiv' >
            <img src={listing.imgUrls[index]} 
           style={mystyle} 
            alt="" /> 
            </div>
          

                 
        </SwiperSlide>
        )}
      
     
    </Swiper>
        
        <div className='shareIconDiv'
        onClick={()=>{navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(()=>{
            setShareLinkCopied(false)
        },2000)
        }}
        
        >
            <img src={shareIcon} alt="" />

        </div>
        { shareLinkCopied && <p className='linkCopied'>Link Copied</p> }

        <div className='listingDetails'>
            <p className='listingName'>
                {listing.name}-${listing.offer?listing.discountedPrice.toString():listing.regularPrice.toString()}
            </p>
            <p className='listingLocation'>{listing.location}</p>
            <p className='listingType'>
                for{ listing.type === 'rent'?'Rent':'sale' }
            </p>
            { listing.offer && ( <p className='discountPrice'> ${listing.regularPrice-listing.discountedPrice}discount</p> )}

            <ul className='listingDetailsList'>
                <li >
                    {listing.bedrooms>1?`${listing.bedrooms}bedrooms`:'1bedroom'}
                </li>

                <li >
                    {listing.bathrooms>1?`${listing.bathrooms}bathrooms`:'1bedroom'}
                </li>
                <li>{listing.parkings && 'Parking Slot'}</li>
                <li>{listing.furnish && 'Furnished'}</li>
            </ul>

            {auth.currentUser?.uid !== listing.userRef && (
                <Link to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`}
                className='primaryButton'>
                    Contact Landload
                </Link>
            )}
       

        </div>
    </main>
  )
}

export default Listing