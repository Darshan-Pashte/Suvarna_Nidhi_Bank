import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./Callback.module.css";
import { Button } from "@mui/material";
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import { useEffect } from "react";
import WalletModal from "./CallbackUpiModal";
import { apiList } from "../../utilities/nodeApiList";
import { AuthContext } from "../../../context/AuthContext";
import { postApiData } from "../../utilities/nodeApiServices";
import { PROTECTED_ROUTES } from "../../../routes/Routes";
import CallbackUpiModal from "./CallbackUpiModal";



const CallbackUpi = ({
    data,
    rowIndex,
    topLevelPath,
    url1
}) => {
    const { state: user } = useContext(AuthContext);
    const [username, setUserName] = useState("");
    const [token, setToken] = useState("");
    const [banksCode, setbanksCode] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        setUserName(sessionStorage.getItem("username"));
        setToken(sessionStorage.getItem("TOKEN"));
      }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const [response, setResponse] = useState({});
  
    const openModal = () => {

      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

// console.log("data",data[rowIndex])


    const shouldRenderEditIcon = PROTECTED_ROUTES.some(route => {
        const childRoute = route.childRoutes?.find(child => child.url === url1);
        if (childRoute?.grandChild[0].arr == "1") {
            // You might need to specify a specific condition to determine if an edit icon should be shown
            return true;
        }
        else return false;
    }

    );
    return (
        <>
            {shouldRenderEditIcon ? <span
                className={classes.editButton}
            >
                <Button sx={{color:"black", minWidth :"100%" , padding:"5px 5px !important"}} onClick={openModal}><PhoneCallbackIcon /></Button>
            </span> : <span><Button  sx={{color:"black", minWidth :"100%" , padding:"5px 5px !important"}}  disabled ><PhoneCallbackIcon /></Button></span>}
            {
             isModalOpen ? <CallbackUpiModal open={isModalOpen} handleClose={closeModal} rowDataToDisplay={response} data={data[rowIndex]} title={"Wallet Balance"}/> :null
            }
        </>
    );
};

export default CallbackUpi;
