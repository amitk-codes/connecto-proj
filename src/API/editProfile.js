import axios from "axios"
import cred from "../env"
import Cookies from "js-cookie"
import { toast } from "react-hot-toast"



export async function callEditPage(setUser, setProgress) {
  setProgress((progress)=>progress+30)
  try {
    const response = await axios.get(`${cred.BACKEND_URL}/profile`, {
      headers: {
        Authorization: Cookies.get('jwtToken')
      }
    })

    setUser(response.data.user)
    setProgress(100)

  } catch (err) {
    setProgress(100)
    console.log(err)
    alert(err.message)
  }

}


export  async function handleSubmit(e, formik, navigate) {
  const toastId = toast.loading('Loading...')

  e.preventDefault()
  try {
    const formData = new FormData()
    formData.append('profilePhoto', formik.values.profilePhoto)
    formData.append('backgroundPhoto', formik.values.backgroundPhoto)
    formData.append('name', formik.values.name)
    formData.append('position', formik.values.position)
    formData.append('aboutMe', formik.values.aboutMe)
    const response = await axios.put(`${cred.BACKEND_URL}/updateprofile`, formData, {
      headers:
        { Authorization: Cookies.get('jwtToken') }
    })
    const checkData = await response.data.user
    Cookies.set('user', JSON.stringify(checkData))
    toast.success('Profile Updated', { id: toastId })
    // console.log('dataaaaaaa----->', checkData)
    
    setTimeout(() => {
      navigate('/my-profile');
    }, "1000");


  } catch (err) {
    if (err?.response?.status === 400) {
      toast.error('Invalid File Type', { id: toastId })
    } else {
      toast.error('Network Error', { id: toastId })
    }
  }
}