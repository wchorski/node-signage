import {React, useState, useEffect, useCallback, useRef} from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Dropzone, {useDropzone} from "react-dropzone";
import { FaRegTrashAlt, FaUserAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
import { TbSelect } from 'react-icons/tb'

import {StyledPopUp} from '../styles/popup.styled'
import { StyledPost } from '../styles/Post.styled'
import { getFiles, uploadFile } from "../helpers/SlideUploadService";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import  axios  from "../api/axios";
import DefaultImg from '../assets/default-img.jpg';
import Slide from './Slide';
import { StyledSlidePreview } from '../styles/SlidePreview.styled';



const SlideUploader = () => {

  const dateToday = Date.now();
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
        preview: URL.createObjectURL(file),
      }),
    ))
    console.log('selectedFiles: ' + URL.createObjectURL(selectedFiles[0]));
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, multiple: false})
  const dropFiles = selectedFiles?.map((file, i) => (
    <div key={i}>
      <img src={file.preview} style={{width: "200px"}} alt="image preview" />
    </div>
  ))

  const upload = (values) => {

    let currentFile = selectedFiles[0];
    setProgress(0);
    // setCurrentFile(currentFile);

    console.log(values);
 

    // * axios call
    uploadFile(selectedFiles[0], values, (event) => {
      // console.log(event);
      // console.log(progress);
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

  const [titleState, settitleState] = useState('')
  const [contentState, setcontentState] = useState('')
  const [colorState, setColorState] = useState('')
  const [templateState, settemplateState] = useState('')
  const [collectionState, setcollectionState] = useState('')

  const onFormChange = (input, val) => {
    switch(input){
      case 'title':
        settitleState(val)
        break;
      case 'content':
        // console.log(val);
        setcontentState(val)
        break;
      case 'color':
        // console.log(val);
        setColorState(val)
        break;
      case 'template':
        // console.log(val);
        settemplateState(val)
        break;
      case 'collectionName':
        // console.log(val);
        setcollectionState(val)
        break;
    }
  }


  return (
    <>
    <div className="slidecreator">

      <section>
        {/* <StyledSlidePreview> */}
          <Slide 
            title={titleState} 
            content={contentState}
            color={colorState} 
            imageData={(selectedFiles[0]) ? URL.createObjectURL(selectedFiles[0]) : ''}
            template={templateState}
            collectionName={collectionState}
            dateCreated={'2022-02-01T08:00:00.000Z'}
            dateMod={dateToday}
          />
        {/* </StyledSlidePreview> */}
      </section>


      <aside>
        <Formik
          enableReinitialize
          initialValues={{ 
            author: '',
            title: '',
            content: '',
            template: 1,
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
          {({ errors, touched, setFieldValue, values }) => (
            <>
            <StyledPost>
              <Form>
                <div className='form-item'>
                  <FaUserAlt />
                  <Field name="author" type="text" placeholder="author..." className='author' />
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
                {onFormChange('title', values.title)}
                <br/>

                <div className='form-item'>
                  <Field name="content" as="textarea" placeholder="content..." className='content'/>
                  {errors.content && touched.content ? (
                    <span className='formErr'>{errors.content}</span>
                    ) : null}
                </div>
                {onFormChange('content', values.content)}
                <br />

                <div className='form-item'>
                  <label htmlFor="" className='color-label'>color choice</label>
                  <Field name="color" type="color" placeholder="color..." className='color' />
                  {errors.color && touched.color ? (
                    <span className='formErr'>{errors.color}</span>
                    ) : null}
                </div>
                {onFormChange('color', values.color)}
                <br />

                {/* //* FILE UPLOAD * * * * * * * * * * * * * * * * * * * * * * * *  */ }
                <div className='form-item dropzone-cont' style={{flexDirection: "column"}}>
                  <div {...getRootProps()} style={{border: "dashed gray 4px"}} className='dropzone'>

                    <input {...getInputProps()} />
                    <p>[ drop image here ]</p>
                    {dropFiles}
                  </div>

                  <input ref={captionRef} type="text" placeholder='image caption...' />
                </div>
                {/* //* FILE UPLOAD End * * * * * * * * * * * * * * * * * * * * * * * * */ }

    

                <div className="form-item select-cont">
                  <TbSelect />
                  <Field name="template" as="select" className="form-selection template" >
                    <option value="1">Template One</option>
                    <option value="2">Template Two</option>
                    <option value="3">Template Three</option>
                  </Field>
                  {onFormChange('template', values.template)}
                </div>
                
                {/* //TODO map over collectionName in db  */}
                <div className="form-item select-cont">
                  <TbSelect />
                  <Field name="collectionName" as="select" className="form-selection template">
                    <option value="col-one">Collection One</option>
                    <option value="col-two">Collection Two</option>
                    <option value="col-three">Collection Three</option>
                  </Field>
                  {onFormChange('collectionName', values.collectionName)}
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
      </aside>
    </div>
    </>
  );
};
export default SlideUploader;