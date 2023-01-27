import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase.config'
import { collection,getDocs,query,orderBy,limit } from 'firebase/firestore'
import Spinner from '../component/Spinner'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const Slider = () => {
    const [loading,setLoading]=useState(true)
    const [listing,setListing]=useState(null)
    const navigate=useNavigate()
    const mystyle = {
        borderRadius:'15px',
     
      };

    useEffect(()=>{
        const fetchlisting=async()=>{
            const listingRef=collection(db,'listing')
            const q=query(listingRef,orderBy('timestamp','desc'),limit(5))
            const querySnap=await getDocs(q)
            let listings=[]
            querySnap.forEach((doc)=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
            })
            setListing(listings)
            console.log(listings)
            setLoading(false)
        }
        fetchlisting()
    },[])

    if(loading){return <Spinner/>}
return(
    listing &&  (
        <>
        <p className='exploreHeading'>Recomanded</p>
        <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    
      
     
    >
     { listing.map(({data,id})=>(
       <SwiperSlide
       key={id}
       onClick={()=>navigate(`/category/${data.type}/${id}`)}
       ><div className='swiperSlideDiv'>
      <img src={data.imgUrls[0]} alt="" style={mystyle} height='300' width='1000'  />
        
      </div>
     
     
     
        <p className='swiperSlideText'>{data.name}</p>
        <p className='swiperSlidePrice'>${data.discountedPrice ?? data.regularPrice}
        {data.type==='rent' && '/month'}</p>
     
       </SwiperSlide>


     )) }
    </Swiper>

        </>
    )
       
    )
}
export default Slider