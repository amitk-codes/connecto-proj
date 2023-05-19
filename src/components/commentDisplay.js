import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import cred from '../env'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


const CommentDisplay = ({ commentMessage, time, sender }) => {
  const navigate = useNavigate()
  function getUserDetails() {
    if(sender._id == Cookies.get('userId')) navigate('/my-profile')
    else navigate('/user-profile', { state: { sender } });
  }
  const date = new Date(time)
  const formattedDate = timeAgo?.format(date, 'round')


  return (
    <div className="d-flex justify-content-start align-content-center mt-2">
      <div className='comment-display-div d-flex align-content-center'>
        <div className='my-auto'>
          <img className="comment-display-user-pic border border-2 mx-2" src={`${cred.BACKEND_URL}/${sender.profilePhoto}`} onClick={getUserDetails} style={{ 'cursor': 'pointer' }} alt="profile photo" />
        </div>
        <div className="comment-message-css">
          <p className='mb-2 text-decoration-underline' onClick={getUserDetails} style={{ 'cursor': 'pointer' }}>{sender.name}</p>
          {commentMessage}

        </div>
      </div>

      <div className="comment-time-css mx-1 pt-1">
        {formattedDate}
      </div>
    </div>
  )
}
export default CommentDisplay;