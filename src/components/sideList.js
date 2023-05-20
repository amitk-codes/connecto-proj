import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callPage } from "../API/home";

const SideList = () => {
  const navigate = useNavigate()
  const [notificationNum, setNotificationNum] = useState(0)


  useEffect(() => {
    // console.log('useffect double call checkkkingggg')
    callPage(setNotificationNum)
    // checkNotifications(setNotificationNum)
  }, [])

  return (
    <div className="sidelist col-lg-2 mb-3 ms-4 p-3 p-lg-2 p-xl-3">
      <div className="side-bar-items" onClick={()=>navigate('/create')}>Create Post</div>
      <div className="side-bar-items" onClick={()=>navigate('/my-connections')}>My Connections</div>
      <div className="side-bar-items" onClick={() => navigate('/notifications')}>Notifications <sup className=" text-black px-2" style={{ 'fontSize': '0.9rem', 'borderRadius': '10px', backgroundColor: '#e16757' }}>{notificationNum}</sup></div>
      {/* <div className="side-bar-items">Messages</div> */}
    </div>


  )
}
export default SideList;