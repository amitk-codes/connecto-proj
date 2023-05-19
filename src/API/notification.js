import axios from "axios"
import cred from "../env"
import Cookies from "js-cookie"



export async function callPage(setNotification, setProgress, setIsPageCalled) {
  setProgress((progress)=>progress+30)
  try {
    const response = await axios.get(`${cred.BACKEND_URL}/notifications`, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      }
    })
    setProgress((progress)=>progress+30)

    
    // console.log(response.data.notifications)
    setNotification(response.data.notifications)
    setIsPageCalled(true)
    setProgress(100)

  } catch (err) {
    setProgress(100)
    console.log(err)
  }

}

export async function readNotification(notification, navigate) {
  const sender = notification.sentBy
  navigate('/user-profile', { state: { sender } })
  if (notification.read) return
  try {
    const response = await axios.put(`${cred.BACKEND_URL}/read-notification`, { notificationId: notification._id }, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      }
    })
    // console.log(response)

  } catch (err) {
    console.log(err)
  }

}

export async function deleteNotification(id, notification, setNotification) {
  try {
    setNotification(notification.filter(elem => elem._id !== id))
    const response = await axios.delete(`${cred.BACKEND_URL}/delete-notification`, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      },
      data: {
        notificationId: id
      }
    })
    // console.log(response)
  } catch (err) {
    console.log(err)
  }

}