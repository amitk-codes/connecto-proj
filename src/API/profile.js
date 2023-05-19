import axios from "axios"
import cred from "../env"
import Cookies from "js-cookie"

export async function checkConnectionStatus(body, setFriendStatus, setProgress) {
    setProgress((progress)=>progress+20)
    // console.log('checking connection status')
    try {
        const response = await axios.post(`${cred.BACKEND_URL}/checkrequest`, body, {
            headers: {
                Authorization: Cookies.get('jwtToken')
            }

        })
        
        setFriendStatus(response.data.message)
        setProgress((progress)=>progress+15)
        //   console.log(response.data.message)
    } catch (err) {
        console.log(err)
    }
}

export async function sendRequest(body, setFriendStatus) {
    setFriendStatus('ME')
    try {
        const response = await axios.post(`${cred.BACKEND_URL}/sendrequest`, body, {
            headers: {
                Authorization: Cookies.get('jwtToken')
            }
        })
        //   console.log(response)
    } catch (err) {
        console.log(err)
    }
}

export async function acceptRequest(body, setFriendStatus) {
    setFriendStatus('ACCEPTED')
    try {
        const response = await axios.put(`${cred.BACKEND_URL}/acceptrequest`, body, {
            headers: {
                Authorization: Cookies.get('jwtToken')
            }
        })
        //   console.log(response)
    } catch (err) {
        console.log(err)
    }
}

export async function deleteRequest(body, setFriendStatus) {
    setFriendStatus('NO')
    try {
        const response = await axios.delete(`${cred.BACKEND_URL}/deleterequest`, {
            headers: { Authorization: Cookies.get('jwtToken') },
            data: body
        })
        //   console.log(response)
    } catch (err) {
        console.log(err)
    }

}



export async function callMyProfile(setUser, setProgress) {
    setProgress((progress)=>progress+15)
    
    try {
        const response = await axios.get(`${cred.BACKEND_URL}/profile`, {
            headers: {
                Authorization: Cookies.get('jwtToken')
            }
        })
        const user = response.data.user
        setProgress((progress)=>progress+5)
        setUser(user)
    } catch (err) {
        setProgress(100)
        console.log(err)
        alert(err.message)
    }

}


export async function callConnection(user, setConnectionNum, setConnections, setProgress) {
    setProgress((progress)=>progress+5)
    // console.log('checking connection num')
    if (!user._id) return
    try {
        // const body = {}
        const response = await axios.get(`${cred.BACKEND_URL}/get-connections`, {
            params: {
                userId: user?._id
            },
            headers: {
                Authorization: Cookies.get('jwtToken')
            }
        })
        setProgress((progress)=>progress+15)
        setConnectionNum(response.data.message.length)
        setConnections(response.data.message)
    } catch (err) {
        setProgress(100)
        console.log(err)
    }

}

export async function userPostsCall(otherId, setPostData, setReactionState, setProgress, setIsPageCalled) {
    setProgress((progress)=>progress+5)

    try {
        const response = await axios.get(`${cred.BACKEND_URL}/post/user`, {
            params: {
                otherId

            },
            'headers': {
                'authorization': Cookies.get('jwtToken')
            }
        })
        const allData = await response.data.posts
        setProgress((progress)=>progress+10)
        const newArr = allData.map((elem) => (
            { postId: elem._id, reactionCheck: elem.reaction }
        ))
        setProgress((progress)=>progress+15)
        for (let check of newArr) {
            setReactionState((prev) => [check, ...prev])
        }

        setPostData(allData)
        setIsPageCalled(true)
        setProgress(100)
    } catch (err) {
        
        console.log(err)
        alert(err.response.data.message || err.message)
    }

}

export async function profilePostsCall(setPostData, setReactionState, setProgress, setIsPageCalled) {
    setProgress((progress)=>progress+5)
    try {
        const response = await axios.get(`${cred.BACKEND_URL}/post/me`, {
            headers: {
                Authorization: Cookies.get('jwtToken')
            }
        })

        setProgress((progress)=>progress+15)
        const allData = await response.data.posts
        // console.log('alll post---->', allData)
        setProgress((progress)=>progress+10)
        const newArr = allData.map((elem) => (
            { postId: elem._id, reactionCheck: elem.reaction }
        ))

        for (let check of newArr) {
            setReactionState((prev) => [check, ...prev])
        }
        
        setPostData(allData)
        setIsPageCalled(true)
        
        setProgress(100)
        // console.log('everthing is fetchinggggg', allData)
    }catch(err){
        setProgress(100)
        console.log(err)
        alert(err.response.data.message || err.message)
    }
}