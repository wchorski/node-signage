import React, { useCallback, useState } from 'react'
import {useDropzone, FileError, FileRejection} from 'react-dropzone'
import { StyledDropZone } from '../styles/DropZone.styled';
import DropZoneSingle from './DropZoneSingle';

export interface AllowedFile {
  file: File;
  errors: FileError[];
}

const DropZoneMulti = () => {

  const [filesState, setFilesState] = useState<AllowedFile[]>([])


  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map(file => ({file, errors: []}))
    setFilesState(curr => [...curr, ...mappedAcc, ...rejFiles])
  }, [])


  const {getRootProps, getInputProps} = useDropzone({onDrop})


  return (
    <>
    <StyledDropZone>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </StyledDropZone>

    {filesState.map((fileWrap, i) => (
      <DropZoneSingle file={fileWrap.file} key={i} />
    ))}
    </>
  )
}

export default DropZoneMulti