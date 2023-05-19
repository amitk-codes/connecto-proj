import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import { Toaster } from 'react-hot-toast';
import { submitLogin } from '../API/login-signup';
import { LoginInput } from '../smallComponents/loginInput';


const Login = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { email: '', password: '' }
  })

  return (
    <>
      <div className='container login-container'>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <div className='row row-cols-1 row-cols-lg-2 g-2 my-3'>
          <div className='col my-auto'>
            <div className='ms-lg-5'>
              <h1 className='logo-name text-center text-lg-start'>Connecto</h1>
              <h3 className='tagline d-none d-lg-block'>Explore and connect with the world</h3>
            </div>
          </div>

          <div className='col'>
            <div className='login-form rounded-4'>
              <form className="mx-1 mx-md-4 pb-4">
                <p className="text-center text-white h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 pt-5">Login In</p>

                <LoginInput formik={formik}
                  id='login-email'
                  label='Your Email'
                  icon='fa-envelope'
                  type='email' />

                <LoginInput formik={formik}
                  id='login-password'
                  label='Password'
                  icon='fa-lock'
                  type='password' />

                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button
                    className="login-btn"
                    type="button"
                    onClick={() => submitLogin(formik, navigate)}>
                    Login
                  </button>
                </div>
                <p className=' text-center'>Don't have an account? <span className='text-white signup-span' onClick={()=>navigate('/register')}>Sign Up</span> </p>

              </form>
            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default Login