import {React, useState, useEffect} from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaRegTrashAlt, FaUserAlt } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { MdPassword } from 'react-icons/md'

// import {StyledPopUp} from '../styles/popup.styled'
import { StyledPost } from '../styles/Post.styled'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  axios  from "../api/axios";
import DefaultImg from '../assets/default-img.jpg';

const ROLES = {
  'Admin': 5150,
  'Editor': 1984,
  'User': 2001,
}

const SlideEditor = () => {

  const [ imgState, setimgState] = useState(DefaultImg)
  const [ issuccess, setissuccess] = useState(false)

  const makeDefaultImage = (uploadType) => {
    if (uploadType === "multer") {
      setimgState(DefaultImg)
    } 
  }

  const uploadImage = (e, method) => {
    let imageObj = {};

    if (method === "multer") {

      let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer
      setimgState(URL.createObjectURL(e.target.files[0]))

      axios.post(`/image/uploadmulter`, imageFormObj)
        .then((data) => {
          if (data.data.success) {
            alert("Image has been successfully uploaded using multer");
            makeDefaultImage("multer");
          }
        })
        .catch((err) => {
          alert("Error while uploading image using multer");
          makeDefaultImage("multer");
        });
    } 
  }

  const ImageSchema = Yup.object().shape({
    image: Yup.string()
      .required('* Image required!')
  })

  const [isAreYouSure, setisAreYouSure] = useState(false)
  const toggleAreYouSure = () => {
    setisAreYouSure(prev => !prev)
  }


  return (
    <>
    <section>
      <Formik
        enableReinitialize
        initialValues={{ 
          image: imgState || 'no title', 
        }}
        validationSchema={ImageSchema}
        validateOnChange={false} // disable on every keystroke
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2))
          uploadImage(values)
          actions.resetForm()
        }}
      >
        {({ errors, touched }) => (
          <>
            <Form>
            <div className='form-item'>
              <input type="file" className="process__upload-btn" onChange={(e) => uploadImage(e, "multer")} />
              <img src={imgState} alt="upload-image" className="process__image" />
              {/* <Field name="image" type="file" /> */}
              {errors.title && touched.title ? (
                <span className='formErr'>{errors.image}</span>
              ) : null}
            </div>

            <div className='editBtns'>
              <button className='submitPost' type='submit'>Upload Image</button>
              <button className='deleteBtn' type='button' onClick={() => toggleAreYouSure()}> <FaRegTrashAlt /> </button>
            </div>
            </Form>
          </>
        )}
      </Formik>
    </section>

    
      <div className="main-container">
        <h3 className="main-heading">Image Upload App</h3>

        <div className="image-container">

          <div className="process">
            <h4 className="process__heading">Upload Image</h4>

            <input type="file" className="process__upload-btn" onChange={(e) => uploadImage(e, "multer")} />
            <img src={imgState} alt="upload-image" className="process__image" />
          </div>

        </div>

        <p className="main-credit">Created by <a href="#">Tarique Ejaz</a></p>
      </div>
    </>
  )
}

export default SlideEditor