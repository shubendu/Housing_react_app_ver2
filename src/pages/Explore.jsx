import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from './Slider'
const Explore = () => {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Explore</p>

      </header>
      <main>{/**slider*/}
      <Slider/>
      <p className='exploreCategoryHeading'>Categories</p>
      <div className='exploreCategories'>
        <Link to='/category/rent'>
        <p className='exploreCategoryName'>Place For Rent</p>
          <img src={rentCategoryImage} alt="rent" className='exploreCategoryImg' />
          <br />
        
        </Link>

        <Link to='/category/sale'>
        <p className='exploreCategoryName'>Place For sale</p>
        <div>
          <img src={sellCategoryImage} alt="sell" className='exploreCategoryImg' />
          </div>
          <br />
         
        </Link>
          <br />
          <br />
          
      </div>
      </main>
      
    </div>
  )
}

export default Explore