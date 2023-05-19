import { useState } from "react"
import { Form } from 'react-bootstrap';
import { FileInput } from "../smallComponents/filepond";
import { handleSubmit } from "../API/createPost";
import { Toaster } from "react-hot-toast";


const CreatePost = () => {
  const [selectedOption, setSelectedOption] = useState('public');

  const [files, setFiles] = useState([])
  const [post, setPost] = useState({
    postContent: '',
    postImg: '',
    visibility: 'public'
  })
  function handlePhoto(e) {
    setFiles(e)
    setPost({ ...post, postImg: e[0]?.file })
  }
  function handleChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    setPost((prev) => ({ ...prev, visibility: e.target.value }))
  };

  return (
    <>
      <div className="container">
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <form method="POST" className="create-post-main my-5" encType='multipart/form-data'>
          <h2 className="text-center mb-5">Create New Post</h2>

          {/* Drag & Drop Post Image or */}
          {FileInput(files, handlePhoto, "postImg", "Post Image")}
          <textarea rows='5' className="create-post-textarea" type="text" name="postContent" onChange={handleChange} value={post.postContent} placeholder="Describe Your Post" />
          <div className="my-4 create-post-radio">
            <p className=" me-3 d-inline-block">Visibility : </p>
            <Form.Check
              inline
              id="option1"
              type="radio"
              label={<div id="option1">
                <i className="fa-solid fa-earth-americas me-2"></i>
                Public
              </div>}
              name="radioGroup"
              value="public"
              checked={selectedOption === 'public'}
              onChange={handleRadioChange}
              className="my-radio-button"
            />
            <Form.Check
              inline
              id="option2"
              type="radio"
              label={<div id="option2">
                <i className="fa-solid fa-user-group me-2"></i>
                My Connections
              </div>}
              name="radioGroup"
              value="private"
              checked={selectedOption === 'private'}
              onChange={handleRadioChange}
              className="my-radio-button ms-2"
            />
          </div>
          <button className={`${post.postContent || post.postImg ? 'create-post-btn' : 'disabled-post-btn'} d-block mx-auto my-4`} onClick={(e) => handleSubmit(e, post, setPost, setFiles)}>Create Post</button>

        </form>

      </div>
    </>
  )
}

export default CreatePost