import React from "react";
import classes from "../Cards/Cards.module.css";
import axios from "axios";

import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { postApiData } from "../../../../components/utilities/nodeApiServices";
import { apiList } from "../../../../components/utilities/nodeApiList";
import { errorMessages } from "../../../../components/utilities/formValidation";

import { Button, Typography } from "@mui/material";

import Loader from "../../../../components/common/loader";

const CardManagement = () => {
  const [cardDetails, setCardDetails] = useState([]);

  const [cardBlockStatus, setCardBlockStatus] = useState({
    status: false,
    message: "",
  });

  const [isLoading, setIsloading] = useState(false);
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // API to fetch account number which is to be passed in getList API payload
  //   useEffect(() => {
  //     const fetchAccountNo = async () => {
  //       try {
  //         setIsloading(true);
  //         const response = await axios.post(
  //           apiList.FETCHACC,
  //           {
  //             custNo: user.userId,
  //             sessionId: user.sessionId,
  //           }
  //         );

  //         const accountNumbers =
  //           response.data.data?.accountlst?.map((account) => account.accNo) || [];
  //         setAccountNo(accountNumbers);

  //         setIsloading(false);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         setIsloading(false);
  //       }
  //     };

  //     fetchAccountNo();
  //   }, [user.userId, user.sessionId]);

  // API to fetch card no and card status
  //   useEffect(() => {
  //     const fetchCardDetials = async () => {
  //       try {
  //         setIsloading(true);
  //         const response = await axios.post(
  //           "http://199.34.22.236:9116/banking/card/getlist",
  //           {
  //             custNo: user.userId,
  //             sessionId: user.sessionId,

  //             // accNo: accountNo?.[0],
  //             accNo: user.accountDetails[0].accNo,
  //           }
  //         );

  //         const cardDetails = response.data.data?.cardData || [];

  //         setCardDetails(cardDetails);

  //         setIsloading(false);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         setIsloading(false);
  //       }
  //     };

  //     fetchCardDetials();
  //   }, [user.userId, user.sessionId, selectedAccountNo]);

  const fetchCardDetails = async () => {
    try {
      setIsloading(true);
      const response = await axios.post(
        apiList.CARDLIST,
        {
          custNo: user.userId,
          sessionId: user.sessionId,
          accNo: user.accountDetails[1].accNo,
        }
      );
      if(response?.respCode == "IS"){
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
      const cardDetails = response.data.data?.cardData || [];

      setCardDetails(cardDetails);

      setIsloading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchCardDetails();
  }, [user.userId, user.sessionId]);

  // API to fetch block/unblock status information
  //   useEffect(() => {
  //     const fetchCardBlockData = async () => {
  //       try {
  //         setIsloading(true);

  //         const cardNo = cardDetails.length > 0 ? cardDetails[0].cardNo : "";

  //         const response = await axios.post(
  //           "http://199.34.22.236:9116/banking/card/blockUnblock",
  //           {
  //             custNo: user.userId,
  //             sessionId: user.sessionId,
  //             // cardNo: cardData?.data?.cardData?.cardNo,
  //             cardNo: cardNo,
  //             status: isCardBlocked ? "BLOCK" : "UNBLOCK",
  //           }
  //         );
  //         //Set data in Account Type

  //         setCardBlockStatus(response.data);
  //         setIsloading(false);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         setIsloading(false);
  //       }
  //     };

  //     fetchCardBlockData();
  //   }, [user.userId, user.sessionId, isCardBlocked, cardDetails]);

  // API to fetch block/unblock status information
  const handleBlockUnblock = async () => {
    try {
      setIsloading(true);

      const cardNo = cardDetails.length > 0 ? cardDetails[0].cardNo : "";

      const response = await axios.post(
        apiList.CARDBLOCKUNBLOCK,
        {
          custNo: user.userId,
          sessionId: user.sessionId,
          cardNo: cardNo,
          status:
            cardDetails[0].status === "Current Card Status : ACTIVE"
              ? "BLOCK"
              : "UNBLOCK",
        }
      );
      if(response?.respCode == "IS"){
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
      }
      setCardBlockStatus(response.data);
      setIsloading(false);
      // Refresh card details after blocking/unblocking
      fetchCardDetails();
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsloading(false);
    }
  };

  //   // Update the toggle state of card block unblock
  //   const handleToggleChange = () => {
  //     setIsCardBlocked((prevIsCardBlocked) => !prevIsCardBlocked);
  //   };

  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}
      <div className={classes.gridinfo}>
        <div className={classes.grid2container}>
          <div className={classes.grid2logo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 10H21M7 15H7.01M11 15H13M3 8C3 7.20435 3.31607 6.44129 3.87868 5.87868C4.44129 5.31607 5.20435 5 6 5H18C18.7956 5 19.5587 5.31607 20.1213 5.87868C20.6839 6.44129 21 7.20435 21 8V16C21 16.7956 20.6839 17.5587 20.1213 18.1213C19.5587 18.6839 18.7956 19 18 19H6C5.20435 19 4.44129 18.6839 3.87868 18.1213C3.31607 17.5587 3 16.7956 3 16V8Z"
                stroke="#183883"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div className={classes.grid2name}>Card status</div>

          {/* <div className={classes.grid1lowerinfo}>
            <div className={classes.grid2switch}>
              {isCardBlocked ? "Blocked" : "Block"}
            </div>
            <Switch
              checked={isCardBlocked}
              onChange={handleToggleChange}
              color="primary"
              inputProps={{ "aria-label": "controlled" }}
            />
          </div> */}

          <div className={classes.grid1lowerinfo}>
            <div className={classes.grid2status}>
              {cardBlockStatus.message !== undefined && (
                <Typography
                  sx={{
                    color:
                      cardDetails[0]?.status === "Current Card Status : ACTIVE"
                        ? "green"
                        : "red",
                  }}
                >
                  Card is{" "}
                  {cardDetails[0]?.status === "Current Card Status : ACTIVE"
                    ? "Active"
                    : "Inactive"}
                </Typography>
              )}
            </div>
            <Button
              variant="contained"
              color={
                cardDetails[0]?.status === "Current Card Status : ACTIVE"
                  ? "primary"
                  : "secondary"
              }
              onClick={handleBlockUnblock}
            >
              {cardDetails[0]?.status === "Current Card Status : ACTIVE"
                ? "Block Card"
                : "Unblock Card"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardManagement;
