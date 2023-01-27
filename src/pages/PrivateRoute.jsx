import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useAuthStatus } from '../Hooks/useAuthStatus'
import Spinner from '../component/Spinner'

const PrivateRoute = () => {
    const { loggedIn,checkingStatus }=useAuthStatus()
    if(checkingStatus){
        return <Spinner/>
    }

  return (
   loggedIn?<Outlet/>:<Navigate to='/sign-in/'/>
  )
}

export default PrivateRoute