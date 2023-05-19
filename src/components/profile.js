import { useContext, useEffect, useState } from "react"
import Checkprofile from "../smallComponents/Checkprofile";
import { callConnection, callMyProfile, profilePostsCall } from "../API/profile";
import Post from "../smallComponents/post";
import { progressContext } from "../App";

const Profile = () => {
    const {progress, setProgress} = useContext(progressContext)

    const [user, setUser] = useState([])
    const [connectionNum, setConnectionNum] = useState(0)
    const [connections, setConnections] = useState([])
    const [postData, setPostData] = useState([])
    const [reactionState, setReactionState] = useState([])
    const [isPageCalled, setIsPageCalled] = useState(false)


    useEffect(() => {
        callMyProfile(setUser, setProgress)
    }, [])
    useEffect(() => {
        callConnection(user, setConnectionNum, setConnections, setProgress)
        profilePostsCall(setPostData, setReactionState, setProgress, setIsPageCalled)
    }, [user])
    return (
        <>
            <Checkprofile
                name='my-profile'
                user={user}
                connectionNum={connectionNum}
                connections={connections}
            />

            <hr className="container mb-4" />

            

            <div className="container user-posts">
            {isPageCalled && postData.length === 0 ? <p className="text-center mb-5 fw-medium">You have 0 post, share your first one to get started</p> : 
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

export default Profile