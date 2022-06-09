import {React, useState, useEffect} from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaRegTrashAlt, FaUserAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
// import { HiOutlineMail } from 'react-icons/hi'
// import { MdPassword } from 'react-icons/md'

import {StyledPopUp} from '../styles/popup.styled'
// import { StyledPost } from '../styles/Post.styled'

// import ImageUploader from './ImageUploader'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  axios  from "../api/axios";
import DefaultImg from '../assets/default-img.jpg';
import { StyledPost } from '../styles/Post.styled'
import Navbar from './Navbar'
// import DropZoneForm from '../views/DropZoneForm.tsx'
import FileUploader from './FileUploader'
import { imgDataAppend } from "../helpers/FileUploadService";

// const ROLES = {
//   'Admin': 5150,
//   'Editor': 1984,
//   'User': 2001,
// }

const SlideCreator = () => {

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const controller = new AbortController();
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL

  // TODO get current user state and print it to "author" val
  const [ imgState, setimgState] = useState(DefaultImg)
  const [ issuccess, setissuccess] = useState(false)

  const makeDefaultImage = (uploadType) => {
    if (uploadType === "multer") {
      setimgState(DefaultImg)
    } 
  }

  // * IMAGE ***************************************
  // const previewImage = (e) => {
  //   // let imageObj = {};
  //   let imageFormObj = new FormData();
  //   imageFormObj.append("imageName", "multer-image-" + Date.now());
  //   imageFormObj.append("imageData", e.target.files[0]);
  //   setimgState(URL.createObjectURL(e.target.files[0]))
  // }

  // const uploadImage = () => {
  //   let imgUploader = document.getElementById("imgUploader")
  //   // let imageObj = {};
  //   let imageFormObj = new FormData();
  //   imageFormObj.append("imageName", "multer-image-" + Date.now());
  //   imageFormObj.append("imageData", imgUploader.files[0]);
  //   console.log(imageFormObj);
  //   setimgState(URL.createObjectURL(imgUploader.files[0]))
  //   console.log(imgState);

  //   axios.post(`/image/uploadmulter`, imageFormObj)
  //     .then((data) => {
  //       if (data.data.success) {
  //         alert("Image has been successfully uploaded using multer");
  //         makeDefaultImage("multer");
  //       }
  //     })
  //     .catch((err) => {
  //       alert("Error while uploading image using multer");
  //       makeDefaultImage("multer");
  //     });
  // }

  //* SLIDE *********************************
  const createSlide = (vals) => {
    console.log('**** createSlide vals');
    console.log(vals);
    imgDataAppend()

    const formDt = new FormData

    formDt.append(vals)
    // TODO REact.ref of <FileUploader> 's 'selectedFiles[0]'
    imgDataAppend(formDt, )
    // create image
    // fill in other data
    // push with axios
    try{
      axios.post(`/slides`, vals)

    } catch (err) {console.log(err)}
  } 

  const templateSelection = (val) => {
    console.log(val);
  }
  const collectionSelection = (val) => {
    console.log(val);
  }

  useEffect(() => {
    // console.log(Cookies.get('role')) 
    return () => {
      controller.abort();
    }
  }, [])

  const SlideSchema = Yup.object().shape({
    author: Yup.string().required('* required!'),
    title: Yup.string(),
    content: Yup.string(),
    imgName: Yup.string(),
    imgData: Yup.string(),
    template: Yup.number(),
    color: Yup.string(),
    collectionName: Yup.string(),
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
    <Navbar />

      {/* TODO bring back DropZoneForm */}
      {/* <section>
        <DropZoneForm />
        <FileUploader />
      </section> */}

      <section>
        <Formik
          enableReinitialize
          initialValues={{ 
            author: '',
            title: '',
            content: '',
            imgName: '',
            imgData: '',
            template: 0,
            color: '#aefb09',
            collectionName: 'no_collection',
            image: imgState || 'null', 
          }}
          validationSchema={SlideSchema}
          validateOnChange={false} // disable on every keystroke
          onSubmit={(values, actions) => {
            // alert(JSON.stringify(values, null, 2))
            createSlide(values)
            actions.resetForm()
          }}
        >
          {({ errors, touched }) => (
            <>
            <StyledPost>
              <Form>
                <div className='form-item'>
                  <FaUserAlt />
                  <Field name="author" type="text" placeholder="author..." className='author'/>
                  {errors.author && touched.author ? (
                    <span className='formErr'>{errors.author}</span>
                    ) : null}
                </div>
                <br/>

                <div className='form-item'>
                  <FaUserAlt />
                  <Field name="title" type="text" placeholder="title..." className='title'/>
                  {errors.title && touched.title ? (
                    <span className='formErr'>{errors.title}</span>
                    ) : null}
                </div>
                <br/>

                <div className='form-item'>
                  <Field name="content" as="textarea" placeholder="content..." className='content'/>
                  {errors.content && touched.content ? (
                    <span className='formErr'>{errors.content}</span>
                    ) : null}
                </div>
                <br />
                <div className='form-item'>
                  <Field name="color" type="color" placeholder="color..." className='color'/>
                  {errors.color && touched.color ? (
                    <span className='formErr'>{errors.color}</span>
                    ) : null}
                </div>
                <br />

                <div className='form-item'>
                  <FileUploader />
                  {errors.title && touched.title ? (
                    <span className='formErr'>{errors.image}</span>
                  ) : null}
                </div>

                <div className="form-item">
                  <Field name="template" as="select" className="template" onChange={(e) => templateSelection(e.target.value)}>
                    <option value="1">Template One</option>
                    <option value="2">Template Two</option>
                    <option value="3">Template Three</option>
                  </Field>
                </div>
                
                <div className="form-item">
                  <Field name="template" as="select" className="template" onChange={(e) => collectionSelection(e.target.value)}>
                    <option value="col-one">Collection One</option>
                    <option value="col-two">Collection Two</option>
                    <option value="col-three">Collection Three</option>
                  </Field>
                </div>

                <div className='editBtns'>
                  <button className='submitPost' type='submit'>Create Slide</button>
                  <button className='deleteBtn' type='button' onClick={() => toggleAreYouSure()}> <FaRegTrashAlt /> </button>
                </div>
              </Form>
            </StyledPost>
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
      </section>
    </>
  )
}

export default SlideCreator