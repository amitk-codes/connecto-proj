import axios from "axios"
import Cookies from "js-cookie"
import cred from "../env"
import io from 'socket.io-client'

// --------- sidelist ---------------

const socket = io(`${cred.BACKEND_URL}`, {
  withCredentials: true,
  query: {
    "userId": Cookies.get('userId')
  },
  // transports: ['websocket', 'polling', 'flashsocket']
})

export async function callPage(setNotificationNum) {
  try {
    const response = await axios.get(`${cred.BACKEND_URL}/notifications`, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      }
    })

    const allNotification = await response.data.notifications
    const unreadNotification = allNotification.filter((elem) => elem.read === false)

    // console.log(unreadNotification.length)
    setNotificationNum(unreadNotification.length)
  }catch(err){
    console.log(err)
  }
}

export function checkNotifications(setNotificationNum) {
  // console.log('react socket calleddddd')
  socket.on('sendrequest', (data) => {
    // console.log(data)
    setNotificationNum((num) => num + 1)
  })
}

// --------- Posts --------------

export async function callPostPage(setPostData, setReactionState, setProgress) {
  setProgress((progress) => progress + 10)  // 20 % 
  try {
    const response = await axios.get(`${cred.BACKEND_URL}/post`, {
      'headers': {
        'authorization': Cookies.get('jwtToken')
      }
    })
    setProgress((progress) => progress + 30)  // 50%
    const allData = await response.data.posts
    // console.log('alll post---->', allData)
    const newArr = allData.map((elem) => (
      { postId: elem._id, reactionCheck: elem.reaction }
    ))
    setProgress((progress) => progress + 25)  // 75 %
    for (let check of newArr) {
      setReactionState((prev) => [check, ...prev])
    }


    setPostData(allData)
    setProgress(100)
  } catch (err) {
    setProgress(100)
    console.log(err)
    alert(err.response.data.message || err.message)
  }

}

export async function getComments(elem, openId, setCommentIsLoading, setCommentData) {
  if (openId !== elem._id) {
    setCommentIsLoading(true)
    setCommentData([])

    try {
      const response = await axios.post(`${cred.BACKEND_URL}/getcomments`, { postId: elem._id })
      // console.log('response--->', response.data.comments)
      setCommentData(response.data.comments)
      setCommentIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

}


// ----- comments and likes APIs are in different files