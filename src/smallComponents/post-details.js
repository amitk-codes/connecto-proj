import { useNavigate } from "react-router-dom";
import cred from "../env";
import Cookies from "js-cookie";


export function PostDetails({post}) {
  const navigate = useNavigate()
  function profileClick(){
    const sender = post.postOf
    if(post.postOf._id == Cookies.get('userId')) navigate('/my-profile')
    else navigate('/user-profile', {state: {sender}})
  }
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap align-items-center user-detail-post">
        <div className="d-flex align-self-center">
          <div>
            <img className="profile-pic-post" onClick={profileClick} src={`${cred.BACKEND_URL}/${post.postOf.profilePhoto}`} alt="profile photo" />
          </div>
          <div className="d-flex flex-wrap flex-column justify-content-center mx-1">
            <div className="post-username ms-1" onClick={profileClick}>{post.postOf.name}</div>
            <div className="post-userposition ms-1">{post.postOf.position}</div>
          </div>
        </div>
        <div>
        {post.visibility === 'public' ? <i className="fa-solid fa-earth-americas me-2 fa-lg"/> : 
          <i className="fa-solid fa-user-group me-2"/>}
        </div>
      </div>
      <p className='mt-2'>{post.postContent}</p>
      <div className='text-center mb-3'>
        {post.postImg ? <img className='img-fluid post-img rounded' src={`${cred.BACKEND_URL}/${post.postImg}`} /> : null}
      </div>
    </>
  )
}