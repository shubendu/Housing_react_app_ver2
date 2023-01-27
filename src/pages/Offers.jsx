import React from 'react'
import { useEffect,useState } from 'react'
import { collection,getDocs,query,where} from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from '../component/Spinner'
import ListingItem from '../component/ListingItem'
import { toast } from 'react-toastify'

const Offer = () => {
   
    const [listing,setListing]=useState(null)
    const [loading,setLoading]=useState(true)
   
    useEffect(()=>{
       const fetchListing=async()=>{
        try {
            const listingRef=collection(db,'listing')
            const q=query(listingRef,where('offer','==',true))


            const querySnap=await getDocs(q)
         
          const listing=[]

          querySnap.forEach((doc)=>{
            
            return listing.push({
                id:doc.id,
                data:doc.data()
            })
        })
        setListing(listing)
        console.log(listing)
        setLoading(false)

            
            
        } catch (error) {
           toast.error('could not fetxh data')
            
        }
       }
       fetchListing()
    },[])

  return (
    <div className='category'>
     
        <header>
          <p className='pageHeader'>
           Offer
          </p>
        </header>
        { loading ? <Spinner/>:listing && listing.length>0 ?<main>
            <ul className='categoryListings'>
                {
                    listing.map((list)=>(
                      <ListingItem listing={list.data} id={list.id} key={list.id}/>
                    ))
                }
                </ul>
        </main>:(<p>there is no current Offer</p>) }
      
    </div>
  )
}

export default Offer