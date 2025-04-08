import classes from "./Authorize.module.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextFieldForm from "../../../components/common/textFieldForm";
import { Box, Checkbox, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "../../../components/common/datePickerForm";
import { postApiData } from "../../../components/utilities/nodeApiServices";
import ServerInstance, {
  apiList,
} from "../../../components/utilities/nodeApiList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { styled, Button } from "@mui/material";
import { errorMessages } from "../../../components/utilities/formValidation";
import { convertDate } from "../../../components/utilities/convertDate";
import AutocompleteForm from "../../../components/common/autuCompleteForm";
import SweetAlertPopup from "../../../components/common/sweetAlertPopup";
import Loader from "../../../components/common/loader";
import { compareTextAndReturnObject } from "../../../components/common/commonArray";
import MUIDataTable from "mui-datatables";

const defaultFormData = {
  announcement: "",
  fromDate: null,
  toDate: null,
};




const Authorize = ({ accList }) => {
  const { loading, error, isAuthenticated, user } = useSelector(

    (state) => state.auth
  );

  const options = {
    // filterType: "dropdown",
    filterType: "checkbox",
    responsive: "stacked",
    // responsive: 'standard',
    filter: false,
    download: false,
    print: false,
    checkbox: true,
    selectableRows: 'single',
    // onRowsSelect: (currentRowsSelected, allRowsSelected) => {
    //   setSelectedRows(currentRowsSelected);
    // },


  };

  const { state: data } = useLocation()
  // console.log(user, "user");
  // console.log("accList", accList);

  const accountList =
    user?.accountDetails &&
    user?.accountDetails?.map((item) => ({
      code: item.brCode,
      value: item.accNo,
    }));
  // const accountList = accList && accList?.map(item => ({ "code": item.accNo, "value": item.accNo }));

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: defaultFormData,
    mode: "onChange",
  });

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (accountList) {
      setValue(
        "accountNumber",
        accountList
          ? compareTextAndReturnObject(accountList, accountList[0]?.value)
          : ""
      );
    }
  }, []);

  useEffect(() => {
    setValue("fromDate", new Date());
    setValue("toDate", new Date());
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (data) => {
    navigate("/announcement/announcementBrowseList", { state: data });
  };

  // const { state: user } = useContext(AuthContext);
  // const { error, loading, isAuthenticated, user } = useSelector(
  //   (state) => state.user
  // );

  // useEffect(()=>{
  //   setValue("fromDate", new Date())
  //   setValue("toDate", new Date())
  // },[])

  const payFromAccount = [
    {
      code: "01",
      value: "PDF ",
    },
    {
      code: "02",
      value: "CSV ",
    },
  ];

  const accountHomebank = [
    {
      code: "01",
      value: "0000487123256871486 - Rakesh Tr  ",
    },
    {
      code: "02",
      value: "0000487123256871486 - Mahesh Tr  ",
    },
    {
      code: "03",
      value: "0000487123256871486 - Ramesh Tr  ",
    },
  ];

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const payload = {
        custNo: user?.userId,
        accountNo: data.accountNumber.value,
        sessionId: user?.sessionId,
        fromDate: convertDate(data.fromDate, 9),
        toDate: convertDate(data.toDate, 9),
        // fromDate: "20220101",
        // toDate: "20231122",
        brCode: data.accountNumber.code,
      };

      const response = await postApiData(
        apiList.CORPORATE_ACCOUNT_STATEMENT_DOWNLOAD,
        payload
      );

      if (response.status) {
        SweetAlertPopup(response.message, "Success", "success");
        reset();
      } else {
        SweetAlertPopup(response.message, "Error", "error");
      }
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
     background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "153px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));
  const ColorButton2 = styled(Button)(({ theme }) => ({
    color: "#FFFFFF",
    // backgroundColor: "#F84B67",
    // backgroundColor: "#323232",
     background: "var(--button-color)",
    border: "1px solid #CCC",
    borderRadius: "8px",
    paddingLeft: "15px",
    paddingRight: "15px",
    width: "183px",
    height: "35px",
    "&:hover": {
      background: "#808080",
      color: "white",
    },
  }));

  const rows = [
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],
    ['1', '2023202....', '10', '₹20000.00', 'Other Bank', 'NEFT', 'Ramesh Cha...', '2023-12-12 ...', 'Processed', 'Checker'],

    // Add more rows as needed
  ];

  const columns = [

    // {
    //   name: '',
    //   label: '',
    //   options: {
    //     filter: true,
    //     sort: true,
    //     checkbox:true,
    //     customBodyRenderLite: (dataIndex) => {
    //       return (
    //         <input
    //           type="checkbox"
    //           checked={false} // You can set the checked state here based on your logic
    //         />
    //       );
    //     },

    //   },
    // },
    {
      name: 'Sr. No.',
      label: 'Sr. No.',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Batch Code',
      label: 'Batch Code',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Total Records',
      label: 'Total Records',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Total Amount',
      label: 'Total Amount',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Transfer Type',
      label: 'Transfer Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Transfer Method',
      label: 'Transfer Method',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Request By',
      label: 'Request By',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Transaction Date & Time',
      label: 'Transaction Date & Time',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Remark',
      label: 'Remark',
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
 


  return (
    <>
      {isLoading ? <Loader loading={true} /> : <Loader loading={false} />}

      <div className={classes.mainheading}>Bulk Payment Batch Codes</div>
      <div className={classes.mainheading1}>Preview</div>
      <div className={classes.mainupper}>
        <div className={classes.accountstatement}>
          <Box
            className={classes.mainContainer}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={classes.Sbox}>
              <div>
                <div className={classes.formbox}>
                  <Grid
                    container
                    columnSpacing={4}
                    rowSpacing={2}
                    style={{ padding: "0.1vw" }}
                  >
                    <Grid item xs={12} sm={4} md={2}>
                      <div className={classes.frowdata11}>
                        <div className={classes.frowtext}>
                          From Date<sup className={classes.required}>*</sup>
                        </div>
                        <DatePickerForm
                          controlerProps={{
                            control: control,
                            name: "fromDate",
                          }}
                          TextFieldProps={
                            {
                              //   fullWidth: true,
                            }
                          }
                          DatePickerProps={{
                            // label: "From Date",
                            fullWidth: true,
                          }}
                          required={false}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={4} md={3}>
                      <div className={classes.frowdata11}>
                        <div className={classes.frowtext}>
                          To Date<sup className={classes.required}>*</sup>
                        </div>
                        <DatePickerForm
                          controlerProps={{
                            control: control,
                            name: "toDate",
                          }}
                          TextFieldProps={
                            {
                              //   fullWidth: true,
                            }
                          }
                          DatePickerProps={{
                            // label: "From Date",
                            fullWidth: true,
                            minDate: watch("fromDate"),
                          }}
                          required={false}
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={4} md={7}>
                      <div
                        className={classes.frowtext}
                        style={{ visibility: "hidden" }}
                      >
                        button
                      </div>

                      <ColorButton1 variant="contained" type="submit">
                        Apply
                      </ColorButton1>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
      <div className={classes.mainupper1}>
        {/* <div className={classes.bluerow}>Announcement Browse List</div> */}
        <div style={{ width: '100%', marginBottom: '1vh' }}>
          <MUIDataTable
            // title={"Announcement List"}
            // data={data ? data : []}
            data={rows}
            columns={columns}
            options={options}
          />
          <Grid
            container
            columnSpacing={4}
            rowSpacing={2}
            style={{ padding: "0.1vw" }}
          >
            <Grid item xs={12} sm={4} md={9}></Grid>
            <Grid item xs={12} sm={4} md={3}>
              <div
                className={classes.frowtext}
                style={{ visibility: "hidden" }}
              >
                button
              </div>

              <ColorButton2 variant="contained" type="submit">
                View Batch Status
              </ColorButton2>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Authorize;
