import axios from '../api/axios'

export const uploadFile = async (file, vals, onUploadProgress) => {

  let formData = new FormData();


  formData.append("imageName", file.name + "--" + Date.now());
  formData.append("imageData", file);

  
  formData.append(`author`,         vals.author);
  formData.append(`title`,          vals.title);
  formData.append(`content`,        vals.content);
  formData.append(`template`,       vals.template);
  formData.append(`color`,          vals.color);
  formData.append(`collectionName`, vals.collectionName);
  
  console.log(formData);
  console.log(file);

  try {
    // console.log('hello');
    const data_1 = await axios.post("/slides", formData, {
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

export const getFiles = () => {
  return axios.get("/files");
};