import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection,getDocs,query,where} from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from '../component/Spinner'
import ListingItem from '../component/ListingItem'
import { toast } from 'react-toastify'

const Category = () => {
    const params=useParams()
    const [listing,setListing]=useState(null)
    const [loading,setLoading]=useState(true)
   
    useEffect(()=>{
       const fetchListing=async()=>{
        try {
            const listingRef=collection(db,'listing')
            const q=query(listingRef,where('type','==',params.categoryName))


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
            toast.error('bad user credential')
            
        }
       }
       fetchListing()
    },[])

  return (
    <div className='category'>
     
        <header>
          <p className='pageHeader'>
           {params.categoryName==='rent'?'place for rent':'place for sale'}
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
        </main>:(<p>No listing yet</p>) }
      
    </div>
  )
}

export default Category