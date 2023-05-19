import axios from "axios"
import Cookies from "js-cookie"
import cred from '../env'
import { toast } from "react-hot-toast"


export async function handleSubmit(e, post, setPost, setFiles) {
    e.preventDefault()
    if (!post.postContent && !post.postImg) return
    const toastId = toast.loading('Loading...')
    try {
        const formData = new FormData()
        formData.append('postImg', post.postImg)
        formData.append('postContent', post.postContent)
        formData.append('visibility', post.visibility)
        const response = await axios.post(`${cred.BACKEND_URL}/post/create`, formData, {
            'headers': {
                'authorization': Cookies.get('jwtToken')
            }
        })
        console.log("response----->", response.data.post)
        toast.success('Post Created', { id: toastId })
        setPost((prev)=>({...prev, postContent: ''}))
        setFiles([])
        

    } catch (err) {
        if (err?.response?.status === 400) {
            toast.error('Invalid File Type', { id: toastId })
        } else {
            toast.error('Network Error', { id: toastId })
        }
    }
}