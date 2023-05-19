import Cookies from "js-cookie";
import React from "react";

import {Navigate, Outlet} from 'react-router-dom'
import Header from "./header";

const useAuth = () => {
  const user = Cookies.get('loggedIn')
  if(user) return true
  else return false
}

function ProtectedRoutes(){
  const auth = useAuth()
  // return auth ? <Outlet/>:<Navigate to='/login'/>
  return auth ? <> <Header/> <Outlet/> </>:<Navigate to='/login'/>
}

export default ProtectedRoutes