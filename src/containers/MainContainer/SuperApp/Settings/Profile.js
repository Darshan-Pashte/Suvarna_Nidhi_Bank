import React, { useEffect, useState } from "react";
import classes from "../Settings/Profile.module.css";
import { Divider, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import Loader from "../../../../components/common/loader";
import styled from "styled-components";
import UpdatePassword from "../../../Login/updatePasswordModal";
import UpdateTPINModal from "./UpdateTPINModal";
import { Button } from "@mui/base";
import ForgetTPINModal from "./ForgetTPINModel";
import ForgetTPINOTPModal from "./ForgetTPINOTPModal";

const Profile = () => {
  const [isLoading, setIsloading] = useState(false);

  const [customarName, setCustomarName] = useState("");
  const [customarNo, setCustomarNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setaddress] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [status, setStatus] = useState("");
  const [mobile, setMobile] = useState("");
  const [Data, setData] = useState("");

  const [msg, setMsg] = useState('')

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );




  const [userId, setUserId] = useState("");


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const [isModalOpenTPIN, setIsModalOpenTPIN] = useState(false);
  const [isModalOpenForgetTPIN, setIsModalOpenForgetTPIN] = useState(false);
  const [response, setResponse] = useState("");

  const openModalForgetTPIN = () => {
    setIsModalOpenForgetTPIN(true);
  };

  const closeModalForgetTPIN = () => {
    setIsModalOpenForgetTPIN(false);
  };

  const openModalTPIN = () => {
    setIsModalOpenTPIN(true);
  };

  const closeModalTPIN = () => {
    setIsModalOpenTPIN(false);
  };


  const openModalForgetTPINOTP = async () => {
    try {
      const payload = {
        otp: '',
        custNo: user?.userId,
        sessionId: user?.sessionId,
        tpin: 1111

      };
      setIsloading(true);
      const response = await postApiData(apiList.FORGOTTPIN, payload);
      // console.log("response", response);
      if (response.status == true) {
        setMsg(response.message)
        openModalForgetTPIN()
        setResponse(response)
      }
      // setShowBal(response.data?.accBa);  
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }

  };
  useEffect(() => {
    getProfileList();
  }, []);

  const getProfileList = async () => {
    try {
      const payload = {
        custNo: user?.userId,
        sessionId: user?.sessionId,
      };
      setIsloading(true);
      const response = await postApiData(apiList.FETCHPROFILE, payload);
      // console.log("response", response);
      // setShowBal(response.data?.accBal);
      setCustomarNo(response?.data?.profile?.custNo);
      setCustomarName(response?.data?.profile?.custName);
      setEmail(response?.data?.profile?.email);
      setaddress(response?.data?.profile?.address);
      setPan(response?.data?.profile?.pan);
      setAadhar(response?.data?.profile?.aadhar);
      setStatus(response?.data?.profile?.status);
      setMobile(response?.data?.profile?.mobileno);
      setData(response?.data?.profile);
      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
    // background: "#183883",
    background: "var( --button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "173px",
    height: "35px",
    "&:hover": {
      background: "var(--button-hover-color)",
      color: "white",
    },
  }));

  return (

    <>

      {isLoading ? (<Loader loading={true} />) : (<Loader loading={false} />)}

      <div className={classes.profilemainpage}>
        <div className={classes.profileupper}>
          <div className={classes.uupercontet}>
            <div className={classes.profileupperheader}>Personal Details</div>

            <div className={classes.changebuttons}>
              <ColorButton1 variant="contained" type="submit" onClick={openModalTPIN}>
                Update TPIN
              </ColorButton1>
              <ColorButton1 variant="contained" type="submit" onClick={openModal}>
                Update Password
              </ColorButton1>
              <ColorButton1 variant="contained" type="submit" onClick={openModalForgetTPINOTP}>
                Forgot TPIN?
              </ColorButton1>
            </div>
          </div>
          <Divider />

          {isModalOpen ? (
            <UpdatePassword
              open={isModalOpen}
              handleClose={closeModal}
              userId={userId}
            />
          ) : null}


          {isModalOpenTPIN ? (
            <UpdateTPINModal
              openTPIN={isModalOpenTPIN}
              handleCloseTPIN={closeModalTPIN}
              userId={userId}
            />
          ) : null}


          {isModalOpenForgetTPIN ? (
            <ForgetTPINModal
              openTPIN={isModalOpenForgetTPIN}
              handleCloseTPIN={closeModalForgetTPIN}
              msg={msg}
              response={response}
            />
          ) : null}


          <div className={classes.profileuppercontent}>

            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>User Name</div>
              <div className={classes.uppername}>{customarName}</div>
            </div>
            <Divider />

            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Address</div>
              <div className={classes.uppername}>{address}</div>
            </div>
            <Divider />
            {/* <div className={classes.uppercontainer}>
            <div className={classes.uppertitle}>Date of Birth</div>
            <div className={classes.uppername}>09/12/93</div>
          </div>
          <Divider /> */}

            {/* <div className={classes.uppercontainer}>
            <div className={classes.uppertitle}>Education</div>
            <div className={classes.uppername}>BE</div>
          </div>
          <Divider /> */}

            {/* <div className={classes.uppercontainer}>
            <div className={classes.uppertitle}>Occupation</div>
            <div className={classes.uppername}>Salaried</div>
          </div>
          <Divider /> */}

            {/* <div className={classes.uppercontainer}>
            <div className={classes.uppertitle}>Marital Status</div>
            <div className={classes.uppername}>Married</div>
          </div>
          <Divider /> */}

            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Home Branch</div>
              <div className={classes.uppername}>{Data?.branchName}</div>
            </div>
            <Divider />

            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Home Branch Address</div>
              <div className={classes.uppername}>{Data?.branchAdd}</div>
            </div>
            <Divider />
          </div>



          <div className={classes.profileupperheader}>Contact details </div>
          <Divider />

          <div className={classes.profileuppercontent}>
            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Mobile Number</div>
              <div className={classes.uppername}>{mobile}</div>
            </div>
            <Divider />

            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Email Address</div>
              <div className={classes.uppername}>{email}</div>
            </div>
            <Divider />

            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Communication Address</div>
              <div className={classes.uppername}>{address}</div>
            </div>
            <Divider />
          </div>

          <div className={classes.profileupperheader}>Documents</div>
          <Divider />

          <div className={classes.profileuppercontent}>
            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>PAN Card Number</div>
              <div className={classes.uppername}>{pan}</div>
            </div>
            <Divider />

            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Aadhar Number</div>
              <div className={classes.uppername}>{aadhar}</div>
            </div>
            <Divider />
          </div>
        </div>

      </div>
    </>

  );
};

export default Profile;
