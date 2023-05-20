import React, { createContext, useState } from "react";
import Header from "./components/header";
import Signup from "./components/signup";
import Profile from "./components/profile";
import Login from "./components/login";
import Home from "./components/home";
import CreatePost from "./components/createPost";
import { EditProfile } from "./components/editProfile";
import OtherProfile from "./components/otherProfile";
import { Routes, Route } from 'react-router-dom'
import Notification from "./components/notification";
import Connection from "./components/connection";
import MyConnections from "./components/my-connections";
import ProtectedRoutes from "./components/protected-routes";
import PublicRoutes from "./components/public-routes";
import LoadingBar from 'react-top-loading-bar'

export const progressContext = createContext()

function App() {
  const [progress, setProgress] = useState(0)


  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <progressContext.Provider value={{ progress, setProgress }}>
        <Routes>
          {/* <Route path="/" element={<><Header /><ProtectedRoutes /></>}> */}
          <Route path="/" element={<><ProtectedRoutes /></>}>
            <Route path="/" element={<Home />} />
            <Route path="/user-profile" element={<OtherProfile />} />
            <Route path="/my-profile" element={<Profile />} />
            <Route path="/update-profile" element={<EditProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/conn" element={<Connection />} />
            <Route path="/my-connections" element={<MyConnections />} />
          </Route>


          <Route path={`login`} element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path={`register`} element={<PublicRoutes />}>
            <Route path="/register" element={<Signup />} />
          </Route>




        </Routes>
      </progressContext.Provider>
    </>
  )
}

export default App;
