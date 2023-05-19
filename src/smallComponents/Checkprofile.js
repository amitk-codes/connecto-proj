import { useState } from "react";
import cred from "../env";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie";

function Checkprofile(props) {
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleModal2 = () => {
    setShowModal2(!showModal2);
  };

  function connectionClick() {
    // navigate('/conn', { state: { connections: props.connections } })
    if(props.user._id == Cookies.get('userId')) navigate('/my-connections')
    else navigate('/conn', { state: { userId: props.user._id} })
  }

  return (
    <>
      {/* {console.log('check profile checkingggg')} */}

      <div className="container my-4">
        <div className="bg-img-div">
          <div className="rounded-3 h-100">
            <img onClick={handleModal2} className="bg-pic rounded-3 w-100 h-100" src={`${cred.BACKEND_URL}/${props.user.backgroundPhoto}`} alt="profile photo" />
          </div>
          {props.name === 'my-profile' && <div className="profile-edit-btn my-2 my-lg-3 me-4 me-md-0 ms-auto text-center pe-4 pe-lg-0" onClick={()=>navigate('/update-profile')}>
            <i className="fa-2x fa-solid fa-pen-to-square" />
          </div>}
        </div>

        <div className="profile-details p-3 text-center">
          <img onClick={handleModal} className="profile-pic border border-4" src={`${cred.BACKEND_URL}/${props.user.profilePhoto}`} alt="profile photo" />
          <div className="profile-details-headings">
            <h4 className="profile-name fw-medium">{props.user.name}</h4>
            <h6 className="fw-medium">{props.user.position}</h6>
            <h6 className="fw-medium">{props.user.state}{props.user.state ? ', ' : ''}{props.user.country}</h6>
            <p className=" d-inline text-decoration-underline fw-medium" style={{ color: '#93c5fd', cursor: 'pointer' }} onClick={connectionClick}>{props.connectionNum} {props.connectionNum > 1 ? 'connections' : 'connection'}</p>
            {props.name === 'user-profile' ? <div className="mt-2">
              {props.connectionRequests()}
            </div> : null}
          </div>
        </div>
        <div className="about-div mt-4 p-3">
          <h3>About Me</h3>
          {props.user.aboutMe ? <p className="profile-about">{props.user.aboutMe}</p> : <p></p>}
        </div>

        <Modal
          show={showModal2}
          onHide={handleModal2}
          centered
          className="custom-modal"
        >
          <Modal.Header closeButton />
          <Modal.Body className="text-center">
            <img className="img-fluid" src={`${cred.BACKEND_URL}/${props.user.backgroundPhoto}`} alt="Image" />
          </Modal.Body>
        </Modal>


        <Modal
          show={showModal}
          onHide={handleModal}
          centered
          className="custom-modal"
        >
          <Modal.Header closeButton />
          <Modal.Body className="text-center">
            <img className="img-fluid" src={`${cred.BACKEND_URL}/${props.user.profilePhoto}`} alt="Image" />
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default Checkprofile