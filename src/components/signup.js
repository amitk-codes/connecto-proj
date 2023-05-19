import { useState } from 'react';
import Select from 'react-select';
import { useFormik } from "formik";
import { Country, State, City } from "country-state-city";
import { SignupInput, customStyles, signupSchema } from '../smallComponents/signup';
import { apiCall } from '../API/login-signup';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const countryOptions = Country.getAllCountries().map((itm) => {
  return { id: itm.isoCode, name: itm.name, label: itm.name }
})

const initialForm = {
  name: "",
  gender: "",
  country: "",
  state: "",
  city: "",
  position: "",
  email: "",
  password: ""
}



const Signup = () => {
  const navigate = useNavigate()
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const formik = useFormik({
    initialValues: initialForm,
    onSubmit: (values, { resetForm }) => {
      apiCall(formik, resetForm, navigate)

    },
    validationSchema: signupSchema
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

          <div className='col mb-4'>
            <div className='login-form rounded-4'>
              <form className="mx-1 mx-md-4 pb-4" onSubmit={formik.handleSubmit}>
                <p className="text-center text-white h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 pt-5">Sign Up</p>

                <SignupInput
                  type='text'
                  placeholder='Your Name'
                  name='name'
                  id='nameId'
                  formik={formik}
                  icon='fa-user'
                />

                <div className="d-flex flex-row align-items-center mb-4 mx-1">
                  <i className="fas fa-children fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">

                    <Select
                      options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
                      onChange={(selected) => {
                        // console.log(selected.value)
                        formik.setFieldValue("gender", selected)
                      }}
                      placeholder='Gender'
                      styles={customStyles}
                      isSearchable={false}
                      value={formik.values.gender}
                    />
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="text-danger">{formik.errors.gender}</div>
                    ) : null}


                  </div>
                </div>


                <div className="d-flex flex-row align-items-center mb-4 mx-1">
                  <i className="fas fa-globe fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">

                    <Select
                      options={countryOptions}
                      value={formik.values.country}
                      onChange={(selected) => {
                        formik.setFieldValue("country", selected)
                        const states = State.getStatesOfCountry(selected.id).map(itm => {
                          return { name: itm.name, id: itm.isoCode, label: itm.name }
                        })
                        setStateList(states)
                      }}
                      placeholder='Country'
                      styles={customStyles}

                    />
                    {formik.touched.country && formik.errors.country ? (
                      <div className="text-danger">{formik.errors.country}</div>
                    ) : null}

                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4 mx-1">
                  <i className="fas fa-location-dot fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">

                    <Select
                      isDisabled={!formik.values.country}
                      value={formik.values.state}
                      options={stateList}
                      onChange={(selected) => {
                        formik.setFieldValue("state", selected)
                        const cities = City.getCitiesOfState(formik.values.country.id, selected.id).map((itm) => {
                          return { label: itm.name, value: itm.name, id: itm.isoCode }
                        })

                        setCityList(cities)
                      }}
                      placeholder='State'
                      styles={customStyles}

                    />
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4 mx-1">
                  <i className="fas fa-city fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">

                    <Select
                      isDisabled={!formik.values.state}
                      value={formik.values.city}
                      options={cityList}
                      onChange={(selected) => {
                        formik.setFieldValue("city", selected)
                      }}
                      placeholder='City'
                      styles={customStyles}
                    />

                  </div>
                </div>

                <SignupInput type='text'
                  placeholder='Profession'
                  name='position'
                  id='positionID'
                  formik={formik}
                  icon='fa-briefcase'
                />

                <SignupInput type='email'
                  placeholder='Your Email'
                  name='email'
                  id='emailId'
                  formik={formik}
                  icon='fa-envelope'

                />

                <SignupInput type='password'
                  placeholder='Password'
                  name='password'
                  id='passwordId'
                  formik={formik}
                  icon='fa-lock'

                />

                <div className="d-flex justify-content-center mx-4 mb-2 mb-lg-3">
                  <button
                    type="submit"
                    className="signup-btn"
                  >
                    Sign Up
                  </button>
                </div>

                <p className=' text-center'>Already have an account? <span className='text-white signup-span' onClick={()=>navigate('/login')}>Login In</span> </p>


              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Signup