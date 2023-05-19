import { useContext, useEffect, useState } from "react"
import { callPage, deleteNotification, readNotification } from "../API/notification"
import cred from "../env"
import { useNavigate } from "react-router-dom"
import { progressContext } from "../App"


const Notification = () => {
  const [isPageCalled, setIsPageCalled] = useState(false)
  const { progress, setProgress } = useContext(progressContext)

  const [notification, setNotification] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    callPage(setNotification, setProgress, setIsPageCalled)
  }, [])
  return (
    <>

      <div className="container">
        <div className="notification-div mx-auto my-4 rounded-3 pb-4 px-2">
          <h3 className="text-center my-3 py-4">Notifications</h3>
          {isPageCalled && notification.length === 0 ? <p className="text-center fw-medium">No new notifications at the moment</p> :
            notification.map((elem) => {
              return (
                <div key={elem._id} className={`d-flex p-1 rounded mb-3 ${elem.read ? 'notifications-read' : 'notifications'}`}>
                  <div className="d-flex w-100" onClick={() => readNotification(elem, navigate)}>
                    <div className="notification-img-div">
                      <img
                        src={`${cred.BACKEND_URL}/${elem.sentBy.profilePhoto}`}
                        className="notification-img ms-lg-1 border border-2"
                        alt="user profile photo"
                      />
                    </div>
                    <div className="my-auto ms-2">
                      <p
                        className="my-auto text-white"
                        style={{ 'fontSize': '1.2rem' }}>
                        {/* {elem.sentBy.name} {elem.about} */}

                        {/* ------------ for testing purpose------------- */}
                        {elem.about == 'Registration completed, start exploring and enjoy the ride' ||
                          elem.about == 'For testing features, I added you in my connection' ? elem.about :
                          <>{elem.sentBy.name} {elem.about}</>}
                        {/* -------------------------------------------------- */}
                      </p>
                    </div>
                  </div>
                  <span
                    className="material-symbols-rounded ms-auto me-1 rounded my-auto"
                    onClick={() => deleteNotification(elem._id, notification, setNotification)}>
                    delete
                  </span>
                </div>
              )
            })
          }

        </div>

      </div>



    </>
  )
}

export default Notification 