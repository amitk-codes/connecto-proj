import axios from 'axios';
import cred from '../env';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

// --------- login -------------

export async function submitLogin(formik, navigate) {
  const toastId = toast.loading('Loading...')
  try {
    const response = await axios.post(`${cred.BACKEND_URL}/login`, formik.values)
    Cookies.set('userId', response.data.user._id, {expires: 7})
    Cookies.set('user', JSON.stringify(response.data.user), {expires: 7})
    Cookies.set('jwtToken', response.data.token, {expires: 7})
    Cookies.set('loggedIn', true, {expires: 7})

    toast.success('Logged In', {id: toastId})
    setTimeout(() => {
      navigate('/');
    }, "1000");
    // navigate('/')
  } catch (err) {
    if(err?.response?.status === 400){
      toast.error('invalid email or password', {id: toastId})
    }else{
      toast.error('Network Error', {id: toastId})
    }
  }
}


// ------- Signup -------------

export async function apiCall(formik, resetForm, navigate) {
  const toastId = toast.loading('Loading...')
  const body = {...formik.values}
  body.gender = body?.gender?.value
  body.country = body?.country?.name
  body.state = body?.state?.name
  body.city = body?.city?.name
  try {
    const response = await axios.post(`${cred.BACKEND_URL}/signup`, body)
    resetForm()

    toast.success('Registered Successfully', {id: toastId})
    setTimeout(()=>{
      navigate('/login')
    }, "1000")
    
  } catch (err) {
    // console.log(err)
    if(err?.response?.status === 400){
      toast.error(err?.response?.data?.message, {id: toastId})
    }else{
      toast.error('Network Error', {id: toastId})
    }
  }
  


}