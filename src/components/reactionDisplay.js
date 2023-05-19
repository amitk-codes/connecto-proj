import React from "react";
import { Modal } from "react-bootstrap";
import cred from "../env";
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


function ReactionDisplay({ modalState, hideModal, id, reactionDisplay, isLoading }) {
  const navigate = useNavigate()
  const reactionIcon = {
    like: '👍',
    love: '💖',
    haha: '😂',
    wow: '😲',
    sad: '😥',
    angry: '😡'
  }

  function handleClick(e) {
    const sender = e;
    if (e._id == Cookies.get('userId')) navigate('/my-profile')
    else navigate('/user-profile', { state: { sender } })

  }


  return (
    <div>
      <Modal
        show={id == modalState.postId && modalState.state}
        onHide={hideModal}
        className="custom-modal reaction-modal mt-5 mt-lg-0 ms-lg-5"
        scrollable
      >

        <Modal.Header closeButton>
          <Modal.Title as="h4" className="text-white">Reactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {isLoading ? <Skeleton baseColor="#2020204d" highlightColor="#44444440" count={'3'} width={'100%'} height={'1.9rem'} /> :
          reactionDisplay?.length === 0 || !reactionDisplay ? <p className=' text-center fw-medium mt-1'>No reactions yet</p> :

              reactionDisplay?.map((reactions, index) => {
                {/* console.log('reactionDisplay', reactionDisplay) */}
                return (
                  <div key={`reaction-${index}`}>
                    <div className="d-flex">
                      <div className="me-auto ms-2 d-flex w-100 " onClick={() => handleClick(reactions?.userId)} style={{ cursor: 'pointer' }}>
                        <img className="img-fluid border border-2 object-fit-cover" style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%' }} src={`${cred.BACKEND_URL}/${reactions?.userId?.profilePhoto}`} />
                        <p className="text-white my-auto ms-2" style={{ fontSize: '1.1rem' }}>{reactions?.userId?.name}</p>
                      </div>
                      <p className="ms-auto me-2 my-auto" style={{ fontSize: '1.5rem' }}>{reactionIcon?.[reactions?.reactionType]}</p>
                    </div>
                    <hr style={{ marginTop: '', color: 'white' }} />
                  </div>
                )
              })}

        </Modal.Body>
      </Modal>



    </div>
  )
}

export default ReactionDisplay