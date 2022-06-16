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
        {/* <FileUploader /> */}
      </section>

      

      <section>
      {/* <FileUploader /> */}
      </section>
    </>
  )
}

export default SlideCreator