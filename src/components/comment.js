import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { handleSubmit } from '../API/comments';
import { useState } from "react";
import Collapse from 'react-bootstrap/Collapse';
import CommentDisplay from "./commentDisplay";
import cred from '../env';
import Cookies from 'js-cookie';


const Comment = ({ postId, getOpenId, commentData, isLoading, setCommentData, setCommentsNum, commentsNum }) => {
  const [message, setMessage] = useState('')
  const profilePhoto = JSON.parse(Cookies.get('user')).profilePhoto
  return (
    <div>
      <Collapse in={(postId) == getOpenId()}>
        <div id={`${postId}`}>
          <div className="d-flex align-items-center mt-3 comment-container">
            <div className="me-2">
              <img className="comment-user-pic border border-2"
                src={`${cred.BACKEND_URL}/${profilePhoto}`}
                alt="profile photo"
              />
            </div>
            <div className='w-100'>
              <input className='form-control comment-input'
                type="text"
                name="commentMessage"
                placeholder="write your comment here"
                onChange={(e) => setMessage(e.target.value)} value={message}
              />

            </div>
            <div className=' ms-2'>
              <span className="material-symbols-rounded comment-send-icon rounded my-auto p-1" onClick={() => handleSubmit(message, postId, setMessage, setCommentData, setCommentsNum, commentsNum)}>
                send
              </span>
            </div>
          </div>
          <div style={{ maxHeight: '20rem', overflow: 'auto' }}>
            {isLoading ? <Skeleton baseColor="#202020" highlightColor="#444" count={'3'} width={'75%'} /> :

              commentData.length === 0 ? <p className=' text-center fw-medium mt-1'>No comments yet</p> :

              commentData.map((elem, index) => {
                return (

                    <CommentDisplay key={`comment-${index}`} commentMessage={elem.commentMessage} time={elem.createdAt} sender={elem.senderId} />
                 
                )
              })}
          </div>
        </div>
      </Collapse>

    </div>

  )
}
export default Comment;