import axios from '../api/axios'


export const uploadFile = (file, onUploadProgress) => {

  let formData = new FormData();

  // formData.append("file", file);

  formData.append("imageName", "multer-image--" + Date.now());
  formData.append("imageData", file);
  console.log(formData);

  return axios.post("/image/uploadmulter", formData, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    onUploadProgress,
  })
    .then((data) => {
      if (data.data.success) {
        alert("Image has been successfully uploaded using multer");
        // setimgState(DefaultImg)
      }
    })
    .catch((err) => {
      alert("Error while uploading image using multer");
      // setimgState(DefaultImg)
    });

};

export const getFiles = () => {
  return axios.get("/files");
};