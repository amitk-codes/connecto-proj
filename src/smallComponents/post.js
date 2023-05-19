import Comment from '../components/comment';
import { useEffect, useRef, useState } from 'react';
import { callPostPage, getComments } from '../API/home';
import ReactionDisplay from '../components/reactionDisplay';
import { PostDetails } from './post-details';
import { Counters, InteractionBtns } from './post-interaction';
import { getReactions, handleReactions, removeReaction } from '../API/post';



const Post = ({ postData, setPostData, reactionState, setReactionState }) => {
  const [counterArrLen, setCounterArrLen] = useState({})
  const [commentsNum, setCommentsNum] = useState({})
  const [reactionDisplay, setReactionDisplay] = useState([])
  const [reactionLoading, setReactionLoading] = useState(false)
  const [openId, setOpenId] = useState(false);
  // const [postData, setPostData] = useState([])
  const [commentData, setCommentData] = useState([])
  const [commentIsLoading, setCommentIsLoading] = useState(true)
  const [showReaction, setShowReaction] = useState(null)
  // const [reactionState, setReactionState] = useState([])
  const [modalState, setModalState] = useState({ postId: "", state: false })

  const reactionIcon = {
    like: '👍',
    love: '💖',
    haha: '😂',
    wow: '😲',
    sad: '😥',
    angry: '😡'
  }


  function handleModal(postId) {
    setModalState((prev => ({ ...prev, postId, state: true })))
  }

  function hideModal() {
    setModalState((prev => ({ ...prev, postId: "", state: false })))
  }


  const getOpenId = () => {
    return openId;
  }

  function collapseClick(elem) {
    if (elem._id == openId) setOpenId(-1)
    else setOpenId(elem._id)
  }

  function checkFunc(postId) {
    const searching = reactionState.find((e) => e.postId == postId && e.reactionCheck != -1)
    if (searching) {
      return (
        <p
          id={postId}
          className='material-symbols-rounded pt-1'
          onClick={() => { removeReaction(postId, setShowReaction, setReactionState, reactionState, setCounterArrLen, counterArrLen) }}>
          {reactionIcon[searching?.reactionCheck]}
        </p>
      )
    } else {
      return (
        <div
          id={postId}
          className='d-flex'
          onClick={() => handleReactions(postId, reactionState, counterArrLen, setCounterArrLen, setReactionState)}>
          <span
            id={postId}
            class="material-symbols-rounded my-auto">
            thumb_up
          </span>
          <p
            id={postId}
            className='ms-2 my-auto d-none d-sm-block'>
            Like
          </p>
        </div>
      )
    }

  }

  function commentClick(post) {
    collapseClick(post)
    getComments(post, openId, setCommentIsLoading, setCommentData)
  }

  function reactionCounterClick(post) {
    handleModal(post._id)
    getReactions(post._id, setReactionLoading, setReactionDisplay)
  }



  // useEffect(() => {
  //   callPostPage(setPostData, setReactionState)
  // }, [])



  useEffect(() => {

    postData.forEach((post) => {
      setCounterArrLen((el) => ({ ...el, [post._id]: post.reactionCounter.length }))
    })

    postData.forEach((post) => {
      setCommentsNum((el) => ({ ...el, [post._id]: post.commentsNum }))
    })
  }, [postData])


  return (
    <>


      {postData.map((elem) => {
        return (
            <div key={elem._id} id={elem._id} className="post-container mb-3">
              <PostDetails post={elem} />

              <Counters
                post={elem}
                reactionCounterClick={reactionCounterClick}
                commentClick={commentClick}
                counterArrLen={counterArrLen}
                commentsNum={commentsNum}
              />

              <hr style={{ marginTop: '-2px' }} />

              <InteractionBtns post={elem}
                showReaction={showReaction}
                setShowReaction={setShowReaction}
                handleReactions={handleReactions}
                checkFunc={checkFunc}
                commentClick={commentClick}
                reactionState={reactionState}
                counterArrLen={counterArrLen}
                setCounterArrLen={setCounterArrLen}
                setReactionState={setReactionState}

              />

              <ReactionDisplay
                id={elem._id}
                hideModal={hideModal}
                modalState={modalState}
                reactionDisplay={reactionDisplay}
                isLoading={reactionLoading}
              />
              <Comment
                commentsNum={commentsNum}
                setCommentsNum={setCommentsNum}
                isLoading={commentIsLoading}
                setCommentData={setCommentData}
                commentData={commentData}
                postId={elem._id}
                getOpenId={getOpenId}
              />

            </div>


        )
      })}

    </>
  )
}
export default Post;