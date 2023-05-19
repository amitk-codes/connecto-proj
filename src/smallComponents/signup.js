import * as Yup from 'yup'
import Select from 'react-select';



export const customStyles = {
  placeholder: (provided, state) => ({
    ...provided,
    color: 'rgba(255, 255, 255, 0.796)',
  }),
  input: (provided, state) => ({
    ...provided,
    color: 'white',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white',
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? '#171717' : (state.isFocused ? '#161616' : '#26274a'),
    border: 'none',
    borderRadius: '4px',
    boxShadow: state.isFocused ? '0 0 2px white' : 'none',
    minHeight: '40px',
    color: 'white',
    cursor: 'pointer',


  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#222',
    border: '1px solid black',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  }),

  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: '#222',
    color: '#e2ddda',
    ':active': {
      ...provided[':active'],
      backgroundColor: '#323644',
      color: 'white'
    },
    ':hover': {
      ...provided[':hover'],
      backgroundColor: '#323644',
      color: 'white'
    },
  }),


};


export const signupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  gender: Yup.mixed().required('Required'),
  country: Yup.mixed().required('Required'),
  position: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
})

export function SignupInput({ type, placeholder, name, id, formik, icon, touched, errors }) {
  return (
    <>
      <div className="d-flex flex-row align-items-center mb-4 mx-1">
        <i className={`fas fa-lg me-3 fa-fw ${icon}`}></i>
        <div className="form-outline flex-fill mb-0">
          <input type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            value={formik.values[name]}
            className={`form-control login-inputs`}
            autoComplete='off'
            onChange={(e) => { formik.setFieldValue(name, e.target.value) }}
          />
          {formik.touched[name] && formik.errors[name] ? (
            <div className="text-danger">{formik.errors[name]}</div>
          ) : null}
        </div>
      </div>
    </>
  )
}

