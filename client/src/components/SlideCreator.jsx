import {React, useState, useEffect} from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Dropzone from "react-dropzone";
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
import SlideUploader from './SlideUploader'
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


  // * ****************
  // * IMAGE
  // * ****************
  const makeDefaultImage = (uploadType) => {
    if (uploadType === "multer") {
      setimgState(DefaultImg)
    } 
  }
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);
  const [imgPreview, setimgPreview] = useState(DefaultImg)

  const onDrop = (files) => {
    if (files.length > 0) {
      setSelectedFiles(files);
      setimgPreview(URL.createObjectURL(files[0]))
      setCurrentFile(files[0])
    }
  }
  // const upload = () => {
  //   let currentFile = selectedFiles[0];
  //   setProgress(0);
  //   setCurrentFile(currentFile);

  //   // * axios call
  //   // uploadFile(currentFile, (event) => {
  //   //   setProgress(Math.round((100 * event.loaded) / event.total));
  //   // })
  //   //   .then((response) => {
  //   //     setMessage(response.data.message);
  //   //     // return getFiles();
  //   //   })
  //   //   .then((files) => {
  //   //     setFileInfos(files.data);
  //   //     setimgPreview(DefaultImg)
  //   //   })
  //   //   .catch(() => {
  //   //     setProgress(0);
  //   //     setMessage("Could not upload the file!");
  //   //     setCurrentFile(undefined);
  //   //   });
  //   setSelectedFiles(undefined);
  // };


  // const uploadImage = () => {
  //   let imgUploader = document.getElementById("imgUploader")
  //   // let imageObj = {};
  //   let imageFormObj = new FormData();
  //   imageFormObj.append("imageName", "multer-image-" + Date.now());
  //   imageFormObj.append("imageData", imgUploader.files[0]);
  //   // console.log(imageFormObj);
  //   setimgState(URL.createObjectURL(imgUploader.files[0]))
  //   // console.log(imgState);

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
  const createSlide = async (vals) => {

    let formDt = new FormData();

    if(currentFile){
      console.log("curFile " + currentFile);
      setProgress(0);
      currentFile = selectedFiles[0];
      setCurrentFile(currentFile);

      formDt.append("imageName", "multer-image-" + Date.now());
      formDt.append("imageData", currentFile);
    } else {
      formDt.append("imageName", "no_img");
      formDt.append("imageData", "no_img");
    }
  

    formDt.append(`author`,         vals.author);
    formDt.append(`title`,          vals.title);
    formDt.append(`content`,        vals.content);
    formDt.append(`template`,       vals.template);
    formDt.append(`color`,          vals.color);
    formDt.append(`collectionName`, vals.collectionName);


    try{
      // axios.post(`/slides`, formDt)
      const data_1 = await axios.post("/slides", formDt, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // onUploadProgress,
      });

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
    // imgName: Yup.string(),
    // imgData: Yup.string(),
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


  // * ****************
  // * RETURN
  // * ****************
  return (
    <>
    <Navbar />

      {/* TODO bring back DropZoneForm */}
      <section>
        {/* <DropZoneForm /> */}
        <SlideUploader />
        <FileUploader />
      </section>

      <section>
        <Formik
          enableReinitialize
          initialValues={{ 
            author: 'auth',
            title: 'titleee',
            content: 'contenntttt',
            imgName: '',
            imgData: '',
            template: 0,
            color: '#aefb09',
            collectionName: 'no_collection',
          }}
          // validationSchema={SlideSchema}
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

                {/* //* FILE UPLOAD */ }
                <div>
                  {currentFile && (
                    <div className="progress mb-3">
                      <div
                        className="progress-bar progress-bar-info progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: progress + "%" }}
                      >
                        {progress}%
                      </div>
                    </div>
                  )}


                  <Dropzone onDrop={onDrop} multiple={false}>
                    {({ getRootProps, getInputProps }) => (
                      <>
                        <div {...getRootProps({ className: "dropzone" })} style={{border: "dashed gray 4px"}}>

                          <img src={imgPreview} alt="upload-image" className="process__image" />  
                          
                          <input {...getInputProps()} />
                          {selectedFiles && selectedFiles[0].name ? (
                            <div className="selected-file">
                              {selectedFiles && selectedFiles[0].name}
                            </div>
                          ) : (
                            "Drag and drop file here, or click to select file"
                            )}
                        </div>

                      </>
                    )}
                  </Dropzone>
                  <div className="alert alert-light" role="alert">
                    {message}
                  </div>
                  {fileInfos.length > 0 && (
                    <div className="card">
                      <div className="card-header">List of Files</div>
                      <ul className="list-group list-group-flush">
                        {fileInfos.map((file, index) => (
                          <li className="list-group-item" key={index}>
                            <a href={file.url}>{file.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* //* end* * * *  * * * * * * * *  */ }

                {/* <div className='form-item'>
                  <FileUploader />
                  {errors.title && touched.title ? (
                    <span className='formErr'>{errors.image}</span>
                  ) : null}
                </div> */}

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

      <section>
      {/* <FileUploader /> */}
      </section>
    </>
  )
}

export default SlideCreator