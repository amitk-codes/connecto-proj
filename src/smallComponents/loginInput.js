
export function LoginInput({formik, id, label, icon, type}) {
  return (
    <div className="d-flex flex-row align-items-center mb-4">
      <div className="form-outline flex-fill mb-0">
        <label className="form-label ms-5" htmlFor={id}>{label}</label>
        <div className=' d-flex align-items-center mx-2'>
          <i className={`fas ${icon} fa-lg me-3 fa-fw`}></i>
          <input type={type} id={id} name={type} className="form-control login-inputs" autoComplete='off' onChange={formik.handleChange} />
        </div>
      </div>
    </div>
  )
}