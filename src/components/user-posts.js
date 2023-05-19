import React, { useEffect, useState } from "react";
import Post from "../smallComponents/post";
import { userPostsCall } from "../API/profile";

function UserPosts() {
  const [postData, setPostData] = useState([])
  const [reactionState, setReactionState] = useState([])

  useEffect(() => {
    // callPostPage(setPostData, setReactionState)
    userPostsCall()
  }, [])

  return (

    <div className="col-lg-6 col-11 ms-2 w-100">
      <Post
        postData={postData}
        setPostData={setPostData}
        reactionState={reactionState}
        setReactionState={setReactionState}
      />

    </div>
  )
}

export default UserPosts