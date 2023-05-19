import axios from "axios"
import cred from "../env"
import Cookies from "js-cookie"


export  async function handleReactions(postId, reactionState, counterArrLen, setCounterArrLen, setReactionState, reactionType = null) {
  const searching = reactionState.find((e) => e.postId == postId && e.reactionCheck != -1)
  if (!searching) {
    setCounterArrLen((el) => ({ ...el, [postId]: counterArrLen[postId] + 1 }))
  }
  setReactionState(reactionState.filter((elem) => elem.postId != postId))
  if (reactionType == null) {
    reactionType = 'like'
  }
  setReactionState((prev) => [{ postId, reactionCheck: reactionType }, ...prev])
  const body = { reactionType, postId }
  try{
    const response = await axios.post(`${cred.BACKEND_URL}/postreaction`, body, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      }
    })
  }catch(err){
    console.log(err)
  }

  // console.log(response)
}

export  async function removeReaction(postId, setShowReaction, setReactionState, reactionState, setCounterArrLen, counterArrLen) {
  setShowReaction(null)
  setReactionState(reactionState.filter((elem) => elem.postId != postId))
  setCounterArrLen((el) => ({ ...el, [postId]: counterArrLen[postId] - 1 }))

  try {
    const response = await axios.delete(`${cred.BACKEND_URL}/removereaction`, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      },
      data: {
        postId: postId
      }
    })

    // console.log('response--->', response)

  } catch (err) {
    console.log(err)
  }

}

export async function getReactions(postId, setReactionLoading, setReactionDisplay) {
  setReactionLoading(true)
  try {
    const response = await axios.get(`${cred.BACKEND_URL}/get-reactions`, {
      params: { postId },
      headers: {
        Authorization: Cookies.get('jwtToken')
      }
    })
    // console.log('response---->', response)
    const data = await response.data.responseData
    // console.log('new called', data)
    // console.log(data[0].reactedBy)
    setReactionDisplay(data?.[0]?.reactedBy)
  } catch (err) {
    console.log(err)
  }
  setReactionLoading(false)


}
