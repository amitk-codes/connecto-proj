import React, { useContext, useEffect, useState } from "react";
import Post from "../smallComponents/post";
import { callPostPage } from "../API/home";
import { progressContext } from "../App";

function HomePosts() {
  const {progress, setProgress} = useContext(progressContext)
  const [postData, setPostData] = useState([])
  const [reactionState, setReactionState] = useState([])

  useEffect(() => {
    callPostPage(setPostData, setReactionState, setProgress)
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

export default HomePosts