// ! LEGACY code
// WITHOUT DROPZONE. 

import {React, useState, useEffect} from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaRegTrashAlt, FaUserAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
// import { HiOutlineMail } from 'react-icons/hi'
// import { MdPassword } from 'react-icons/md'

import {StyledPopUp} from '../styles/popup.styled'
// import { StyledPost } from '../styles/Post.styled'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  axios  from "../api/axios";
import DefaultImg from '../assets/default-img.jpg';

// const ROLES = {
//   'Admin': 5150,
//   'Editor': 1984,
//   'User': 2001,
// }

const ImageUploader = () => {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const controller = new AbortController();
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL

  const [ imgState, setimgState] = useState(DefaultImg)
  const [ issuccess, setissuccess] = useState(false)


  let imageFormObj = {}

  const previewImage = (e) => {
    let imageObj = {};
  
    imageFormObj = new FormData();
  
    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", e.target.files[0]);
  
    // stores a readable instance of 
    // the image being uploaded using multer
    setimgState(URL.createObjectURL(e.target.files[0]))

  }

  // upload with multer
  const uploadImage = () => {

    let imgUploader = document.getElementById("imgUploader")


    let imageObj = {};
  
    imageFormObj = new FormData();
  
    imageFormObj.append("imageName", "multer-image--" + Date.now());
    imageFormObj.append("imageData", imgUploader.files[0]);
    console.log(imageFormObj);
  
    // stores a readable instance of 
    // the image being uploaded using multer
    setimgState(URL.createObjectURL(imgUploader.files[0]))


    axios.post(`/image/uploadmulter`, imageFormObj)

      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using multer");
          setimgState(DefaultImg)
        }
      })
      .catch((err) => {
        alert("Error while uploading image using multer");
        setimgState(DefaultImg)
      });

  }

  useEffect(() => {
    // console.log(Cookies.get('role')) 
    return () => {
      controller.abort();
    }
  }, [])

  const ImageSchema = Yup.object().shape({
    image: Yup.string()
      .required('* Image required!')
  })

  const [isAreYouSure, setisAreYouSure] = useState(false)
  const toggleAreYouSure = () => {
    setisAreYouSure(prev => !prev)
  }

  const abandonPost = async () => {
    try {
      navigate('/slides')
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ 
          image: imgState || 'no title', 
        }}
        validationSchema={ImageSchema}
        validateOnChange={false} // disable on every keystroke
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2))
          uploadImage()
          actions.resetForm()
        }}
      >
        {({ errors, touched }) => (
          <>
            <Form>

            <div className='form-item'>
              <input type="file" id="imgUploader" className="process__upload-btn" onChange={(e) => previewImage(e)} />
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

      {isAreYouSure && (
        <StyledPopUp>
          <h3>Abandon This Edit?</h3>
          <button className='editBtn' onClick={() => abandonPost()}> yeah, let's ditch this edit <FaSkullCrossbones /> </button>
          <button className='editBtn' onClick={() => toggleAreYouSure()}> no, I want to keep editing<FaEject /> </button>
        </StyledPopUp>
      )}
    </>
  )
}

export default ImageUploader