import Cookies from "js-cookie";
import React from "react";

import { Navigate, Outlet } from "react-router-dom";

function useAuth(){
  const user = Cookies.get('loggedIn')
  if(user) return true
  else return false
}

function PublicRoutes(){
  const auth = useAuth()
  return auth? <Navigate to='/'/>: <Outlet/>
}
export default PublicRoutes