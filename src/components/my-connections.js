import React, { useContext, useEffect, useState } from "react";
import cred from '../env'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios'
import { progressContext } from "../App";

function MyConnections() {
  const navigate = useNavigate()
  const [connections, setConnections] = useState([])
  const { progress, setProgress } = useContext(progressContext)
  const [isPageCalled, setIsPageCalled] = useState(false)


  async function callConnectionPage() {
    setProgress((progress) => progress + 60)
    try {
      const response = await axios.get(`${cred.BACKEND_URL}/get-connections`, {
        params: {
          userId: Cookies.get('userId')
        },
        headers: {
          Authorization: Cookies.get('jwtToken')
        }
      })
      setProgress(100)
      // console.log(response.data.message)
      setConnections(response.data.message)
      setIsPageCalled(true)
    } catch (err) {
      setProgress(100)
      console.log(err)
    }
  }

  function connectionClick(e) {
    const sender = e
    if (e._id == Cookies.get('userId')) navigate('/my-profile')
    else navigate('/user-profile', { state: { sender } })
  }

  useEffect(() => {
    callConnectionPage()
  }, [])

  return (
    <>
      <div className="p-2">
        <div className="connection-container rounded-4 my-5 container">

          <h2 className="connection-heading text-center mb-5 pt-4">Connections</h2>
          {isPageCalled && connections.length === 0 ? <p className=" text-center fw-medium">You have no connections, start connecting</p> : 
          
          <div className="connection-row row row-cols-1 row-cols-lg-2 g-3 pb-3">

            {connections.map(({ connection }, index) => {
              return (
                <div className="col" key={`connection-${index}`}>
                  <div onClick={() => connectionClick(connection)} className="connection p-2 d-flex rounded-3">
                    <img src={`${cred.BACKEND_URL}/${connection.profilePhoto}`} className=" img-fluid border border-2" style={{ width: '4rem', height: '4rem', borderRadius: '10px' }} />
                    <h5 className="my-auto ms-4" style={{ color: 'white', fontWeight: 'normal' }} >{connection.name}</h5>
                  </div>
                </div>
              )
            })}

          </div>
          }

        </div>
      </div>
    </>
  )
}

export default MyConnections