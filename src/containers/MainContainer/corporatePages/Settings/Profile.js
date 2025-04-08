import React, { useEffect, useState } from "react";
import classes from "../Settings/Profile.module.css";
import { Divider, Grid } from "@mui/material";
 import {Button} from "@mui/base"
import { useSelector } from "react-redux";
import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import Loader from "../../../../components/common/loader";
import styled from "styled-components";
import UpdatePassword from "../../../Login/updatePasswordModal";
import UpdateTPINModal from "./UpdateTPINModal";
import UpdateCorporatePassword from "../../../Login/UpdateCorporatePassword";

const ProfileCorporate = () => {
  const [isLoading, setIsloading] = useState(false);

  // const [customarName, setCustomarName] = useState("");
  // const [customarNo, setCustomarNo] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setaddress] = useState("");
  // const [companyname, setCompanyName] = useState("");
  // const [pan, setPan] = useState("");
  // const [aadhar, setAadhar] = useState("");
  // const [status, setStatus] = useState("");
  const [profile, setProfile] = useState({
    customarName: "",
    customarNo: "",
    email: "",
    address: "",
    companyName: "",
    mobileno:"",
    pan: "",
    aadhar: "",
    status: "",
  });

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

  const openModalTPIN = () => {
    setIsModalOpenTPIN(true);
  };

  const closeModalTPIN = () => {
    setIsModalOpenTPIN(false);
  };

  useEffect(() => {
    getProfileList();
  }, []);

  const getProfileList = async () => {
    try {
      const payload = {
        username: user?.userId,
        sessionId: user?.sessionId,
      };
      setIsloading(true);
      const response = await postApiData(apiList.CORPORATE_FETCHPROFILE, payload);
      // console.log("response", response);
      // setShowBal(response.data?.accBal);
      // setCustomarNo(response?.data?.profile?.username);
      // setCustomarName(response?.data?.profile?.custName);
      // setEmail(response?.data?.profile?.email);
      // setaddress(response?.data?.profile?.address);
      // setCompanyName(response?.data?.profile?.companyName);
      // setPan(response?.data?.profile?.pan);
      // setAadhar(response?.data?.profile?.aadhar);
      // setStatus(response?.data?.profile?.status);

      setProfile({
        customarNo: response?.data?.profile?.username,
        customarName: response?.data?.profile?.custName,
        email: response?.data?.profile?.email,
        address: response?.data?.profile?.address,
        companyName: response?.data?.profile?.companyName,
        mobileno: response?.data?.profile?.mobileno,
        pan: response?.data?.profile?.pan,
        aadhar: response?.data?.profile?.aadhar,
        status: response?.data?.profile?.status,
      });

      setIsloading(false);
    } catch (err) {
      // console.log(err);
      setIsloading(false);
    }
  };

  const ColorButton1 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    backgroundColor: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "40px",
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
              {/* <ColorButton1 variant="contained" type="button" onClick={openModalTPIN}>
                Update TPIN
              </ColorButton1> */}
              <ColorButton1 variant="contained" type="submit" onClick={openModal}>
                Update Password
              </ColorButton1>
            </div>
          </div>
          <Divider />

          {isModalOpen ? (
            <UpdateCorporatePassword
              open={isModalOpen}
              handleClose={closeModal}
              userId={userId}
            />
          ) : null}


          {/* {isModalOpenTPIN ? (
            <UpdateTPINModal
              openTPIN={isModalOpenTPIN}
              handleCloseTPIN={closeModalTPIN}
              userId={userId}
            />
          ) : null} */}
          <div className={classes.profileuppercontent}>
            {/* <div className={classes.uppercontainer}>
            <div className={classes.uppertitle}>Name</div>
            <div className={classes.uppername}>Name</div>
          </div>
          <Divider /> */}

            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>User Name</div>
              <div className={classes.uppername}>{profile.customarName}</div>
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
              <div className={classes.uppername}>{profile.address}</div>
            </div>
            <Divider />
            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Company Name</div>
              <div className={classes.uppername}>{profile.companyName}</div>
            </div>
            <Divider />
          </div>

          <div className={classes.profileupperheader}>Contact details </div>
          <Divider />

          <div className={classes.profileuppercontent}>
            {/* <div className={classes.uppercontainer}>
            <div className={classes.uppertitle}>Mobile Number</div>
            <div className={classes.uppername}>+91 99XXX XXX838</div>
          </div>
          <Divider /> */}

            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Email Address</div>
              <div className={classes.uppername}>{profile.email}</div>
            </div>
            <Divider />

            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Communication Address</div>
              <div className={classes.uppername}>{profile.address}</div>
            </div>
            <Divider />
            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Contact Number</div>
              <div className={classes.uppername}>{profile.mobileno}</div>
            </div>
            <Divider />
          </div>

          <div className={classes.profileupperheader}>Documents</div>
          <Divider />

          <div className={classes.profileuppercontent}>
            <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>PAN Card Number</div>
              <div className={classes.uppername}>{profile.pan}</div>
            </div>
            <Divider />

            {/* <div className={classes.uppercontainer}>
              <div className={classes.uppertitle}>Aadhar Number</div>
              <div className={classes.uppername}>{profile.aadhar}</div>
            </div>
            <Divider /> */}
          </div>
        </div>

      </div>
    </>

  );
};

export default ProfileCorporate;
