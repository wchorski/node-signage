// TODO this tutorial
// https://www.bezkoder.com/react-dropzone-multiple-files-upload/

import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { uploadFile } from "../helpers/FileUploadService";
import DefaultImg from '../assets/default-img.jpg';


const FileUploader = () => {

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);
  const [imgPreview, setimgPreview] = useState(DefaultImg)
  const [caption, setCaption] = useState(undefined)


  const onDrop = (files) => {
    if (files.length > 0) {
      setSelectedFiles(files);
      setimgPreview(URL.createObjectURL(files[0]))
    }
  };

  const upload = () => {
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);
    setCaption(document.getElementById('captionInput').value)

    // * axios call
    uploadFile(currentFile, caption, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        // return getFiles();
      })
      .then((files) => {
        setFileInfos(files.data);
        setimgPreview(DefaultImg)
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });
    setSelectedFiles(undefined);
  };

  useEffect(() => {
    // TODO create API to get files
    // getFiles().then((response) => {
    //   setFileInfos(response.data);
    // });
  }, []);
  
  return (
    <>
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
            <input id="captionInput" type="text" placeholder="caption..."/>
            <aside className="selected-file-wrapper">
              <button
                className="btn btn-success"
                disabled={!selectedFiles}
                onClick={upload}
              >
                Upload
              </button>
            </aside>
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
    </>
  );
};
export default FileUploader;