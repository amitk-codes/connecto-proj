import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Checkprofile from "../smallComponents/Checkprofile"
import { acceptRequest, callConnection, checkConnectionStatus, deleteRequest, sendRequest, userPostsCall } from "../API/profile"
import HomePosts from "./home-posts"
import Post from "../smallComponents/post"
import Cookies from "js-cookie"
import { progressContext } from "../App"


const OtherProfile = () => {
    const [isPageCalled, setIsPageCalled] = useState(false)
    const {setProgress} = useContext(progressContext)
    const navigate = useNavigate()
    const [postData, setPostData] = useState([])
    const [reactionState, setReactionState] = useState([])
    const [friendStatus, setFriendStatus] = useState(null)
    const [connectionNum, setConnectionNum] = useState(0)
    const [connections, setConnections] = useState([])
    const { state } = useLocation()
    const body = { otherProfileId: state?.sender?._id }

    function handleConnectionRequests() {

        if (friendStatus == "NO") return <button className="btn btn-light" onClick={() => sendRequest(body, setFriendStatus)}>Connect</button>
        if (friendStatus == "ME") return <button className="btn btn-light" onClick={() => deleteRequest(body, setFriendStatus)}>Withdraw Request</button>
        if (friendStatus == "ACCEPTED") return <>
            <button className="btn btn-light disabled me-4">Friends ✅</button>
            <button className="btn btn-light" onClick={() => deleteRequest(body, setFriendStatus)}>Remove Friend</button>
        </>
        if (friendStatus == "OTHER") return <>
            <button className="btn btn-light me-4" onClick={() => acceptRequest(body, setFriendStatus)}>Accept</button>
            <button className="btn btn-light" onClick={() => deleteRequest(body, setFriendStatus)}>Reject</button>
        </>

    }


    useEffect(() => {
        checkConnectionStatus(body, setFriendStatus, setProgress)
        callConnection(state?.sender, setConnectionNum, setConnections, setProgress)
        userPostsCall(state?.sender?._id, setPostData, setReactionState, setProgress, setIsPageCalled)
    }, [state])

    return (
        <>

            <Checkprofile
                name="user-profile"
                user={state?.sender}  
                connectionRequests={handleConnectionRequests}
                connectionNum={connectionNum}
                connections={connections}
            />

            <hr className="container mb-4"/>

            <div className="container user-posts">
            {isPageCalled && postData.length === 0 ? <p className="text-center mb-5 fw-medium">No posts to show</p> : 
                <Post
                    postData={postData}
                    setPostData={setPostData}
                    reactionState={reactionState}
                    setReactionState={setReactionState}
                />
            }
            </div>
        </>
    )
}

export default OtherProfile