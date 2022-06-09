import { rejects } from 'assert';
import React, { useEffect, useState } from 'react'

import axios from '../api/axios'

export interface SingleFileUploadProps{
  file: File;
  // onUpload: (file: File, url: string) => void;
}

export function DropZoneSingle ({
  file,
  // onUpload,
}: SingleFileUploadProps) {

  const [progress, setProgress] = useState(0);

  const uploadFile = (file: File, onProgress: (percentage: number) => void ) => {
    const formData = new FormData()
    formData.append('file', file)

    console.log(formData);
  
    // try{
    //   axios.post(`/slides`, formData, {
    //     onUploadProgress: (progEvent) => {
    //       if(progEvent.lengthComputable){
    //         console.log(progEvent.loaded + ' ' + progEvent.total)
    //         setProgress(progEvent)
    //       }
    //     }
    //   })
  
    // } catch (err) {console.log(err)}
  }
  
  useEffect(() => {
    const upload = async () => {

      const url = await uploadFile(file, setProgress)

      
      // axios.post('/fileupload', formData, {onUploadProgress...})
      // const url = await uploadFile(file, setProgress)
      // console.log('url: ', url);
      
    }
    upload()

  }, [])


  return (
    <>
      <div>single upload: {progress}</div>
    </>
  )
}


// function uploadFile(file: File, onProgress: (percentage: number) => void){
//   const url = 'http://localhost:3001/upload'

//   return new Promise((res, rej) => {
//     const xhr = new XMLHttpRequest()
//     xhr.open('POST', url)

//     xhr.onload = () => {
//       res('url - where cloudinary saved file')
//     }
//     xhr.onerror = (e) => rej(e)
//     xhr.upload.onprogress = (event) => {
//       if(event.lengthComputable){
//         const percentage = (event.loaded/event.total)*100
//         onProgress(Math.round(percentage))
//       }
//     }
//     const formData = new FormData()
//     formData.append('file', file)
//     // formData.append('key', key)
//     xhr.send(formData)
//   })
// }


// return (
//   <>
//     <div>DropZoneSingle</div>
//   </>
// )


export default DropZoneSingle