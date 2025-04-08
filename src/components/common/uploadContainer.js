import React, { useRef, useState } from 'react';
import classes from './uploadContainer.module.css';
import { faCloudArrowUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { processBase64Format } from '../utilities/fileUploadHelper';
import Swal from 'sweetalert2';

function UploadContainer({ id = 'fileUpload', name, setFieldValueBack, setFieldValueFront, setFieldValueSignature, setFieldValuepartshpDeed,setPhotoGallary }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('')
  const inputRef = useRef(null);


  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (selectedFile) {
  //     // Read the file as a base64-encoded string
  //     const reader = new FileReader();
  //     reader.readAsDataURL(selectedFile);
  //     reader.onloadend = () => {
  //       setFile({
  //         name: selectedFile.name,
  //         size: selectedFile.size,
  //         type: selectedFile.type,
  //         dataURL: reader.result,
  //       });
  //       console.log({name,readerRes:processBase64Format(reader.result)})

  //       if(name ==="kycfront" &&  !file){
  //       setFieldValueFront([name,processBase64Format(reader.result)])
  //       }else if(name ==="kycBack" &&  !file){
  //       setFieldValueBack([name,processBase64Format(reader.result)])
  //       }else if(name ==="signature" &&  !file){
  //        setFieldValueSignature([name,processBase64Format(reader.result)])
  //       }
  //       // name ==="kycfront" ? setFieldValueFront([name,processBase64Format(reader.result)]): name ==="kycBack" ?setFieldValueBack([name,processBase64Format(reader.result)]):setFieldValueSignature([name,processBase64Format(reader.result)])
  //     };
  //   } else {
  //     setFile(null);
  //   }
  // };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size) { // Maximum size: 200KB
        // Read the file as a base64-encoded string
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          setFile({
            name: selectedFile.name,
            size: selectedFile.size,
            type: selectedFile.type,
            dataURL: reader.result,
          });

          if (name === "kycfront" && !file) {
            setFieldValueFront([name, processBase64Format(reader.result)]);
          } else if (name === "kycBack" && !file) {
            setFieldValueBack([name, processBase64Format(reader.result)]);
          } else if (name === "signature" && !file) {
            setFieldValueSignature([name, processBase64Format(reader.result)]);
          }
          else if (name === "partshpDeed" && !file) {
            setFieldValuepartshpDeed([name, processBase64Format(reader.result)]);
          }else if(name === "photoGallary" && !file){
            setPhotoGallary([name, processBase64Format(reader.result)]);
          }
        };
      } else {
        Swal.fire({
          title: "error",
          text: "File size exceeds the maximum limit of 200KB",
          icon: "error",
        })
        // setError('File size exceeds the maximum limit of 200KB.');
      }
    } else {
      setFile(null);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault()
    setFile(null);
    if (name === "kycfront") {
      setFieldValueFront([]);
    } else if (name === "kycBack") {
      setFieldValueBack([]);
    } else if (name === "signature") {
      setFieldValueSignature([]);
    }else if (name === "partshpDeed") {
      setFieldValuepartshpDeed([]);
    }
    else if (name === "photoGallary") {
      setPhotoGallary([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      // Submit the file to the server or do something else with it
      // console.log(file);
    }
  };

  return (
    <div className='mainDocument'>
      <label htmlFor={id}>
        {!file && (
          <div className={classes.Container}>
            <div className={classes.LeftColumn}>
              <div className={classes.UploadButton}>
                <span style={{ marginRight: '1vw' }}>
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </span>
                Upload
              </div>
            </div>
            <div className={classes.RightColumn}>
                <p className={classes.chooseFile}>Chooose File</p>
              {/* <p className={classes.para}>-Drag & drop the file here</p>
              <p className={classes.para}>-Max file size: 500 KB</p>
              <p className={classes.para}>-File format: .png, .jpeg,.pdf</p> */}
            </div>
          </div>
        )}
      </label>
      {file && (
        <div className={classes.File}>
          <div className={classes.FileInfo}>
            <p>{file.name}</p>
            <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
          <div className={classes.FileActions}>
            <button onClick={handleCancelClick}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}

      <input type='file' accept='.png, .jpeg, .pdf' id={id} name={id} onChange={handleFileChange} style={{ display: 'none' }} ref={inputRef} required />
      {!file && (
        <p className={classes.requiredDoc}>{name === 'kycfront' ? "Please Upload File" :
          name === "kycBack" ? "Please Upload File" : name== 'partshpDeed' ? "Please Upload File" : "Please Upload File"  
        }</p>
      )}

      {/* {error && <p className={classes.error}>{error}</p>} */}
    </div>
  );
}

export default UploadContainer;