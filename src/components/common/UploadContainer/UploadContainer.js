import React, { useState } from 'react';
import classes from './UploadContainer.module.css';
import { faCloudArrowUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { processBase64Format } from '../fileUploadHelper';


function UploadContainer({ id = 'fileUpload', name, setFieldValue }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFieldValue(name, selectedFile); // Set the field value as the selected file object
    } else {
      setFile(null);
      setFieldValue(name, null);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setFile(null);
    setFieldValue(name, null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      // Submit the file to the server or do something else with it
      // console.log(file);
    }
  };

  return (
    <div>
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
              <p>-Drag & drop the file here</p>
              <p>-Max file size: 20 MB</p>
              <p>-File format: .png, .jpeg,.pdf</p>
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

      <input type='file' accept='.xlsx' id={id} onChange={handleFileChange} style={{ display: 'none' }} />
    </div>
  );
}

export default UploadContainer;