import axios from '../api/axios'

export const uploadFile = async (file, vals, onUploadProgress) => {

  
  let formData = new FormData();
  
  // formData.append("imageName", file.name + "--" + Date.now());
  const regex = new RegExp("[^0-9a-zA-Z]+", "g")
  formData.append("imageName", file.name.replace(/[&#\@\!, +()$~%'":*?<>{}]/g, '_') + "--" + Date.now());
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

export const updateSlide = async (file, vals, _id, onUploadProgress) => {

  let formData = new FormData();
  
  console.log('hello: ' + file);
  
  console.log(file);
  if(file){
    formData.append("imageName", file.name + "--" + Date.now());
    formData.append("imageData", file);
  }

  
  formData.append(`author`,         vals.author);
  formData.append(`title`,          vals.title);
  formData.append(`content`,        vals.content);
  formData.append(`template`,       vals.template);
  formData.append(`color`,          vals.color);
  formData.append(`collectionName`, vals.collectionName);
  
  console.log(formData);
  console.log(file);


  try {
    const data_1 = await axios.patch(`/slides/${_id}`, formData, {
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