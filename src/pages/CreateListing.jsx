import React from 'react'
import { useState,useEffect } from 'react'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../component/Spinner'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db } from '../firebase.config'
import { addDoc,collection,serverTimestamp  } from 'firebase/firestore'
import { toast } from 'react-toastify'


const CreateListing = () => {
    const [loading,setLoading]=useState(false)

    const [formData,setFormData]=useState({
        type:'sale',
        name:'',
        bedrooms:1,
        bathrooms:1,
        offer:true,
        regularPrice:0,
        discountedPrice:0,
        parkings:true,
        furnish:false,
        images:{},
        latitude:0,
        longitude:0,
        address:''
    })
    const {type,name,bedrooms,bathrooms,offer,regularPrice,discountedPrice,parkings,furnish,images,latitude,longitude,address}=formData
    const [geolocation,setGeolocation]=useState(false)
    const auth=getAuth()
    const navigate=useNavigate()
    const isMounted=useRef(true)
    useEffect(()=>{
        if(isMounted){
            onAuthStateChanged(auth,(user)=>{
                if(user){
                    setFormData({...formData,userRef:user.uid})
                }
                else{
                    navigate('/sign-in')
                }
            })
        }
        return ()=>{
            isMounted.current=false
        }
    },[isMounted])
    const onMutate=(e)=>{
        let boolean=null
        if(e.target.value==='true'){
            boolean=true
        }
        if(e.target.value==='false'){
            boolean = false
        }

       
        //ffiles
        if(e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                images : e.target.files
            }))
        }

        if(!e.target.files){
            setFormData((prevState)=>({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }))
        }
    
       
    }
    const onSubmit=async(e)=>{
        e.preventDefault()
        console.log(123)
        setLoading(true)
        console.log(formData)
       
        
        if(images.length>6){
            setLoading(false)
            toast.success('images max 6 allowed')
            return 
        }

        //location
        
        let geolocation={}
        let location 
        if (geolocation){}
        else{
            geolocation.lat=latitude
            geolocation.lng=longitude
            location=address
        }

        //store images to firebase(for images)
        const storeImage=async(image)=>{
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName=`${auth.currentUser.uid}-${image.name}-${uuidv4()}`
                const storageRef = ref(storage, 'images/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef,image);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    reject(error)
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      resolve(downloadURL)
    });
  }
);




            })
        }


        const imgUrls= await Promise.all(
            [...images].map((image)=>storeImage(image))
        )
            .catch(()=>{
                setLoading(false)
                console.log('image not upload')
                return
            })
            console.log(imgUrls)
            setLoading(false)
           //save listing to fire store

           const formDataCopy={...formData,imgUrls,geolocation,timestamp:serverTimestamp()}


           formDataCopy.location=address

           delete formDataCopy.images
           delete formDataCopy.address
           !formDataCopy.offer && delete formDataCopy.discountedPrice

           const docRef=await addDoc(collection(db,"listing"),formDataCopy)
           setLoading(false)
           console.log('listed saved')
           navigate(`/category/${formDataCopy.type}/${docRef.id}`)
        

        }



    if(loading){
        return<Spinner/>
    }

    

  return (
    <div className='profile'>
        <header>
            <p className='pageHeader'>Create a listing</p>
        </header>
        <main>
            <form onSubmit={onSubmit} >
                <label className='formlabel'>Sale/Rent</label>

                <div className='formButtons'>
                    <button
                     type='button'
                      className={type==='sale'?'formButtonActive':'formButton'}
                    id='type'
                    value='sale'
                    onClick={onMutate}
                    >sale</button>

                    <button 
                    
                    type='button'
                     className={type==='rent'?'formButtonActive':'formButton'}
                    id='type' 
                    value='rent'
                     onClick={onMutate}
                    >Rent</button>
                   
                </div>
                <br />
                <label className='formlabel'>Name</label>
               
                <input 
                type="text"
                 required
                  value={name}
                onChange={onMutate} maxLength='32'
                 minLength={10}
                id='name' />
               
                <div className='formRooms flex'>
                    <div>
                        <label className='formlabel'>bedrooms</label>
                        <input 
                        type="number" className='formInputSmall' 
                        id='bedrooms'
                        onChange={onMutate}
                        value={bedrooms}
                        min='1'
                        max='50' />
                    </div>

                    <div>
                        <label className='formlabel'>bathrooms</label>
                        <input 
                        type="number" className='formInputSmall' id='bathrooms'
                        onChange={onMutate}
                        value={bathrooms}
                        min='1'
                        max='50' required />
                    </div>
                    </div>
                    <label className='formlabel'>Parking slot</label>
                    <div className='formButtons'>
                        <button 
                        className={parkings?'formButtonActive':'formButton'}
                        type='button'
                        id='parkings'
                        value={true}
                        onClick={onMutate}
                        >Yes</button>

                       <button 
                        className={!parkings &&parkings!==null?'formButtonActive':'formButton'}
                        type='button'
                        id='parkings'
                        value={false}
                        onClick={onMutate}
                        >No</button>
                    </div>
                    <label className='formlabel'>furnished</label>
                    <div className='formButtons'>
                        <button 
                        type='button'
                        className={furnish?'formButtonActive':'formButton'}
                        id='furnish'
                        value={true}
                        onClick={onMutate}
                        >yes</button>

                       <button 
                        type='button'
                        className={!furnish && furnish !==null?'formButtonActive':'formButton'}
                        id='furnish'
                        value={false}
                        onClick={onMutate}
                        >No</button>
                    </div>
                    <label className='formLabel'>Address</label>
                    <textarea className="formInputAddress" id="address" type='text' value={address}  onChange={onMutate}></textarea>

                    {!geolocation && (
                        <div className='formLatLng flex'>
                            <div>
                                <label className='formLabel'>Latitute</label>
                                <input type="number" className='formInputSmall' onChange={onMutate} id='latitude' value={latitude} required />

                                <label className='formLabel'>Longitude</label>
                                <input type="number" className='formInputSmall' onChange={onMutate} id='longitude' value={longitude} required />
                            </div>
                        </div>
                    )}
                    <label className='formLabel'>Offer</label>
                <div className='formButtons'>
                    <button className={offer?'formButtonActive':'formButton'}
                    type='button'
                    id='offer'
                    value={true}
                    onClick={onMutate}
                    >Yes</button>

                    <button className={!offer && offer!==null ?'formButtonActive':'formButton'}
                    type='button'
                    id='offer'
                    value={false}
                    onClick={onMutate}
                    >No</button>
                </div>

                {offer && (<>
                <label className='formLabel'>Discounted Price</label>
                <input 
                type="number"
                className='formInputSmall'
                id='discountedPrice'
                value={discountedPrice}
                min='50'
                max='79000000'
                required={offer}
                onChange={onMutate}
                />
                </>)}
                <label className='formLabel'>Regular Price</label>
            <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='750000000'
              required
              
            />  
            {type=='rent' && <p className='formPriceText'>$/month</p>}
            </div>

            <label className='formLabel'>Images</label>
            <p className='imagesInfo'>the first image will be the cover max(6)</p>

            <input type="file" className='formInputFile' id='images'onChange={onMutate} max='6'
            accept='.jpg,.png,.jpeg' multiple required />

            <button type='submit' className='primaryButton createListingButton'>Create Listing</button>

            </form>
        </main>
    </div>
  )
}

export default CreateListing