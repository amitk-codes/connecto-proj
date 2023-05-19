import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import { callEditPage, handleSubmit } from '../API/editProfile'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FileInput } from '../smallComponents/filepond'
import { progressContext } from '../App'


export const EditProfile = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [files2, setFiles2] = useState([])
  const {setProgress} = useContext(progressContext)

  const [user, setUser] = useState({})

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user.name || '',
      position: user.position || '',
      aboutMe: user.aboutMe || '',
      profilePhoto: user.profilePhoto || '',
      backgroundPhoto: user.backgroundPhoto || ''
    }
  })

  function handleProfilePic(e) {
    setFiles(e)
    formik.setFieldValue('profilePhoto', e[0]?.file)

  }
  function handleBgPic(e) {
    setFiles2(e)
    formik.setFieldValue('backgroundPhoto', e[0]?.file)
  }

  useEffect(() => {
    callEditPage(setUser, setProgress)
  }, [])

  return (
    <>
      <form className="edit-profile-form container my-5 " encType="multipart/form-data">

        <div className="main-check p-3">
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <h2 className='text-center mb-5 mt-3'>Update Your Profile</h2>
          <div className="mb-3 edit-profile-divs ">
            {FileInput(files, handleProfilePic, "profilePhoto", "Profile")}
          </div>

          <div className="mb-3 edit-profile-divs ">
            {FileInput(files2, handleBgPic, "backgroundPhoto", "Background")}
          </div>

          <div className="input-group mb-3 edit-profile-divs">
            <span className="input-group-text border-0">Your Name</span>
            <input type="text" className="form-control" value={formik.values.name} name='name' onChange={formik.handleChange} />
          </div>
          <div className="input-group mb-3 edit-profile-divs">
            <span className="input-group-text border-0">Profession</span>
            <input type="text" className="form-control" value={formik.values.position} name='position' onChange={formik.handleChange} />
          </div>

          <div className="input-group edit-profile-divs">
            <span className="input-group-text border-0">About You</span>
            <textarea rows='4' className="form-control edit-textarea" aria-label="With textarea" value={formik.values.aboutMe} name='aboutMe' onChange={formik.handleChange}></textarea>
          </div>
          <button className='my-4 edit-profile-btn' onClick={(e) => handleSubmit(e, formik, navigate)}>Submit Changes</button>
        </div>
      </form>
    </>
  )
}

