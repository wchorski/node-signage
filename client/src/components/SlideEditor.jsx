import {React, useState, useEffect, useRef, useCallback} from 'react'
import {useDropzone} from "react-dropzone";
import {useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaRegTrashAlt, FaUserAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
import { MdTitle } from 'react-icons/md'
// import { HiOutlineMail } from 'react-icons/hi'
// import { MdPassword } from 'react-icons/md'

import { StyledPopUp } from '../styles/popup.styled'
import { StyledPost } from '../styles/Post.styled'

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  axios  from "../api/axios";
import { updateSlide } from "../helpers/SlideUploadService";
import DefaultImg from '../assets/default-img.jpg';

const ROLES = {
  'Admin': 5150,
  'Editor': 1984,
  'User': 2001,
}

const API_IP = process.env.REACT_APP__API_IP;
const API_PORT = process.env.REACT_APP__API_PORT;

const SlideEditor = () => {

  const navigate = useNavigate();
  const controller = new AbortController();
  let { _id } = useParams() //? params of react-router-dom previous lilnk URL

  const [selectedFiles, setSelectedFiles] = useState([]);
  const captionRef = useRef(null)
  // const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  const [slideState, setSlideState] = useState({})
  // const [imgPreview, setimgPreview] = useState(DefaultImg)

  

  const onDrop = useCallback(acceptedFiles => {
    setSelectedFiles(acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    ))
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, multiple: false})
  const dropFiles = selectedFiles?.map((file, i) => (
    <div key={i}>
      <img src={file.preview} style={{width: "200px"}} alt="" />
    </div>
  ))

  let imgBG_sani = ''

  const getSlide = async () => {    
    try {
      const response = await axios.get(`/slides/${_id}`, {
        signal: controller.signal
      });
      setSlideState(response.data);
      // onDrop(imgBG_sani)
      // const imgBG = `${API_IP}:${API_PORT}/slides/` + slideState.imageData
      // imgBG_sani = imgBG.replace(/\\/g, '/')


    } catch (err) {
      console.error(err);
      // navigate('/posts', { state: { from: location }, replace: true });
    }
  }

  const upload = (values) => {

    let currentFile = selectedFiles[0];
    setProgress(0);
    // setCurrentFile(currentFile);
 

    // * axios call
    updateSlide(selectedFiles[0], values, _id, (event) => {
      console.log(event);
      console.log(progress);
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        // return getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
        // setimgPreview(DefaultImg)
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        // setCurrentFile(undefined);
      });

      // navigate('/slides')
  };

  useEffect(() => {
    getSlide();
    // TODO create API to get files
    // getFiles().then((response) => {
    //   setFileInfos(response.data);
    // });
  }, []);


  const templateSelection = (val) => {
    console.log(val);
  }
  const collectionSelection = (val) => {
    console.log(val);
  }

  // * FORM Control * * * * * 
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

  return (
    <>
    <section>
      <Formik
        enableReinitialize
        initialValues={{ 
          author: slideState.author,
          title: slideState.title,
          content: slideState.content,
          template: slideState.template,
          color: slideState.color,
          collectionName: slideState.collectionName,
          files: ''
        }}
        validationSchema={SlideSchema}
        validateOnChange={false} // disable on every keystroke
        onSubmit={(values, actions) => {
          // alert(JSON.stringify(values, null, 2))
          // createSlide(values)

          // console.log(values);
          // console.log(selectedFiles[0])
          upload(values)

          // actions.resetForm()
        }}
      >
        {({ errors, touched, setFieldValue }) => (
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
                <MdTitle />
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
                <label htmlFor="" className='color-label'>color choice</label>
                <Field name="color" type="color" placeholder="color..." className='color' />
                {errors.color && touched.color ? (
                  <span className='formErr'>{errors.color}</span>
                  ) : null}
              </div>
              <br />

              {/* //* FILE UPLOAD * * * * * * * * * * * * * * * * * * * * * * * *  */ }
              <div className='form-item form-dropzone'>
                <div {...getRootProps()} style={{border: "dashed gray 4px"}} className='dropzone'>

                  <input {...getInputProps()} />
                  <p>[ drop image here ]</p>
                  {(dropFiles.length > 0) 
                    ? dropFiles 
                    : <img src={API_IP + ':' + API_PORT + '/' + slideState.imageData} alt="image preview" style={{width: "200px"}}/>  
                  }
                </div>

                <input ref={captionRef} type="text" placeholder='image caption...' />
              </div>
              {/* //* FILE UPLOAD End * * * * * * * * * * * * * * * * * * * * * * * * */ }

  

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
                <button className='submitPost' type='submit'>Update Slide</button>
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
  );
}

export default SlideEditor