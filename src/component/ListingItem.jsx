import React from 'react'
import { Link } from 'react-router-dom'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'
import   { RiDeleteBin6Line} from 'react-icons/ri'

const ListingItem = ({listing,id,onDelete}) => {
  return (
    <li className='categoryListing'>
        <Link  className='categoryListingLink' to={`/category/${listing.type}/${id}` }>
            <img src={listing.imgUrls[0]} alt={listing.name}
            className='categoryListingImg' />

            <div className='categoryListingDetails'>
                <p className='categoryListingLocation'>{listing.location}</p>
                <p className='categoryListingName'>{listing.name}</p>
                <p className='categoryListingPrice'>${listing.offer ? listing.discountedPrice:listing.regularPrice}
                {listing.type==='rent'&&'/month'}</p>
                <div className='categoryLisitngInfoDiv'>
                   
                    <p className='categoryListingInfoText'> 
                   
                    <img src={bedIcon} alt="bed"  />
         
                        {listing.bedrooms >1 ? `${listing.bedrooms}bedrooms   `:'1bedroom '} 
    
                       
                        
                    <img src={bathtubIcon} alt="bath" />
                   
                        {listing.bathroom>1?`${listing.bathrooms} bedroom`:'1bathroom'}
                        
                        </p>
                </div>
            </div>
        </Link>
        <div className='categoryListingLink'>
        { onDelete && (
        <RiDeleteBin6Line
        size={32}
        className='removeIcon'
       
        onClick={()=>onDelete(listing.id,listing.name)}
        />
    ) } 
             
        </div>
    </li>
  )
}

export default ListingItem