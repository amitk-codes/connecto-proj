import axios from "axios"
import cred from "../env"
import Cookies from "js-cookie"
import { ReactionBarSelector } from '@charkour/react-reactions'
import { useEffect, useRef } from "react"
import { useLongPress } from "use-long-press"




export function Counters({ post, reactionCounterClick, commentClick, counterArrLen, commentsNum }) {

  return (

    <div className='counter-div d-flex'>
      <p onClick={() => reactionCounterClick(post)} className='me-auto ms-2 fw-light counters'>{counterArrLen?.[post._id]} reactions</p>
      <p className='ms-auto me-2 fw-light counters' onClick={() => commentClick(post)}>{commentsNum?.[post._id]} comments</p>
    </div>

  )
}

export function InteractionBtns(props) {
  const {post, showReaction, setShowReaction, handleReactions, checkFunc, commentClick, reactionState, counterArrLen, setCounterArrLen, setReactionState} = props
  const reactionRefs = useRef([])
  const bind = useLongPress((e) => handleShow(e.target.id))


  const reactionType = [
    { label: "like", node: <div className="prevent-select">👍</div>, key: "like" },
    { label: "love", node: <div className="prevent-select">💖</div>, key: "love" },
    { label: "haha", node: <div className="prevent-select">😂</div>, key: "haha" },
    { label: "wow", node: <div className="prevent-select">😲</div>, key: "wow" },
    { label: "sad", node: <div className="prevent-select">😥</div>, key: "sad" },
    { label: "angry", node: <div className="prevent-select">😡</div>, key: "angry" }
  ]
  function handleShow(postId) {
    setShowReaction(postId)
  }
  function handleHide() {
    setShowReaction(null)
  }


  useEffect(() => {
    if (showReaction && reactionRefs.current[showReaction]) {
      reactionRefs.current[showReaction].focus()
    }
  })

  return (
    <>
      <div
        onMouseEnter={() => handleShow(post._id)}
        onMouseLeave={handleHide}
        className={` ${showReaction == post._id ? '' : ' d-none'} reaction-div`}>
        <ReactionBarSelector
          reactions={reactionType}
          onSelect={(e) => handleReactions(post._id, reactionState, counterArrLen, setCounterArrLen, setReactionState, e)}
          style={{ paddingRight: '20px', boxShadow: '0 0 5px #161616' }}
        />
      </div>
      <div
        tabIndex={0}
        ref={(el) => reactionRefs.current[post._id] = el}
        onFocus={() => console.log('focus by another')}
        onBlur={handleHide}
        className={`${showReaction == post._id ? '' : ' d-none'} reaction-div d-block d-md-none `}>
        <ReactionBarSelector
          reactions={reactionType}
          onSelect={(e) => handleReactions(post._id, reactionState, counterArrLen, setCounterArrLen, setReactionState, e)}
          style={{ paddingRight: '20px', boxShadow: '0 0 5px #161616' }}
        />
      </div>
      <div className="d-flex justify-content-around flex-wrap">
        <div>
          <div
            id={post._id}
            onMouseEnter={() => handleShow(post._id)}
            onMouseLeave={handleHide}
            className='icon-post-like-comment d-flex d-none d-md-block'>
            {checkFunc(post._id)}
          </div>
          <div
            id={post._id}
            {...bind()}
            className='icon-post-like-comment d-flex d-block d-md-none'>
            {checkFunc(post._id)}
          </div>
        </div>

        <div className='icon-post-like-comment d-flex' onClick={() => commentClick(post)}>
          <span className="material-symbols-rounded my-auto prevent-select">
            comment
          </span>
          <p className='ms-2 my-auto d-none d-sm-block prevent-select'>comment</p>
        </div>
      </div>
    </>
  )
}