import axios from '../api/axios'

export const uploadFile = async (file, caption, onUploadProgress) => {

  let formData = new FormData();

  // formData.append("file", file);

  formData.append("imageName", "multer-image--" + Date.now());
  formData.append("imageData", file);
  formData.append("caption", caption)
  console.log(formData);
  console.log(file);

  try {
    const data_1 = await axios.post("/image/uploadmulter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
    if (data_1.data.success) {
      console.log("Image has been successfully uploaded using multer");
    }
  } catch (err) {
    console.error(err);
  }

};

// export const imgDataAppend = async ( formdt, file, onUploadProgress) => {

//   formdt.append("imageName", "multer-image--" + Date.now());
//   formdt.append("imageData", file);

//   uploadFile(file, onUploadProgress)

//   return formdt
// }

export const getFiles = () => {
  return axios.get("/files");
};