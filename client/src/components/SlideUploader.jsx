import {React, useState, useEffect, useCallback, useRef} from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Dropzone, {useDropzone} from "react-dropzone";
import { FaRegTrashAlt, FaUserAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'

import {StyledPopUp} from '../styles/popup.styled'
import { StyledPost } from '../styles/Post.styled'
import { getFiles, uploadFile } from "../helpers/SlideUploadService";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  axios  from "../api/axios";
import DefaultImg from '../assets/default-img.jpg';



const SlideUploader = () => {

  const navigate = useNavigate();
  const controller = new AbortController();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const captionRef = useRef(null)
  // const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);
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

  const upload = (values) => {

    let currentFile = selectedFiles[0];
    setProgress(0);
    // setCurrentFile(currentFile);
 

    // * axios call
    uploadFile(selectedFiles[0], values, (event) => {
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

    // setSelectedFiles(undefined);
  };

  useEffect(() => {
    // TODO create API to get files
    // getFiles().then((response) => {
    //   setFileInfos(response.data);
    // });
  }, []);

  // * SLIDE * * * * * * * 
  // const createSlide = async (vals) => {

  //   let formDt = new FormData();

  //   if(currentFile){
  //     console.log("curFile " + currentFile);
  //     setProgress(0);
  //     currentFile = selectedFiles[0];
  //     setCurrentFile(currentFile);

  //     formDt.append("imageName", currentFile + "--" + Date.now());
  //     formDt.append("imageData", currentFile);
  //   } else {
  //     formDt.append("imageName", "no_img");
  //     formDt.append("imageData", "no_img");
  //   }
  

  //   formDt.append(`author`,         vals.author);
  //   formDt.append(`title`,          vals.title);
  //   formDt.append(`content`,        vals.content);
  //   formDt.append(`template`,       vals.template);
  //   formDt.append(`color`,          vals.color);
  //   formDt.append(`collectionName`, vals.collectionName);


  //   try{
  //     // axios.post(`/slides`, formDt)
  //     const data_1 = await axios.post("/slides", formDt, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       // onUploadProgress,
  //     });

  //   } catch (err) {console.log(err)}
  // } 
  
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
          author: 'auth',
          title: 'titleee',
          content: 'contenntttt',
          // imgName: '',
          // imgData: '',
          template: 0,
          color: '#aefb09',
          collectionName: 'no_collection',
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

              {/* //* FILE UPLOAD * * * * * * * * * * * * * * * * * * * * * * * *  */ }
              <section>
                <h1>dropzone!!!!!!</h1>
                <div {...getRootProps()} style={{border: "dashed gray 4px"}}>

                  <input {...getInputProps()} />
                    <p>[ drop files here ]</p>
                </div>
                  <input ref={captionRef} type="text" placeholder='caption...' />
                  {dropFiles}
              </section>
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
  );
};
export default SlideUploader;