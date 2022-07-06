import {React, useState, useEffect, useCallback, useRef} from 'react'
import Dropzone, {useDropzone} from "react-dropzone";
import {useNavigate, useParams } from 'react-router-dom'
import { uploadFile } from '../helpers/SlideUploadService';
import { StyledDropZone } from '../styles/DropZone.styled';

const SlideCreateMulti = () => {

  const navigate = useNavigate();
  let { collectionName } = useParams()
  const controller = new AbortController();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);
  const captionRef = useRef(null)



  const onDrop = useCallback(acceptedFiles => {

    setSelectedFiles(acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    ))
    console.log('selectedFiles: ' + URL.createObjectURL(selectedFiles[0]));
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, multiple: true})
  const dropFiles = selectedFiles?.map((file, i) => (
    <div className='imgFrame' key={i}>
      <img src={file.preview} style={{width: "200px"}} alt="image preview" />
    </div>
  ))


  const upload = (values) => {

    let vals = {
      author: '',
      title: '',
      collectionName: collectionName,
      color: '',
      content: '',
      template: 1,
    }

    // console.log(vals);

    setProgress(0);

    // * axios call
    selectedFiles.forEach(file => {
      uploadFile(file, vals, (event) => {
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
      
    });
  }
  
  return (
    <>
      {/* //* FILE UPLOAD * * * * * * * * * * * * * * * * * * * * * * * *  */ }
      <StyledDropZone>
        <div className='form-item dropzone-cont'>
          <div {...getRootProps()}>

            <input {...getInputProps()} />
            <p>[ drop images here ]</p>

            <div className="filePreview">
              {dropFiles}
            </div>
          </div>

          {/* <input ref={captionRef} type="text" placeholder='image caption...' /> */}
          <button onClick={() => upload()}>Add Slides</button>
        </div>
      </StyledDropZone>
      {/* //* FILE UPLOAD End * * * * * * * * * * * * * * * * * * * * * * * * */ }
    </>
  )
}

// dropzone pop up
// preview images being added
// read URL for collection name
// add new slides with collection name

export default SlideCreateMulti