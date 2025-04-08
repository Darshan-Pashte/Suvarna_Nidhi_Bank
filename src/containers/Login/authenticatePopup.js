import React, { useRef } from 'react';
import classes from './authenticate.module.css';
import { Modal } from '@mui/material';

const AuthenticationPopup = ({ open,handleSubmitOtp, handleClose }) => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  function handleInput(e, index) {
    const input = e.target;
    if (input.value.length >= 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  }

  function handleFormSubmit(e) {
      e.preventDefault();
      const otp = inputRefs.map((inputRef) => inputRef.current.value).join('');
      // console.log('Submitting OTP:', otp);
      handleSubmitOtp(otp);
    handleClose()
  }

  return (
    <Modal  
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.centerModal}
      >
        {/* <form onSubmit={handleFormSubmit}> */}
        <div className={classes.Cont}>
      <div className={classes.AddBen}>
        <div className={classes.Container}>
          <div className={classes.formHeader}>
            <div className={classes.formHeaderLeft}>
              <div>Authenticate</div>
            </div>
            <div className='img' style={{ cursor: 'pointer' }} onClick={handleClose}>
              {/* <img src={CloseIcon} alt='' /> */}
            </div>
          </div>
          <div className={classes.formContainer}>
            <div className={classes.formField}>
              <div className={classes.formNote}>Enter the 6 digit OTP sent to your phone number </div>
              <label htmlFor='beneId'>
                Enter OTP
                <span className='red'>*</span>
              </label>
            </div>
            <div className={`${classes.otpdiv} ${classes.otpinput}`}>
              {[...Array(6)].map((_, index) => (
                <input
                  type='password'
                  id={`otp${index}`}
                  name={`otp${index}`}
                  maxLength='1'
                  size='1'
                  key={index}
                  ref={inputRefs[index]}
                  onInput={(e) => handleInput(e, index)}
                />

              ))}
            </div>
            {/* <div className={classes.formNote}>Resend Otp (00.07)</div> */}
            <div className={classes.formNote}>The Authentication is Valid for the current session only</div>

            <div className={classes.formButtons}>
              <div role='button' className={classes.cancel} style={{ cursor: 'pointer' }} onClick={handleClose}>
                Cancel
              </div>
              <button className='btn-primary' type='button' style={{ padding: '1vw 2vw' }} onClick={handleFormSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    {/* </form> */}
      </Modal>
    
  );
};

export default AuthenticationPopup;
