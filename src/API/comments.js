import axios from "axios";
import cred from "../env";
import Cookies from "js-cookie";


export const handleSubmit = async (message, postId, setMessage, setCommentData, setCommentsNum, commentsNum) => {
    if(!message) return
    setCommentData((prev)=>[{commentMessage: message, createdAt: new Date().toISOString(), senderId: JSON.parse(Cookies.get('user'))}, ...prev])
    setCommentsNum((el)=>({...el, [postId]: commentsNum[postId] + 1}))

  const value = { commentMessage: message, postId }
  const link = cred.BACKEND_URL + `/comment`;
  try {
      const res = await axios.post(link, value, {
          'headers': {
              'authorization': Cookies.get('jwtToken')
          }
      })
    //   console.log("-comment done!", res)
      setMessage("");
  }
  catch (err) {
      console.log(err)
      setMessage("");
  }
}
