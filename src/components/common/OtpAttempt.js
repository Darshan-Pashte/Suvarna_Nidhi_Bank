import React from 'react'

const OtpAttempt = ({Attempts , RespCode}) => {
  return (
    <>
      {Attempts && <div>{Attempts} Attempts Remaining</div>}
    </>
  )
}

export default OtpAttempt
